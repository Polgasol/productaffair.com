// import ApiError from '../api-error-handler/apiError';
import logger from '../../logger';

const sslMiddleware = (req: any, res: any, next: any) => {
  req.headers.origin = req.headers.referer;
  logger.info(`Referer origin referer => ${req.headers.referer}`);
  logger.info(`Session origin referer => ${req.headers.origin}`);
  return next();
};

export default sslMiddleware;
