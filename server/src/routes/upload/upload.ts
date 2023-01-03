import express from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
// import sharp from "sharp"; saka ko naireduce ang size ng buffer
import { S3 } from 'aws-sdk';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import { ajvValidateUpload } from '../../models/ajv/auth';
import db from '../../pool/pool';
import ApiError from '../../middleware/api-error-handler/apiError';
import redisClient from '../../models/redis/redis';
import { authCheck, authCheckMw } from '../../middleware/authCheck/authCheck';
// AWS SDK AUTO-DETECTS the access key and secret key in environment variables. No need for explicit declaration.

const limits = {
  fields: 4, // maximum of only 4 text fields
  fileSize: 20000000, // 20MB
  files: 5, // 5 maximum number of files can be accepted
};

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ fileFilter, limits }).array('image', 5);

// eslint-disable-next-line new-cap
const router = express.Router();

// router.use(sessions); //
router.get('/', authCheck);
router.post(
  '/',
  upload,
  async (req: any, res, next) => {
    req.body.ratings = JSON.parse(req.body.ratings); // parse first the stringify object ratings from Form Data.
    next();
  },
  authCheckMw,
  validateReg(ajvValidateUpload),
  async (req: any, res, next) => {
    const { files }: any = req;
    const { title, storeName, ratings, category } = req.body; // save references
    const userId = req.user.id; // req.user.id
    const { username } = req.user; // req.user.username
    // if file size exceed 1MB do sharp and imagemin
    const overallRating = ratings.map((n: any) => n.score).reduce((prev: any, score: any) => prev + score, 0) / 3; // 0 is initial value
    const uploadDetails: any = async (
      idUser: any,
      userName: any,
      postTitle: any,
      storename: any,
      individualRating: any,
      postCategory: any,
      averageRating: any,
    ) => {
      try {
        await db.query('BEGIN');
        const postId = await db.query(
          `INSERT INTO posts(fk_users_id, author, title, store_name, category, quality, price, customer_service, overall_product_rating) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9) RETURNING pk_post_id`,
          [
            idUser,
            userName,
            postTitle,
            storename,
            postCategory,
            individualRating[0].score,
            individualRating[1].score,
            individualRating[2].score,
            averageRating,
          ],
        );
        await db.query(`UPDATE users SET post_count=post_count+1 WHERE pk_users_id=$1`, [userId]);
        await db.query('COMMIT');
        return [postId, null];
      } catch (e1) {
        await db.query('ROLLBACK');
        return [null, e1];
      }
    };
    const uploadRedis = async (
      postId: any,
      idUser: any,
      userName: any,
      postTitle: any,
      storename: any,
      individualRating: any,
      postCategory: any,
      averageRating: any,
    ) => {
      try {
        const dateCreated = await db.query(`SELECT date_created from posts where pk_post_id=$1`, [
          postId.rows[0].pk_post_id,
        ]);
        // without v4 for zAdd is not working bug...
        // if error delete the inserted data
        if (dateCreated) {
          await redisClient.executeIsolated(async (isolatedClient) => {
            await isolatedClient.watch(`user:${idUser}`);
            const multi = isolatedClient
              .multi()
              .hSet(`post:${postId.rows[0].pk_post_id}`, [
                'id',
                `${postId.rows[0].pk_post_id}`,
                'user_id',
                `${idUser}`, // req.user.id
                'author',
                `${userName}`, // req.user.username
                'title',
                `${postTitle}`,
                'store_name',
                `${storename}`,
                'overall_rating',
                `${averageRating}`,
                'quality',
                `${individualRating[0].score}`,
                'price',
                `${individualRating[1].score}`,
                'customer_service',
                `${individualRating[2].score}`,
                'likes_count',
                `${0}`,
                'views_count',
                `${0}`,
                'category',
                `${postCategory}`,
                'comments_count',
                `${0}`,
                'date_created',
                `${dateCreated.rows[0].date_created}`,
              ])
              .lPush(`user:list:${userId}`, `${postId.rows[0].pk_post_id}`)
              .hIncrBy(`user:${userId}`, 'post_count', 1)
              .v4.zAdd('postsSortedSet', [
                {
                  score: 1,
                  value: `${postId.rows[0].pk_post_id}`,
                },
              ]);
            return multi.exec();
          });
          return ['Success', null];
        }
        return [null, 'Error'];
      } catch (e2) {
        await db.query('ROLLBACK');
        await redisClient.executeIsolated(async (isolatedClient) => {
          await isolatedClient.watch(`user:${userId}`);
          const multi = isolatedClient
            .multi()
            .del(`post:${postId.rows[0].pk_post_id}`) // delete entire post details
            .del(`images:${postId.rows[0].pk_post_id}`) // delete entire images associated with post details
            .hIncrBy(`user:${userId}`, 'post_count', -1) // decrement post count
            .zRem('postsSortedSet', `${postId.rows[0].pk_post_id}`) // remove post from postsSortedSet
            .lRem(`user:list:${userId}`, 0, `${postId.rows[0].pk_post_id}`); // delete post from user post list
          return multi.exec();
        });

        return [null, e2];
      }
    };
    const uploadFiles = async (postFiles: any, details: any) => {
      try {
        // if error delete the inserted data
        const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
        const s3 = new S3();

        const uploadParams = postFiles.map((file: any) => {
          const appendFileName = nanoid(64); // 32 characters append to file original filename.
          const fileName = appendFileName + file.originalname;
          // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
          const checkFileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
          if (
            checkFileExtension === 'jpeg' ||
            checkFileExtension === 'jpg' ||
            checkFileExtension === 'png' ||
            checkFileExtension === 'webp'
          ) {
            return {
              Bucket: bucketName,
              Body: file.buffer,
              Key: `imageuploads/${fileName}`,
            };
          }
          // if theres no fileextension name.jpeg, concatenate .jpeg to the file that has no extension name.
          return {
            Bucket: bucketName,
            Body: file.buffer,
            Key: `imageuploads/${fileName}${'.jpeg'}`,
          };
        });
        uploadParams.map(async (params: any) => {
          // const filename = params.Key.replace("imageuploads/", ""); // use replace if you know what string already to be replaced by empty string
          // use slice if you dont know what digits, characters to be removed
          const filename = params.Key.substring(13, params.Key.length - 0);
          // const filename2 = params.Key.replace("imageuploads/", ""); substring is 0(1) which makes it faster

          const mediaId = nanoid(32);
          try {
            await db.query('BEGIN');
            await db.query(
              `INSERT INTO images(fk_post_id, media_id, image_url) VALUES ($1,$2, $3) RETURNING pk_image_id`,
              [details.rows[0].pk_post_id, mediaId, filename],
            );
            await db.query('COMMIT');
          } catch (e4) {
            await db.query('ROLLBACK');
            return e4;
          }
          try {
            await redisClient.executeIsolated(async (isolatedClient) => {
              await isolatedClient.watch(`post:${uploadDetails.rows[0].pk_post_id}`);
              const multi = isolatedClient
                .multi()
                .hSet(`images:${uploadDetails.rows[0].pk_post_id}`, JSON.stringify(filename), JSON.stringify(filename));
              return multi.exec();
            });
          } catch (e5) {
            const deleteImages = await redisClient.del(`images:${details.rows[0].pk_post_id}`);
            if (deleteImages) return e5;
            return e5; // I'm not returning [null, e5] here coz its not the parent try catch its a child try catch. e5 error will be redirected
            // to the parent e3;
          }
          // await redisClient.v4
          //   .hSet(
          //     `images:${uploadDetails.rows[0].pk_post_id}`,
          //     JSON.stringify(filename),
          //     JSON.stringify(filename)
          //   )
          //   .catch(async (e: Error) => {
          //     await redisClient.del(`post:${uploadDetails.rows[0].pk_post_id}`);
          //   });
        });
        await Promise.all(uploadParams.map((params: any) => s3.upload(params).promise())).catch(async () => {
          // invalidate redis and database
          const rollbackPostgres = await db.query('ROLLBACK');
          const deleteImagesRedis = await redisClient.del(`images:${uploadDetails.rows[0].pk_post_id}`);
          const deleteImages = uploadParams.map((params: any) => {
            const parameters = {
              Bucket: params.Bucket,
              Key: params.Key,
            };
            s3.deleteObject(parameters, (err, data) => {
              if (err) {
                return [null, err];
              }
              return [null, err];
            });
          });
          await Promise.allSettled([rollbackPostgres, deleteImagesRedis, deleteImages]);
          return [null, 'Error'];
        });
        return ['Success', null];
      } catch (e3) {
        // if e4 or e5 is true it will be passed to e3...
        return [null, e3]; // I only use return [null, e] in parent try catch, for child/nested try catch, its return e;
        // its because i'm using the data value i parent, I'm not using the datafrom child;
      }
    };
    const [postId, e1] = await uploadDetails(userId, username, title, storeName, ratings, category, overallRating);
    const [redisPostDetailsUpload, e2] = await uploadRedis(
      postId,
      userId,
      username,
      title,
      storeName,
      ratings,
      category,
      overallRating,
    );
    const [successUpload, e3] = await uploadFiles(files, postId);

    if (postId && redisPostDetailsUpload && successUpload) {
      return res.status(200).json({
        data: {
          userId: req.user.id,
        },
      });
    }
    if (e1 || e2 || e3) {
      if (e3) {
        await db.query('ROLLBACK');
        await redisClient.executeIsolated(async (isolatedClient) => {
          await isolatedClient.watch(`user:${userId}`);
          const multi = isolatedClient
            .multi()
            .del(`post:${postId.rows[0].pk_post_id}`) // delete entire post details
            .del(`images:${postId.rows[0].pk_post_id}`) // delete entire images associated with post details
            .hIncrBy(`user:${userId}`, 'post_count', -1) // decrement post count
            .zRem('postsSortedSet', `${postId.rows[0].pk_post_id}`) // remove post from postsSortedSet
            .lRem(`user:list:${userId}`, 0, `${postId.rows[0].pk_post_id}`); // delete post from user post list
          return multi.exec();
        });
        return next(ApiError.internalError('Error'));
      }
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);

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

// generate a signed url for the images
// const signedUrl = await s3.getSignedUrlPromise("getObject", {
//   Bucket: bucketName,
//   Key: `imageuploads/${filename}`, // from redis image url
//   Expires: 60, //in seconds
// });
// === res.status(200).json({ data: {
//    signedUrl: `imageuploads/${filenameFromRedisGetRequest}` // sent to the browser
// }})
