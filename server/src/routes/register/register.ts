import express from 'express';
import passport from 'passport';
// import logger from '../../logger/index';
import ApiError from '../../middleware/api-error-handler/apiError';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import { ajvValidateReg } from '../../models/ajv/auth';
import { createCode } from '../../controllers/verifyCode';
import { authCheck, authCheckMwRegister } from '../../middleware/authCheck/authCheck';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', authCheck);

router.post(
  '/',
  validateReg(ajvValidateReg),
  authCheckMwRegister,
  async (req: any, res, next) => {
    if (req.session) {
      delete req.session.guestuser;
      return req.session.save((err: Error) => {
        if (err) return next(ApiError.internalError('Error'));
        return next();
      });
    }
    return next();
  },
  (req: any, res, next) => {
    passport.authenticate('local-register', async (err, user, info) => {
      if (err) {
        return next(ApiError.internalError('Error Auth'));
      }
      if (info) {
        return next(ApiError.internalError('Error Auth'));
      }
      if (!user) {
        return next(ApiError.internalError('Error Auth'));
      }
      req.user = user;
      return req.login(user, async (error: Error) => {
        if (error) {
          return next(ApiError.internalError('Error Auth'));
        }
        return req.session.save(async (erro: Error) => {
          if (erro) {
            return next(ApiError.internalError('Error Auth'));
          }
          return next();
        });
      });
    })(req, res, next);
  },
  // check if theres already a verification code that exist
  createCode,
);

export default router;
