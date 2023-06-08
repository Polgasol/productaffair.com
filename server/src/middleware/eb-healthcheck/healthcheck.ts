// import ApiError from '../api-error-handler/apiError';

const healthCheckMiddleware = (req: any, res: any, next: any) => {
  // Check if the request path matches the Elastic Beanstalk health check endpoint
  if (req.path === '/health') {
    // If it does, send a 200 OK response to confirm the instance is healthy
    return res.status(200).send('Instance is healthy');
  }
  // If it doesn't, move on to the next middleware
  return next();
};

export default healthCheckMiddleware;
