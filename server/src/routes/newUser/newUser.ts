import express from 'express';
import validateReg from '../../middleware/ajv-validation/validateRegDto';
import { ajvValidateGoogleUsername } from '../../models/ajv/auth';
import User from '../../models/user-data/user';
import ApiError from '../../middleware/api-error-handler/apiError';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', validateReg(ajvValidateGoogleUsername), async (req: any, res, next) => {
  try {
    const { googleUsername } = req.body;
    const update = async () => {
      const updateVerify = await User.updateVerified(true, req.user.email);
      if (updateVerify) {
        return res.redirect('/home');
      }
      return next(ApiError.internalError('Error'));
    };

    req.user.username = googleUsername;
    req.user.verified = true;
    req.session.save((err: Error) => {
      if (err) {
        return next(ApiError.internalError('Error'));
      }
      return update();
    });
    return next(ApiError.internalError('Error'));
  } catch (err) {
    return next(ApiError.internalError('Error'));
  }
});

export default router;
