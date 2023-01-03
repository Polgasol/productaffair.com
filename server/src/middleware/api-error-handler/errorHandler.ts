import { Response, ErrorRequestHandler, NextFunction } from 'express';
import multer from 'multer';
import ApiError from './apiError';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: ErrorRequestHandler, req: any, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    // if the user is in the middle of registering then suddenly, the server encountered a problem
    // delete the created session verification code
    return res.status(err.code).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
  if (err instanceof multer.MulterError) {
    return res.status(500).json({
      error: {
        code: 500,
        message: 'Internal Error',
      },
    });
  }
  return res.status(500).json({
    error: {
      code: 500,
      message: 'Internal Error',
    },
  });
};

export default errorHandler;
