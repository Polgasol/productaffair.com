import express from 'express';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import { S3 } from 'aws-sdk';
import redisClient from '../../models/redis/redis';
import ApiError from '../../middleware/api-error-handler/apiError';
import { ajvValidatePages } from '../../models/ajv/auth';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    const isValid = ajvValidatePages(req.query);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res, next) => {
    const { page } = req.query;
    const s3 = new S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME as string;

    // get posts based on date;
    dayjs.extend(utc);
    dayjs.extend(timezone); // get guest's timezone
    dayjs.extend(duration);
    // const tz = dayjs.tz.guess();
    // const result = dayjs('2022-08-25 07:43:18.224706').tz(tz).format('MMMM DD, YYYY'); // utc from postgres too local timezone.
    // const date1 = dayjs().utc();
    // const date2 = dayjs('2022-08-29 01:11:18.224706');
    // console.log(date1);
    // console.log(dayjs.duration(date1.diff(date2)).asWeeks()); // get difference by week, every week lifespan of hotness.
    // def hotness(track)
    //   s = track.playedCount
    //   s = s + 2*track.downloadCount
    //   s = s + 3*track.likeCount
    //   s = s + 4*track.favCount
    //   baseScore = log(max(s,1))

    //   timeDiff = (now - track.uploaded).toWeeks

    //   if(timeDiff > 1)
    //       x = timeDiff - 1
    //       baseScore = baseScore * exp(-8*x*x)

    //   return baseScore
    const checkIfSortedSetExist = await redisClient.v4.zCard('postsSortedSet');

    const getAllPost = await redisClient.v4.zRange('postsSortedSet', 0, -1);
    const updateScores = getAllPost.map(async (postID: string) => {
      const getAllPosts = await redisClient.v4.hGetAll(`post:${postID}`); // returns all the elements inside a specific hash in array form
      const currentTime = dayjs().utc();
      const timeCreated = getAllPosts.date_created;
      const likesCount = parseInt(getAllPosts.likes_count) * 5; // 40% weight, 50% weight, 10% weight.
      const viewsCount = parseInt(getAllPosts.views_count) * 4;
      const commentsCount = parseInt(getAllPosts.comments_count) * 1;
      // if views, likes, comments = 0 then base score is equal to 1;
      const baseScore = Math.log(Math.max(likesCount + viewsCount + commentsCount, 1));
      const timeDifference = dayjs.duration(currentTime.diff(timeCreated)).asWeeks();
      if (timeDifference > 1) {
        const x = timeDifference - 1;
        const newScore = baseScore * Math.exp(-8 * x * x);
        // eslint-disable-next-line no-return-await
        return await redisClient.v4.zAdd('postsSortedSet', [{ score: newScore, value: postID }]);
      }
      // if post is just new but no views, it needs to be ranked higher than post with views
      // eslint-disable-next-line no-return-await
      return await redisClient.v4.zAdd('postsSortedSet', [{ score: baseScore, value: postID }]);
    });
    if (checkIfSortedSetExist === 0) {
      return res.status(200).json({ data: 'No posts are available' });
    }
    if (checkIfSortedSetExist > 1000000) {
      await redisClient.zPopMin('postsSortedSet');
    }
    if (getAllPost && updateScores) {
      const start = 0 + parseInt(page) * 24; // 2*24 = 48
      const end = 23 + parseInt(page) * 24; // 2*24 = 72
      // const start = 0 + parseInt(page) * 2; // 2*24 = 48
      // const end = 1 + parseInt(page) * 2; // 2*24 = 72

      const postData = await redisClient.v4.zRange('postsSortedSet', start, end, {
        REV: true,
      });

      if (postData) {
        const getPostData = postData.map(async (postID: string) => {
          // get the hash data from the zrange's postId reference
          const postDetails = await redisClient.v4.hGetAll(`post:${postID}`);
          const profileImg = await redisClient.v4.hGet(`user:${postDetails.user_id}`, 'profile_img_src');

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

            // const signedUrl = await s3.getSignedUrlPromise("getObject", {
            //   Bucket: bucketName,
            //   Key: `imageuploads/${profileImg}`, // from redis image url
            //   Expires: 60, //in seconds
            // });
            // return signedUrl;
          };

          const profileImage = await profileImgUrl();
          const postImages = await redisClient.v4.hGetAll(`images:${postID}`);
          const imageGetValues = Object.values(postImages);
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
            ...postDetails,
            images, // need to reverse the object send no need to have it in array.
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
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);

export default router;
