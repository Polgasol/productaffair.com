import express from 'express';
import { S3 } from 'aws-sdk';
import ApiError from '../../middleware/api-error-handler/apiError';
import redisClient from '../../models/redis/redis';
import { ajvValidateGetCategories } from '../../models/ajv/auth';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    const isValid = ajvValidateGetCategories(req.query);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    const { category, page } = req.query;
    const start = 0 + parseInt(page) * 25;
    const end = 24 + parseInt(page) * 25;
    const s3 = new S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
    try {
      const redisSearch = await redisClient.ft.search('posts:index', `@category:${category}`, {
        LIMIT: {
          from: start,
          size: end, // number of items
        },
        SORTBY: {
          BY: 'date_created',
        },
      });
      const result = redisSearch.documents;
      const searchResults = result.map(async (values) => {
        const data = values.value;
        const imageId = values.value.id;
        const userId = values.value.user_id;
        const profileImg = await redisClient.v4.hGet(`user:${userId}`, 'profile_img_src');
        const profileImgUrl = async () => {
          if (profileImg !== '""') {
            const signedUrl = await s3.getSignedUrlPromise('getObject', {
              Bucket: bucketName,
              Key: `imageuploads/${profileImg}`, // from redis image url
              Expires: 60, // in seconds
            });
            return signedUrl;
          }
          return null;
        };
        const profileImage = await profileImgUrl();
        const getImagesFromRedis = await redisClient.v4.hGetAll(`images:${imageId}`);
        const getImageValues = Object.values(getImagesFromRedis); // remove the repeated key by using object.values

        const imageUrl = getImageValues.map(async (img: any) => {
          const imgWithoutQuotes = img.slice(1, -1);
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
          ...data,
          images,
        };
      });
      if (parseInt(page) < 0) {
        return next(ApiError.internalError('Error'));
      }
      //  1000 is the maximum allowed page
      if (parseInt(page) > 1000) {
        return next(ApiError.internalError('Error'));
      }
      if (!result.length) {
        return res.status(200).json({ data: undefined });
      }
      if (result) {
        return res.status(200).json({ data: await Promise.all(searchResults.reverse()) });
      }
      return next(ApiError.internalError('Error'));
    } catch (e) {
      return next(ApiError.internalError('Error'));
    }
  },
);
export default router;
