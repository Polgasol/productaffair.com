import express from 'express';
import { S3 } from 'aws-sdk';
import multer from 'multer';
import { nanoid } from 'nanoid';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import db from '../../pool/pool';
import { ajvValidateAbout } from '../../models/ajv/auth';
import redisClient from '../../models/redis/redis';
import ApiError from '../../middleware/api-error-handler/apiError';
import { authCheckMwProfileInfo } from '../../middleware/authCheck/authCheck';
// eslint-disable-next-line new-cap
const router = express.Router();
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
const limits = {
  fields: 1, // maximum of only 1 text fields
  fileSize: 10000000, // 10MB
  files: 1, // 1 maximum number of files can be accepted
};
const upload = multer({ fileFilter, limits }).array('image', 2);

// =================================================================================================================>
router.get('/', async (req: any, res: any, next: any) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
  const s3 = new S3();
  const { user } = req.query;
  const getProfileInfo = await redisClient.v4.hmGet(`user:${user}`, [
    'id',
    'username',
    'about',
    'total_followers',
    'profile_img_src',
    'post_count',
  ]);
  const [userId, username, about, followers, profileImg, postCount] = getProfileInfo; // assigns the array values to variables
  const profileImgUrl = async (image: any) => {
    if (image !== '""') {
      const signedUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: bucketName,
        Key: `imageuploads/${image}`, // from redis image url
        Expires: 60, // in seconds
      });
      return signedUrl;
    }
    return null;
  };

  const profileImage = await profileImgUrl(profileImg);
  const dataInfo = {
    userId,
    username,
    about,
    followers,
    profileImage,
    postCount,
  };
  // send pic with image from aws

  const checkIfAuthor = async () => {
    if (req.user) {
      if (req.user.id === user) {
        return 'Author';
      }
      return '!Author';
    }
    return 'Guest';
  };

  const checkIfAlreadyFollowed = async () => {
    if (req.user) {
      const check = await redisClient.v4.hGet(`followers:user:${userId}`, req.user.id);

      if (!check) {
        return '!Following';
      }
      return 'Following';
    }
    return 'Guest';
  };

  return res.status(200).json({
    data: {
      ...dataInfo,
      isAuthor: await checkIfAuthor(),
      isFollowing: await checkIfAlreadyFollowed(),
    },
  });

  //   const getProfileInfo = await redisClient.v4.hmGet(`user:${user}`, [
  //     "id",
  //     "username",
  //     "about",
  //     "total_followers",
  //     "profile_img_src",
  //     "post_count",
  //   ]);
  //   const [userId, username, about, followers, profileImg, postCount] =
  //     getProfileInfo; // assigns the array values to variables

  //   const profileImgUrl = async () => {
  //     const signedUrl = await s3.getSignedUrlPromise("getObject", {
  //       Bucket: bucketName,
  //       Key: `imageuploads/${profileImg}`, // from redis image url
  //       Expires: 60, //in seconds
  //     });
  //     return signedUrl;
  //   };

  //   const profileImage = await profileImgUrl();
  //   const dataInfo = {
  //     userId,
  //     username,
  //     about,
  //     followers,
  //     profileImage,
  //     postCount,
  //   };
  //   // send pic with image from aws
  //   console.log(dataInfo);

  //   return res.status(200).json({ data: {...dataInfo, isAuthor: '!Author'} });
});

router.post(
  '/',
  upload,
  authCheckMwProfileInfo,
  validateReg(ajvValidateAbout),
  async (req: any, res: any, next: any) => {
    // profile?user=15
    const { files } = req;
    const { about } = req.body;
    const userId = req.user.id; // req.user.id, iuupload nya sa sarili nyang profile mismo

    const uploadToServer = async (files: any, userId: any, about: any) => {
      const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
      const s3 = new S3();
      try {
        /* -------------POSTGRES UPLOAD ABOUT TO USERS TABLE-------------------------*/
        await db.query('BEGIN');
        await db.query(`UPDATE users SET about=$1 WHERE pk_users_id=$2`, [about, userId]); // function 1
        await db.query('COMMIT');

        /* -------------POSTGRES UPLOAD ABOUT TO USERS TABLE-------------------------*/

        /* -------------CREATING UPLOAD PARAMETERS FOR S3 UPLOADS--------------------------------------------*/
        const uploadParams = files.map((file: any) => {
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
          // if theres no fileextension name.jpeg, concatenate one.
          return {
            Bucket: bucketName,
            Body: file.buffer,
            Key: `imageuploads/${fileName}${'.jpeg'}`,
          };
        });
        /* -------------CREATING UPLOAD PARAMETERS FOR S3 UPLOADS--------------------------------------------*/

        /* -------------UPLOADING IMAGE PATH TO REDIS AND POSTGRES------------------------------------------*/

        uploadParams.map(async (params: any) => {
          const filename = params.Key.substring(13, params.Key.length - 0); // use replace if you know what string already to be replaced by empty string
          // use slice if you dont know what digits, characters to be removed
          try {
            await db.query('BEGIN');
            await db.query(`UPDATE users SET profile_img_url=$1 WHERE pk_users_id=$2`, [filename, userId]);
            await db.query('COMMIT');
          } catch (e) {
            await db.query('ROLLBACK');
            return e;
          }
          try {
            await redisClient.executeIsolated(async (isolatedClient) => {
              await isolatedClient.watch(`user:${userId}`);
              const multi = isolatedClient
                .multi()
                .hSet(`user:${userId}`, 'profile_img_src', `${filename}`)
                .hSet(`user:${userId}`, 'about', `${about}`);
              return multi.exec();
            });
          } catch (e) {
            await db.query('ROLLBACK');
            await redisClient.executeIsolated(async (isolatedClient) => {
              await isolatedClient.watch(`user:${userId}`);
              const multi = isolatedClient
                .multi()
                .hSet(`user:${userId}`, 'profile_img_src', ``)
                .hSet(`user:${userId}`, 'about', ``);
              return multi.exec();
            });
            return e;
          }
        });
        /* -------------UPLOADING IMAGE PATH TO REDIS AND POSTGRES------------------------------------------*/

        /* -------------UPLOADING IMAGE THE MAIN FILE ITSELF TO AWS S3------------------------------------------*/
        await Promise.all(uploadParams.map((params: any) => s3.upload(params).promise())).catch(async (e: any) => {
          if (e) {
            const rollbackPostgres = await db.query('ROLLBACK');
            const deleteImagesRedis = await redisClient.executeIsolated(async (isolatedClient) => {
              await isolatedClient.watch(`user:${userId}`);
              const multi = isolatedClient
                .multi()
                .hSet(`user:${userId}`, 'profile_img_src', ``)
                .hSet(`user:${userId}`, 'about', ``);
              return multi.exec();
            });
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
          }
        });
        return ['Success', null];
      } catch (e) {
        await db.query('ROLLBACK');
        return [null, 'Error'];
      }
    };

    const [success, error] = await uploadToServer(files, userId, about);

    if (success) {
      return res.status(200).json({
        data: {
          message: 'Success',
          userId: req.user.id,
        },
      });
    }
    if (error) {
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);

export default router;
