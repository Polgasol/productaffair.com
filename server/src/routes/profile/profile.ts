import express from 'express';
import { S3 } from 'aws-sdk';
import ApiError from '../../middleware/api-error-handler/apiError';
import redisClient from '../../models/redis/redis';
// import logger from '../../logger';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req: any, res: any, next: any) => {
  // profile?user=15&page=0
  const { user, page } = req.query;
  const s3 = new S3();
  const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
  const start = 0 + parseInt(page) * 24;
  const end = 23 + parseInt(page) * 24;
  const checkIfUserListExist = await redisClient.v4.exists(`user:list:${user}`).catch(() => {
    return res.status(200).json({ data: undefined });
  });
  if (checkIfUserListExist) {
    const getPostKeys = await redisClient.v4.lRange(`user:list:${user}`, start, end);

    const getPostData = getPostKeys.map(async (keys: any) => {
      const postDetails = await redisClient.v4.hGetAll(`post:${keys}`).catch(() => {
        return next(ApiError.internalError('Error'));
      });
      const profileImg = await redisClient.v4.hGet(`user:${postDetails.user_id}`, 'profile_img_src').catch(() => {
        return next(ApiError.internalError('Error'));
      });
      const profileImgUrl = async () => {
        const signedUrl = await s3.getSignedUrlPromise('getObject', {
          Bucket: bucketName,
          Key: `imageuploads/${profileImg}`, // from redis image url
          Expires: 60, // in seconds
        });
        return signedUrl;
      };

      const profileImage = await profileImgUrl().catch(() => {
        return next(ApiError.internalError('Error'));
      });
      const postImages = await redisClient.v4.hGetAll(`images:${keys}`).catch(() => {
        return next(ApiError.internalError('Error'));
      });
      const imageGetValues = Object.values(postImages);

      const imageUrl = imageGetValues.map(async (img: any) => {
        const imgWithoutQuotes = img.slice(1, -1); // remove double quotes
        const signedUrl = await s3
          .getSignedUrlPromise('getObject', {
            Bucket: bucketName,
            Key: `imageuploads/${imgWithoutQuotes}`, // from redis image url
            Expires: 60, // in seconds
          })
          .catch(() => {
            return next(ApiError.internalError('Error'));
          });
        return signedUrl;
      });
      const images = await Promise.all(imageUrl);
      if (images.length > 1) {
        images.reverse(); // needs to be reverse because redis is returning the last item.
      }

      return {
        profileImg: profileImage,
        ...postDetails,
        images,
      };
    });
    // negative numbers arent allowed
    if (parseInt(page) < 0) {
      return next(ApiError.internalError('Error'));
    }
    //  1000 is the maximum allowed page
    if (parseInt(page) > 1000) {
      return next(ApiError.internalError('Error'));
    }
    if (!getPostData.length) {
      return res.status(200).json({ data: undefined });
    }
    return res.status(200).json({ data: await Promise.all(getPostData) });
  }
  return res.status(200).json({ data: 'No posts are available' });
});

export default router;
