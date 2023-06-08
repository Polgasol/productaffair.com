//  middleware function that returns a function
//  error handling of ajvValidation
//  caveat: if error, middleware will point to the most recent error,
//  caveat: if you run again, it will not show the first error but the second error
import { Request, Response, NextFunction } from 'express';
import ApiError from '../api-error-handler/apiError';
// import logger from '../../logger/index';

const validateReg = (ajvValidate: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validAjv = ajvValidate(req.body); // req.body is the schema to be passed inside the validation
    if (!validAjv) {
      // if ajvInstance.compile(schema) = not true then show the errors
      const { errors } = ajvValidate;
      next(ApiError.badRequest(`${errors}`));
    } else {
      next();
    }
  };
};
export default validateReg;
