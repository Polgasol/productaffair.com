import { createClient } from 'redis';

const redisClient = createClient({
  // https://stackoverflow.com/questions/70219951/typeerror-err-invalid-arg-type-express-sessionredis-error
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
});

export default redisClient;
