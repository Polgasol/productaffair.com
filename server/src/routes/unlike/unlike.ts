/* eslint-disable no-unused-vars */
import express from 'express';
import db from '../../pool/pool';
import ApiError from '../../middleware/api-error-handler/apiError';
import { ajvValidateLike } from '../../models/ajv/auth';
import redisClient from '../../models/redis/redis';
import { authCheckMwUnlike } from '../../middleware/authCheck/authCheck';

const router = express.Router();

router.post(
  '/',
  authCheckMwUnlike,
  (req, res, next) => {
    const isValid = ajvValidateLike(req.body);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    const { postId } = req.body;
    const checkIfPostExist = await redisClient.v4.hExists(`post:${postId}`, 'id');

    if (checkIfPostExist) {
      const checkIfAlreadyUnliked = await redisClient.v4.hGet(`likes:post:${postId}`, req.user.id);
      if (!checkIfAlreadyUnliked) {
        return res.status(200).json({ data: '!Like' }); // show followed in react regardless.
      }
      const unlikeRedis = async () => {
        try {
          await redisClient.executeIsolated(async (isolatedClient) => {
            await isolatedClient.watch(`post:${postId}`);
            const multi = isolatedClient
              .multi()
              .hDel(`likes:post:${postId}`, req.user.id)
              .hIncrBy(`post:${postId}`, 'likes_count', -1);
            return multi.exec();
          });
          return ['Success', null];
        } catch (e) {
          return [null, 'Error'];
        }
      };

      const unlikePg = async () => {
        try {
          await db.query(`Delete FROM post_likes WHERE fk_post_id=$1 AND fk_liker_id=$2`, [
            Number(postId),
            Number(req.user.id),
          ]);
          await db.query(`UPDATE posts SET likes_count=likes_count - 1 WHERE pk_post_id = $1`, [Number(postId)]);
          return ['Success', null];
        } catch (e) {
          return [null, 'Error'];
        }
      };
      const [successUnLikeRedis, failureUnLikeRedis] = await unlikeRedis();
      const [successUnLikePg, failureUnLikePg] = await unlikePg();

      if (successUnLikeRedis && successUnLikePg) {
        return res.status(200).json({ data: '!Like' });
      }
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);
export default router;
