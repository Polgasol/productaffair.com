/* eslint-disable no-unused-vars */
import express from 'express';
import dayjs from 'dayjs';
import db from '../../pool/pool';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import User from '../../models/user-data/user';
import { ajvVerifyCode } from '../../models/ajv/auth';
import { deleteCode, createCode } from '../../controllers/verifyCode';
import ApiError from '../../middleware/api-error-handler/apiError';
import { authCheck, authCheckMwVerify } from '../../middleware/authCheck/authCheck';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', authCheck);

// const updateVerifiedPg = async (verified: any, email: any) => {
//   try {
//     await db.query('BEGIN');
//     await User.updateVerified(verified, email);
//     await db.query('COMMIT');
//     return ['Success', null];
//   } catch (e) {
//     await db.query('ROLLBACK');
//     return [null, 'Error'];
//   }
// };
router.post('/', validateReg(ajvVerifyCode), authCheckMwVerify, async (req: any, res, next) => {
  const { verificationCode } = req.body;
  const verified = true;
  if (verificationCode === req.user.vcode) {
    const [success, failure] = await User.updateVerified(verified, req.user.email);

    if (success) {
      delete req.user.vcode;
      delete req.user.resendTries;
      delete req.user.vcodeTime;
      req.user.verified = verified;
      return req.session.save((err: Error) => {
        if (err) return next(ApiError.internalError('Error'));
        return res.status(200).json({
          data: {
            auth: {
              verified: req.user.verified,
              type: req.user.authtype,
            },
            user: {
              id: req.user.id,
              username: req.user.username,
              guest: req.user.guest,
              timezone: req.user.tz,
            },
          },
        });
      });
    }
    return next(ApiError.internalError('Error'));
  }
  return res.status(200).json({
    data: {
      auth: {
        verified: req.user.verified,
        type: req.user.authtype,
      },
      user: {
        id: req.user.id,
        username: req.user.username,
        guest: req.user.guest,
        timezone: req.user.tz,
      },
    },
  });
});

// check for number of retries available
const retries = (req: any, res: any, next: any) => {
  if (req.user.resendTries === 1) {
    req.user.resendTries = 0;
    req.user.vcodeTime = dayjs();
    return req.session.save((err: Error) => {
      if (err) {
        return next(ApiError.internalError('Error'));
      }
      return next();
    });
  }
  // req.user.resentries === 0 if already clicked the resend
  if (req.user.resendTries === 0) {
    // check for diff between time created vs current time
    const timeToExpire = 120; // seconds
    const currentTime = dayjs();
    const diffSeconds = currentTime.diff(req.user.vcodeTime, 'second');

    if (diffSeconds > timeToExpire) {
      // req.user.resendTries = 1;
      // if beyond 120s, he can request for new code
      req.user.vcodeTime = dayjs();
      return req.session.save((err: Error) => {
        if (err) {
          return next(ApiError.internalError('Error'));
        }
        return next();
      });
    }
    return res.status(200).json({ ttl: diffSeconds }); // use in reactjs res.data.ttl
  }
  return next(ApiError.internalError('Error'));
};
router.get('/resend', authCheckMwVerify, retries, createCode); // , (req, res) => {
// return res.status(200).json({ message: 'We have sent a new code on your email' });
// }); // resend back to "/verify" with new verification code.

export default router;
