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
  // logger.info(`Parse ID ===> ${checkPostExist}`);
  // logger.info(`Post Delte ID exists===> ${checkPostExist}`);

  if (checkPostExist) {
    // delete from redis and pg delete to s3
    // redis delete (post, image, )
    // logger.info(`Check if post ID EXIST ID ===> ${checkPostExist}`);
    const deletePostS3 = async () => {
      try {
        const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
        const s3 = new S3();

        const imageArrayBeforeDeletion = await redisClient.v4.hGetAll(`images:${postId}`);
        // logger.info(`Image array deletion check the data: ${imageArrayBeforeDeletion}`);
        // logger.info(`imageArrayBeforeDeletion images S3 ===> ${imageArrayBeforeDeletion}`);

        const imageGetValues = Object.values(imageArrayBeforeDeletion);
        // logger.info(`imageGetValues S3 object values ===> ${imageGetValues}`);

        const iterate = imageGetValues.map((img: any) => {
          // logger.info(`imgwithoutquotes check ===> ${img}`);
          const imgWithoutQuotes = img.slice(1, -1);
          // logger.info(`imgwithoutquotes check ===> ${imgWithoutQuotes}`);
          const params = {
            Bucket: bucketName,
            Key: `imageuploads/${imgWithoutQuotes}`,
          };
          // logger.info(`Imageuploads delete iterate ===> ${iterate}`);
          return s3.deleteObject(params, (err, data) => {
            if (err) {
              return [null, 'Error'];
            }
            // logger.info(`Successfull deletion images here at maps delte S3  ===>`);
            return null;
          });
        });
        const successIterate = await Promise.all(iterate);

        if (successIterate) {
          return ['Success', null];
        }

        // logger.info(`Successfull deletion images here at maps delte ['Success', null]; S3 ===>`);
        return [null, 'Error'];
      } catch (e) {
        // logger.info(`Error deletion images here at maps delete S3  ===> ${e}`);
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
        // logger.info(`SUCCESS DELETE post Redis  ===>`);
        return ['Success', null];
      } catch (e) {
        // logger.info(`Error DELETE post Redis  ===> ${e}`);
        return [null, 'Error'];
      }
    };

    const deletePostPg = async (idPost: string, userId: string) => {
      try {
        await db.query('BEGIN');
        await db.query(`DELETE FROM images WHERE fk_post_id=$1`, [Number(idPost)]);
        await db.query(`DELETE FROM post_likes WHERE fk_post_id=$1`, [Number(idPost)]);
        await db.query(`DELETE FROM views WHERE fk_post_id=$1`, [Number(idPost)]);
        await db.query(`DELETE FROM posts WHERE pk_post_id=$1`, [Number(idPost)]);
        await db.query(`UPDATE users SET post_count=post_count-1 WHERE pk_users_id=$1`, [Number(userId)]);
        await db.query('COMMIT');
        // logger.info(`SUCCESS DELETE post postgres  ===>`);
        return ['Success', null];
      } catch (e) {
        // logger.info(`ERROR DELETE post postgres  ===> ${e}`);
        await db.query('ROLLBACK');
        return [null, 'Error'];
      }
    };
    const [successS3Del, failS3Del] = await deletePostS3();
    const [successRedisDel, failRedisDel] = await deletePostRedis(postId, req.user.id);
    const [successPgDel, failPgDel] = await deletePostPg(postId, req.user.id);
    if (successS3Del && successRedisDel && successPgDel) {
      // logger.info('VERY SUCCESS FUL DELETION YES INDEEED');
      return res.status(200).json({ data: 'Post deletion completed' });
    }
    // logger.info('VERY Error SUCCESS FUL DELETION YES INDEEED');
    return next(ApiError.internalError('Error'));
  }

  // logger.info('VERY VERY VERY ERROR FUL DELETION YES INDEEED');
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
