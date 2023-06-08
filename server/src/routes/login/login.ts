import express from 'express';
import passport from 'passport';
import { ajvValidateLogin } from '../../models/ajv/auth';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import ApiError from '../../middleware/api-error-handler/apiError';
import { authCheck, authCheckMwLogin } from '../../middleware/authCheck/authCheck';
// import logger from '../../logger/index';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', authCheck);

// post request for user that is not logged in
router.post(
  '/',
  authCheckMwLogin,
  validateReg(ajvValidateLogin),
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
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(ApiError.internalError(err.message));
      }
      if (info) {
        return next(ApiError.internalError(info)); // message from done(null, false, { message: 'no user' })
      }
      if (!user) {
        // if user is not logged in
        // if something went wrong while authenticating in passport throw error.
        return next(ApiError.internalError('Error Auth')); // if theres no serialize user,
      }
      // req.logIn() assigns the user object to the request object req as req.user once the login operation completes.
      req.user = user;
      return req.login(user, (error: Error) => {
        if (error) {
          return next(ApiError.internalError('Error Auth'));
        }
        return req.session.save((erro: Error) => {
          if (erro) {
            return next(ApiError.internalError('Error Auth'));
          }
          return res.status(200).json({ data: { verified: true, type: 'local' } }); // send to frontend use in react-query const { data } = useMutation(['mutate'])
        });
      });
    })(req, res, next);
  },
);

export default router;
