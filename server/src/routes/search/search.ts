import express from 'express';
import { S3 } from 'aws-sdk';
import ApiError from '../../middleware/api-error-handler/apiError';
import redisClient from '../../models/redis/redis';
import { ajvValidateSearch } from '../../models/ajv/auth';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    const isValid = ajvValidateSearch(req.query);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error'));
  },
  async (req: any, res: any, next: any) => {
    // search query validation ajv
    const { query, page } = req.query;
    const start = 0 + parseInt(page) * 25; // 2*24 = 48
    const end = 24 + parseInt(page) * 25; // 2*24 = 72
    const s3 = new S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
    const redisSearch = await redisClient.ft
      .search('posts:index', query, {
        LIMIT: {
          from: start,
          size: end, // number of items
        },
      })
      .catch(() => {
        return next(ApiError.internalError('Error'));
      });
    const result = redisSearch.documents;
    const searchResults = result.map(async (values: any) => {
      const data = values.value;
      const imageId = values.value.id;
      const getImagesFromRedis = await redisClient.v4.hGetAll(`images:${imageId}`).catch(() => {
        return next(ApiError.internalError('Error'));
      });
      const getImageValues = Object.values(getImagesFromRedis);
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
    return res.status(200).json({ data: 'No posts are available' });
  },
);

export default router;
