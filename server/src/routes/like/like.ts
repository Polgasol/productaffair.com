/* eslint-disable no-unused-vars */
import express from 'express';
import db from '../../pool/pool';
import ApiError from '../../middleware/api-error-handler/apiError';
import { ajvValidateLike } from '../../models/ajv/auth';
import redisClient from '../../models/redis/redis';
import { authCheckMwLike } from '../../middleware/authCheck/authCheck';

const router = express.Router();

router.post(
  '/',
  authCheckMwLike,
  (req, res, next) => {
    const isValid = ajvValidateLike(req.body);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    const { postId } = req.body;
    // check if post exists;
    const checkIfPostExist = await redisClient.v4.hExists(`post:${postId}`, 'id');
    if (checkIfPostExist) {
      const checkIfAlreadyLiked = await redisClient.v4.hGet(`likes:post:${postId}`, req.user.id);

      if (checkIfAlreadyLiked) {
        return res.status(200).json({ data: 'Like' }); // show followed in react regardless.
      }
      const likeToRedis = async () => {
        try {
          await redisClient.executeIsolated(async (isolatedClient) => {
            await isolatedClient.watch(`post:${postId}`);
            const multi = isolatedClient
              .multi()
              .hSet(`likes:post:${postId}`, req.user.id, req.user.id)
              .hIncrBy(`post:${postId}`, 'likes_count', 1);
            return multi.exec();
          });
          return ['Success', null];
        } catch (e) {
          return [null, 'Error'];
        }
      };

      const likeToPg = async () => {
        try {
          await db.query('BEGIN');
          await db.query('INSERT INTO post_likes(fk_post_id,fk_liker_id) VALUES($1,$2)', [
            Number(postId),
            Number(req.user.id),
          ]);
          await db.query(`UPDATE posts SET likes_count=likes_count + 1 WHERE pk_post_id = $1`, [Number(postId)]);
          await db.query('COMMIT');
          return ['Success', null];
        } catch (e) {
          await db.query('ROLLBACK');
          return [null, 'Error'];
        }
      };
      const [successLikeRedis, failureLikeRedis] = await likeToRedis();
      const [successLikePg, failureLikePg] = await likeToPg();

      if (successLikeRedis && successLikePg) {
        return res.status(200).json({ data: 'Like' });
      }

      return next(ApiError.internalError('Error'));
    }

    return next(ApiError.internalError('Error'));
  },
);
export default router;
