import { Response, NextFunction } from 'express';
import { customAlphabet } from 'nanoid';
import logger from '../logger/index';
import ApiError from '../middleware/api-error-handler/apiError';
import sendEmail from '../config/nodemailer';

const createCode = async (req: any, res: Response, next: NextFunction) => {
  try {
    const verificationCode = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
    const code = verificationCode();
    const sendVerification = () => sendEmail(req.user.firstname, req.user.email, code);
    const codeTtl = () => {
      setTimeout(() => {
        delete req.user.vcode;
        return req.session.save((error: Error) => {
          if (error) {
            logger.info('Vcode is now expires');
            return next(ApiError.internalError('Session error'));
          }
          return logger.info('Session expired');
        });
      }, 360000); // 60s
    };

    req.user.vcode = code;
    req.session.save((err: any) => {
      logger.info('Now saving the verified code to session');
      if (err) {
        logger.info(err);
        logger.info(req.user.vcode);
        return next(ApiError.internalError('Error Code'));
      }
      logger.info('Verification Code sent to users email');
      logger.info(`Check if req authtype is mounted: ${req.user.authtype}`);
      logger.info(req.user.vcode);
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
    logger.info('Verification code is now deleted');
    return next();
  });
};

export { createCode, deleteCode };
