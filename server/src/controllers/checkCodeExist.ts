// import ApiError from './verifyCode';
// import logger from '../logger/index';

// check if code exist
// resend route
// /resend route, then refresh
const checkCodeIfExist = (req: any, res: any, next: any) => {
  // req.user.vcode === '' newly created
  // next() if req.user.vcode is expired
  // req.user.vcode === 'sdfsf' code typeof string if present
  const regex = /[a-z-A-Z0-9]/i;

  if (req.user.vcode === '' || !req.user.vcode) {
    return next();
  }
  if (req.user.vcode.match(regex)) {
    return res.json(200).json({ message: '' });
  }
  res.json({ message: 'Please wait for 120s before requesting again' });
  return next();
};
export default checkCodeIfExist;
