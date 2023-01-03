/* eslint-disable no-unused-vars */
import express from 'express';
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
router.get('/resend', authCheckMwVerify, deleteCode, createCode, (req, res) => {
  res.status(200).json('/verify');
}); // resend back to "/verify" with new verification code.

export default router;
