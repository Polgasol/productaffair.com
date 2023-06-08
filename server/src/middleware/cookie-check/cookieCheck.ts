import ApiError from '../api-error-handler/apiError';

const cookieCheckMiddleware = async (req: any, res: any, next: any) => {
  // Check if the request path matches the Elastic Beanstalk health check endpoint
  if (!req.cookies.sid) {
    return req.session.destroy(async (err: Error) => {
      if (err) {
        return next(ApiError.internalError('Internal Error'));
      }
      return next();
    });
  }
  // If it doesn't, move on to the next middleware
  return next();
};

export default cookieCheckMiddleware;
