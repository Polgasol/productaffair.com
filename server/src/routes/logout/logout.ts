import express from 'express';
import { authCheckMw } from '../../middleware/authCheck/authCheck';
import ApiError from '../../middleware/api-error-handler/apiError';

// eslint-disable-next-line new-cap
const router = express.Router();

// post request for removing, deleting data from the server;
router.get('/', authCheckMw, (req: any, res: any, next: any) => {
  res.clearCookie('sid');
  return req.session.destroy((err: Error) => {
    if (err) {
      return next(ApiError.internalError('Internal Error'));
    }
    return res.status(200).json({ data: 'Logged out' });
  });
});
export default router;
