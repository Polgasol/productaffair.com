/* eslint-disable no-unused-vars */
import express from 'express';
import ApiError from '../../middleware/api-error-handler/apiError';
import redisClient from '../../models/redis/redis';
import { ajvValidateFollow } from '../../models/ajv/auth';
import { authCheckMw } from '../../middleware/authCheck/authCheck';
import db from '../../pool/pool';

const router = express.Router();

router.post(
  '/',
  authCheckMw,
  (req, res, next) => {
    const isValid = ajvValidateFollow(req.body);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    const { userId } = req.body;
    const checkIfUserExist = await redisClient.v4.hExists(`user:${userId}`, 'id');

    if (checkIfUserExist) {
      const checkIfAlreadyUnfollowed = await redisClient.v4.hGet(`followers:user:${userId}`, req.user.id);

      if (!checkIfAlreadyUnfollowed) {
        return res.status(200).json({ data: '!Following' }); // show followed in react regardless.
      }
      const unfollowToRedis = async () => {
        try {
          await db.query('BEGIN');
          await redisClient.executeIsolated(async (isolatedClient) => {
            await isolatedClient.watch(`user:${userId}`);
            const multi = isolatedClient
              .multi()
              .hDel(`followers:user:${userId}`, req.user.id)
              .hIncrBy(`user:${userId}`, 'total_followers', -1);
            return multi.exec();
          });
          await db.query('COMMIT');
          return ['Success', null];
        } catch (e) {
          await db.query('ROLLBACK');
          return [null, 'Error'];
        }
      };
      const unfollowToPostgres = async () => {
        try {
          await db.query('BEGIN');
          await db.query(
            // delete remove user
            // "INSERT INTO follow(user_followed_id,new_follower_id) VALUES($1,$2)",
            `Delete FROM follow WHERE user_followed_id=$1 AND new_follower_id=$2`,
            [Number(userId), Number(req.user.id)],
          );
          await db.query(`UPDATE users SET followers_count=followers_count - 1 WHERE pk_users_id = $1`, [
            Number(userId),
          ]);
          await db.query(`UPDATE users SET following_count=following_count - 1 WHERE pk_users_id = $1`, [
            Number(req.user.id),
          ]);
          await db.query('COMMIT');
          return ['Success', null];
        } catch (e) {
          await db.query('ROLLBACK');
          return [null, 'Error'];
        }
      };
      const [successUnfollowRedis, failureUnfollowRedis] = await unfollowToRedis();
      const [successUnfollowPg, failureUnfollowPg] = await unfollowToPostgres();

      if (successUnfollowRedis && successUnfollowPg) {
        return res.status(200).json({ data: '!Following' });
      }

      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);
export default router;
