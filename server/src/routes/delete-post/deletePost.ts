/* eslint-disable no-unused-vars */
import express from 'express';
import { S3 } from 'aws-sdk';
import logger from '../../logger';
import db from '../../pool/pool';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import redisClient from '../../models/redis/redis';
import ApiError from '../../middleware/api-error-handler/apiError';
import { authCheckMwDeletePost } from '../../middleware/authCheck/authCheck';
import { ajvValidatePostId } from '../../models/ajv/auth';

const router = express.Router();
//
router.post(`/`, authCheckMwDeletePost, validateReg(ajvValidatePostId), async (req: any, res: any, next) => {
  const { postId } = req.body;
  // check if post exist
  const idToString = JSON.parse(postId);
  const checkPostExist = await redisClient.v4.hExists(`post:${idToString}`, 'id');

  if (checkPostExist) {
    // delete from redis and pg delete to s3
    // redis delete (post, image, )
    const deletePostS3 = async () => {
      try {
        const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
        const s3 = new S3();

        const imageArrayBeforeDeletion = await redisClient.v4.hGetAll(`images:${postId}`);
        const imageGetValues = Object.values(imageArrayBeforeDeletion);
        const iterate = imageGetValues.map((img: any) => {
          const imgWithoutQuotes = img.slice(1, -1);
          const params = {
            Bucket: bucketName,
            Key: `imageuploads/${imgWithoutQuotes}`,
          };
          return s3.deleteObject(params, (err, data) => {
            if (err) {
              return [null, 'Error'];
            }
            return logger.info(data);
          });
        });
        if (iterate) {
          return ['Success', null];
        }
        return [null, 'Error'];
      } catch (e) {
        return [null, 'Error'];
      }
    };

    const deletePostRedis = async (idPost: string, userId: string) => {
      try {
        await redisClient.executeIsolated(async (isolatedClient) => {
          await isolatedClient.watch(`user:${userId}`);
          const multi = isolatedClient
            .multi()
            .del(`post:${idPost}`) // delete entire post details
            .del(`images:${idPost}`) // delete entire images associated with post details
            .hIncrBy(`user:${userId}`, 'post_count', -1) // decrement post count
            .zRem('postsSortedSet', `${idPost}`) // remove post from postsSortedSet
            .lRem(`user:list:${userId}`, 0, `${idPost}`); // delete post from user post list
          return multi.exec();
        });
        return ['Success', null];
      } catch (e) {
        return [null, 'Error'];
      }
    };

    const deletePostPg = async (idPost: string, userId: string) => {
      try {
        await db.query('BEGIN');
        await db.query(`DELETE FROM images WHERE fk_post_id=$1`, [idPost]);
        await db.query(`DELETE FROM posts WHERE pk_post_id=$1`, [idPost]);
        await db.query(`UPDATE users SET post_count=post_count-1 WHERE pk_users_id=$1`, [userId]);
        await db.query('COMMIT');
        return ['Success', null];
      } catch (e) {
        await db.query('ROLLBACK');
        return [null, 'Error'];
      }
    };
    const [successS3Del, failS3Del] = await deletePostS3();
    const [successRedisDel, failRedisDel] = await deletePostRedis(postId, req.user.id);
    const [successPgDel, failPgDel] = await deletePostPg(postId, req.user.id);
    if (successS3Del && successRedisDel && successPgDel) {
      return res.status(200).json({ data: 'Post deletion completed' });
    }
    return next(ApiError.internalError('Error'));
  }
  return next(ApiError.internalError('Error'));
});

export default router;

// DELETING OBJECTS IN S3
// const params = {
//    Bucket: 'bucket name',
//    Key: `imageuploads/${1648634140824-xyz.png}`
//    }
// s3.deleteObject(params, (err, data) => {
//       if (err) {
//         throw err
//       }
//       return res.status(200).json({ message: 'successfully deleted'})
// });
