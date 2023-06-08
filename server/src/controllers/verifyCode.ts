import { Response, NextFunction } from 'express';
import { customAlphabet } from 'nanoid';
// import logger from '../logger/index';
import ApiError from '../middleware/api-error-handler/apiError';
import sendEmail from '../config/nodemailer';

const createCode = async (req: any, res: Response, next: NextFunction) => {
  try {
    const verificationCode = customAlphabet('0123456789', 8);
    const code = verificationCode();
    const sendVerification = () => sendEmail(req.user.firstname, req.user.email, code);
    const codeTtl = () => {
      setTimeout(() => {
        delete req.user.vcode;
        return req.session.save((error: Error) => {
          if (error) {
            return next(ApiError.internalError('Session error'));
          }
          return null;
        });
      }, 360000); // 60s
    };

    req.user.vcode = code;
    console.log(`CODE => ${req.user.vcode}`);
    return req.session.save((err: any) => {
      if (err) {
        return next(ApiError.internalError('Error Code'));
      }
      sendVerification();
      codeTtl();
      // local registration lang pwede pumunta sa registration.
      return res.status(200).json({ data: { verified: false, type: 'local' } }); // send to frontend
    });
  } catch (error) {
    return next(ApiError.internalError('Error Code'));
  }
};

const deleteCode = (req: any, res: Response, next: NextFunction) => {
  delete req.user.vcode;
  return req.session.save((err: Error) => {
    if (err) {
      return next(ApiError.internalError('Internal sessions'));
    }
    return next();
  });
};

export { createCode, deleteCode };
