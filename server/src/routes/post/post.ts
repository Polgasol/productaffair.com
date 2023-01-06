/* eslint-disable no-unused-vars */
import express from 'express';
import { S3 } from 'aws-sdk';
import db from '../../pool/pool';
import ApiError from '../../middleware/api-error-handler/apiError';
import redisClient from '../../models/redis/redis';
import { ajvValidatePostId } from '../../models/ajv/auth';

const ipaddr = require('ipaddr.js');

const router = express.Router();

router.get(
  '/:postId',
  (req, res, next) => {
    const isValid = ajvValidatePostId(req.params);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next) => {
    const s3 = new S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
    const { postId } = req.params; // need to parse to get the value do not Stringiy because nodejs will add quotation marks to the query string
    const idToString = JSON.parse(postId); // need to parse the number because nodejs cant read
    const checkPostExist = await redisClient.v4.hExists(`post:${idToString}`, 'id');
    // if user is the author, he can delete the post
    if (checkPostExist) {
      // https://blog.apify.com/ipv4-mapped-ipv6-in-nodejs/
      if (ipaddr.isValid(req.ip) && req.user) {
        const checkUsernamePostIdExist = await redisClient.v4
          .hExists(`view:${req.user.username}++${req.ip}++${idToString}`, 'id')
          .catch(() => {
            return next(ApiError.internalError('Error'));
          });
        if (checkUsernamePostIdExist) {
          // do not increment views
          // just return the post details
          // if exist do not increment
          const getPost = await redisClient.v4.hGetAll(`post:${postId}`);
          const profileImg = await redisClient.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
          const profileImgUrl = async () => {
            if (profileImg !== '""') {
              const signedUrl = await s3.getSignedUrlPromise('getObject', {
                Bucket: bucketName,
                Key: `imageuploads/${profileImg}`, // from redis image url
                Expires: 60, // in seconds
              });
              return signedUrl;
            }

            // const signedUrl = await s3.getSignedUrlPromise("getObject", {
            //   Bucket: bucketName,
            //   Key: `imageuploads/${profileImg}`, // from redis image url
            //   Expires: 60, //in seconds
            // });
            return null;
          };

          const profileImage = await profileImgUrl();
          const postImages = await redisClient.v4.hGetAll(`images:${postId}`);
          const imageGetValues = Object.values(postImages);

          const checkIfAlreadyFollowed = async () => {
            const check = await redisClient.v4.hGet(`followers:user:${getPost.user_id}`, req.user.id);

            if (!check) {
              return '!Following';
            }
            return 'Following';
          };

          // check if you are viewing your own post. Do not show follow button if you are viewing own post.
          const checkIfYouAreTheAuthor = async () => {
            if (req.user) {
              if (req.user.id === getPost.user_id) {
                return 'Author';
              }
              return '!Author';
            }
            return 'Guest';
          };

          const checkIfLike = async () => {
            const check = await redisClient.v4.hGet(`likes:post:${getPost.id}`, req.user.id);

            if (!check) {
              return '!Like';
            }
            return 'Like';
          };

          const sendData = async () => {
            const imageUrl = imageGetValues.map(async (img: any) => {
              const imgWithoutQuotes = img.slice(1, -1); // remove double quotes
              const signedUrl = await s3.getSignedUrlPromise('getObject', {
                Bucket: bucketName,
                Key: `imageuploads/${imgWithoutQuotes}`, // from redis image url
                Expires: 60, // in seconds
              });
              return signedUrl;
            });
            const images = await Promise.all(imageUrl);
            if (images.length > 1) {
              images.reverse(); // needs to be reverse because redis is returning the last item.
            }
            return {
              profileImg: profileImage,
              ...getPost,
              images,
            };
          };

          return res.status(200).json({
            data: await sendData(),
            isFollowed: await checkIfAlreadyFollowed(),
            isLike: await checkIfLike(),
            isAuthor: await checkIfYouAreTheAuthor(),
          }); // send updated post details
        }
        // increment then send the incremented views count together with post details.
        await redisClient
          .multi()
          .hSet(`view:${req.user.username}++${req.ip}++${postId}`, 'id', postId)
          .expire(
            `view:${req.user.username}++${req.ip}++${postId}`,
            150, // secs
          )
          .hIncrBy(`post:${postId}`, 'views_count', 1)
          .exec();

        const getPost = await redisClient.v4.hGetAll(`post:${postId}`);
        const profileImg = await redisClient.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
        const postViewsPg = async () => {
          try {
            await db.query('BEGIN');
            await db.query(`UPDATE posts SET views_count=views_count + 1 WHERE pk_post_id = $1`, [Number(postId)]);
            await db.query(`INSERT INTO views(fk_post_id,viewer_username,ipa) VALUES($1,$2,$3)`, [
              Number(postId),
              req.user.username,
              req.ip,
            ]);
            await db.query('COMMIT');
            return ['Success', null];
          } catch (e) {
            await db.query('ROLLBACK');
            return [null, 'Error'];
          }
        };

        const profileImgUrl = async () => {
          const signedUrl = await s3.getSignedUrlPromise('getObject', {
            Bucket: bucketName,
            Key: `imageuploads/${profileImg}`, // from redis image url
            Expires: 60, // in seconds
          });
          return signedUrl;
        };

        const profileImage = await profileImgUrl();
        const postImages = await redisClient.v4.hGetAll(`images:${postId}`);
        const imageGetValues = Object.values(postImages);

        const checkIfAlreadyFollowed = async () => {
          const check = await redisClient.v4.hGet(`followers:user:${getPost.user_id}`, req.user.id);

          if (!check) {
            return 'Not following';
          }
          return 'Following';
        };
        const checkIfYouAreTheAuthor = async () => {
          if (req.user) {
            if (req.user.id === getPost.user_id) {
              return 'Author';
            }
            return '!Author';
          }
          return 'Guest';
        };

        const checkIfLike = async () => {
          const check = await redisClient.v4.hGet(`likes:post:${getPost.id}`, req.user.id);

          if (!check) {
            return 'No like';
          }
          return 'Like';
        };
        const sendData = async () => {
          const imageUrl = imageGetValues.map(async (img: any) => {
            const imgWithoutQuotes = img.slice(1, -1); // remove double quotes
            const signedUrl = await s3.getSignedUrlPromise('getObject', {
              Bucket: bucketName,
              Key: `imageuploads/${imgWithoutQuotes}`, // from redis image url
              Expires: 60, // in seconds
            });
            return signedUrl;
          });
          const images = await Promise.all(imageUrl);
          if (images.length > 1) {
            images.reverse(); // needs to be reverse because redis is returning the last item.
          }
          return {
            profileImg: profileImage,
            ...getPost,
            images,
          };
        };

        const [successPgViewsPost, failPgViewsPost] = await postViewsPg();

        if (successPgViewsPost) {
          return res.status(200).json({
            data: await sendData(),
            isFollowed: await checkIfAlreadyFollowed(),
            isLike: await checkIfLike(),
            isAuthor: await checkIfYouAreTheAuthor(),
          }); // send updated post details
        }
        return next(ApiError.internalError('Error'));
      }
      /*---------------------------------------------------------------------------------------------------------*/
      if (ipaddr.isValid(req.ip) && !req.user) {
        // LOGGED IN AS GUEST
        const checkIpPostIdExist = await redisClient.v4.hExists(`view:${req.ip}++${postId}`, 'id');
        if (checkIpPostIdExist) {
          // do not increment views
          // just return the post details
          const getPost = await redisClient.v4.hGetAll(`post:${postId}`);
          const profileImg = await redisClient.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
          const profileImgUrl = async () => {
            const signedUrl = await s3.getSignedUrlPromise('getObject', {
              Bucket: bucketName,
              Key: `imageuploads/${profileImg}`, // from redis image url
              Expires: 60, // in seconds
            });
            return signedUrl;
          };

          const profileImage = await profileImgUrl();
          const postImages = await redisClient.v4.hGetAll(`images:${postId}`);
          const imageGetValues = Object.values(postImages);

          const sendData = async () => {
            const imageUrl = imageGetValues.map(async (img: any) => {
              const imgWithoutQuotes = img.slice(1, -1); // remove double quotes
              const signedUrl = await s3.getSignedUrlPromise('getObject', {
                Bucket: bucketName,
                Key: `imageuploads/${imgWithoutQuotes}`, // from redis image url
                Expires: 60, // in seconds
              });
              return signedUrl;
            });
            const images = await Promise.all(imageUrl);
            if (images.length > 1) {
              images.reverse(); // needs to be reverse because redis is returning the last item.
            }
            return {
              profileImg: profileImage,
              ...getPost,
              images,
            };
          };
          return res.status(200).json({
            data: await sendData(),
            isFollowed: 'Guest',
            isLike: 'Guest',
            isAuthor: 'Guest',
          }); // send updated post details
        }
        // increment then send the incremented views count together with post details.
        await redisClient
          .multi()
          .hSet(`view:${req.ip}++${postId}`, 'id', postId)
          .expire(
            `view:${req.ip}++${postId}`,
            150, // secs
          )
          .hIncrBy(`post:${postId}`, 'views_count', 1)
          .exec();
        const getPost = await redisClient.v4.hGetAll(`post:${postId}`);
        const profileImg = await redisClient.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
        const postViewsPg = async () => {
          try {
            await db.query('BEGIN');
            await db.query(`UPDATE posts SET views_count=views_count + 1 WHERE pk_post_id = $1`, [Number(postId)]);
            await db.query(`INSERT INTO views(fk_post_id,ipa) VALUES($1,$2)`, [Number(postId), req.ip]);
            await db.query('COMMIT');
            return ['Success', null];
          } catch (e) {
            await db.query('ROLLBACK');
            return [null, 'Error'];
          }
        };

        const profileImgUrl = async () => {
          const signedUrl = await s3.getSignedUrlPromise('getObject', {
            Bucket: bucketName,
            Key: `imageuploads/${profileImg}`, // from redis image url
            Expires: 60, // in seconds
          });
          return signedUrl;
        };

        const profileImage = await profileImgUrl();
        const postImages = await redisClient.v4.hGetAll(`images:${postId}`);
        const imageGetValues = Object.values(postImages);

        const sendData = async () => {
          const imageUrl = imageGetValues.map(async (img: any) => {
            const imgWithoutQuotes = img.slice(1, -1); // remove double quotes
            const signedUrl = await s3.getSignedUrlPromise('getObject', {
              Bucket: bucketName,
              Key: `imageuploads/${imgWithoutQuotes}`, // from redis image url
              Expires: 60, // in seconds
            });
            return signedUrl;
          });
          const images = await Promise.all(imageUrl);
          if (images.length > 1) {
            images.reverse(); // needs to be reverse because redis is returning the last item.
          }
          return {
            profileImg: profileImage,
            ...getPost,
            images,
          };
        };
        const [successPgViewsPost, failPgViewsPost] = await postViewsPg();
        if (successPgViewsPost) {
          return res.status(200).json({
            data: await sendData(),
            isFollowed: 'Guest',
            isLike: 'Guest',
            isAuthor: 'Guest',
          }); // send updated post details
        }
        return next(ApiError.internalError('Error'));
      }
      // if user do not accept terms privacy
      // else do not increment because ip is not valid...
      // just send the post details
      const getPost = await redisClient.v4.hGetAll(`post:${postId}`);
      const profileImg = await redisClient.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
      const profileImgUrl = async () => {
        const signedUrl = await s3.getSignedUrlPromise('getObject', {
          Bucket: bucketName,
          Key: `imageuploads/${profileImg}`, // from redis image url
          Expires: 60, // in seconds
        });
        return signedUrl;
      };

      const profileImage = await profileImgUrl();
      const postImages = await redisClient.v4.hGetAll(`images:${postId}`);
      const imageGetValues = Object.values(postImages);

      const sendData = async () => {
        const imageUrl = imageGetValues.map(async (img: any) => {
          const imgWithoutQuotes = img.slice(1, -1); // remove double quotes
          const signedUrl = await s3.getSignedUrlPromise('getObject', {
            Bucket: bucketName,
            Key: `imageuploads/${imgWithoutQuotes}`, // from redis image url
            Expires: 60, // in seconds
          });
          return signedUrl;
        });
        const images = await Promise.all(imageUrl);
        if (images.length > 1) {
          images.reverse(); // needs to be reverse because redis is returning the last item.
        }
        return {
          profileImg: profileImage,
          ...getPost,
          images,
        };
      };
      return res.status(200).json({
        data: await sendData(),
        isFollowed: 'Guest',
        isLike: 'Guest',
        isAuthor: 'Guest',
      }); // send updated post details
    }
    return next(ApiError.internalError('No Post Found'));
  },
);

export default router;
