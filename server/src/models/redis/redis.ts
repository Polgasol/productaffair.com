import { createClient } from 'redis';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}
const redisClient = createClient({
  // https://stackoverflow.com/questions/70219951/typeerror-err-invalid-arg-type-express-sessionredis-error
  legacyMode: true,
  socket: {
    host: process.env.REDIS_URI,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
});

export default redisClient;
