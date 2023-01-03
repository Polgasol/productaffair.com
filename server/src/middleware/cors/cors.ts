import cors from 'cors';
// import logger from '../../logger/index';

const whitelist: Set<string | undefined> = new Set([
  'http://localhost:3000', // nextjs port
  'https://www.productaffair.com',
  'https://www.amazon.com',
]);

const corsOptions: cors.CorsOptions = {
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (whitelist.has(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('May error'), false);
    }
  },
  credentials: true,
};

const corsMw = cors(corsOptions);

export default corsMw;
