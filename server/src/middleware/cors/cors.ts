import cors from 'cors';
// import logger from '../../logger/index';

const whitelist: Set<string | undefined> = new Set([
  'https://www.productaffair.com',
  'https://productaffair.com',
  'https://api.productaffair.com',
  'https://www.amazon.com',
  'https://productaffair.com.s3-website-ap-southeast-1.amazonaws.com',
  'https://productaffair.com.s3-website-ap-southeast-1.amazonaws.com',
  'https://api-productaffair.ap-southeast-1.elasticbeanstalk.com',
  'https://d33zk1njby9h2r.cloudfront.net',
  'http://localhost:3000',
]);

const corsOptions: cors.CorsOptions = {
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (whitelist.has(origin)) {
      callback(null, true);
    } else if (!origin || origin === undefined) {
      callback(new Error('Undefined origin not allowed.'), false);
    } else {
      callback(new Error('May error.'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
    'x-client-key',
    'x-client-token',
    'x-client-secret',
    'Authorization',
  ],
};

const corsMw = cors(corsOptions);

export default corsMw;
