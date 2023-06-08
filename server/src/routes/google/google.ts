/* eslint-disable no-unused-vars */
import express from 'express';
import passport from 'passport';
import ApiError from '../../middleware/api-error-handler/apiError';
// import logger from '../../logger/index';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(
  '/google',
  (req: any, res, next) => {
    if (req.user) {
      if (
        (req.user.authtype === 'local' && req.user.verified === true) ||
        (req.user.authtype === 'google' && req.user.verified === true)
      ) {
        return res.status(200).json({
          data: {
            verified: true,
            type: req.user.authtype,
          },
        });
      }
      if (req.user.authtype === 'google' && req.user.verified === false) {
        delete req.session.passport.user; // delete and proceed to google auth
        return req.session.save(req.sessionID, (err: Error) => {
          if (err) return next(ApiError.internalError('Error'));
          return next();
        });
      }
      if (req.user.authtype === 'local' && req.user.verified === false) {
        delete req.session.passport.user; // delete and proceed to google auth
        return req.session.save(req.sessionID, (err: Error) => {
          if (err) return next(ApiError.internalError('Error'));
          return next();
        });
      }
      return res.status(200).json({ data: { verified: false, type: 'guest' } });
    }
    return next();
  },
  passport.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account', // option for users to select different google accounts.
  }),
);
// router.get(
//   '/google/callback',
//   passport.authenticate('google', (err: any, user, info) => {
//   }),
// );

export default router;
