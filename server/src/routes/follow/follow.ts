/* eslint-disable no-unused-vars */
import express from 'express';
import db from '../../pool/pool';
import ApiError from '../../middleware/api-error-handler/apiError';
import { ajvValidateFollow } from '../../models/ajv/auth';
import redisClient from '../../models/redis/redis';
import { authCheckMw } from '../../middleware/authCheck/authCheck';

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
    const { userId } = req.body; // if user change the userId fron the front end, the he will follow the one he changed.

    // check if you already followed this userId
    const checkIfUserExist = await redisClient.v4.hExists(`user:${userId}`, 'id');

    if (checkIfUserExist) {
      const checkIfAlreadyFollowed = await redisClient.v4.hGet(`followers:user:${userId}`, req.user.id);
      if (checkIfAlreadyFollowed) {
        return res.status(200).json({ data: 'Following' }); // show followed in react regardless.
      }
      const followToRedis = async () => {
        try {
          await redisClient.executeIsolated(async (isolatedClient) => {
            await isolatedClient.watch(`user:${userId}`);
            const multi = isolatedClient
              .multi()
              .hSet(`followers:user:${userId}`, req.user.id, req.user.id)
              .hIncrBy(`user:${userId}`, 'total_followers', 1);
            return multi.exec();
          });
          return ['Success', null];
        } catch (e) {
          return [null, 'Error'];
        }
      };

      const uploadToPostgres = async () => {
        try {
          await db.query('BEGIN');
          await db.query('INSERT INTO follow(user_followed_id,new_follower_id) VALUES($1,$2)', [
            Number(userId),
            Number(req.user.id),
          ]);
          await db.query(`UPDATE users SET followers_count=followers_count + 1 WHERE pk_users_id = $1`, [
            Number(userId),
          ]);
          await db.query(`UPDATE users SET following_count=following_count + 1 WHERE pk_users_id = $1`, [
            Number(req.user.id),
          ]);
          await db.query('COMMIT');
          return ['Success', null];
        } catch (e) {
          await db.query('ROLLBACK');
          return [null, 'Error'];
        }
      };
      const [successRedisUpload, failureRedisUpload] = await followToRedis();
      const [successPgUpload, failurePgUpload] = await uploadToPostgres();

      if (successRedisUpload && successPgUpload) {
        return res.status(200).json({ data: 'Following' });
      }

      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);
export default router;
