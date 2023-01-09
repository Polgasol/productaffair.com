/* eslint-disable import/first */
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import timezone from 'dayjs/plugin/timezone';
import cookieParser from 'cookie-parser';
import { SchemaFieldTypes } from 'redis';
import isOnline from 'is-online'; // using version 9.0.0 coz ver10 has compatibvility issue
import db from './src/pool/pool';
import router from './src/routes/index';
import errorHandler from './src/middleware/api-error-handler/errorHandler';
import sessions from './src/middleware/session/session';
import redisClient from './src/models/redis/redis';
import corsMw from './src/middleware/cors/cors';
import logger from './src/logger';
import config from './src/config/config';

import ApiError from './src/middleware/api-error-handler/apiError';
// import helmet from 'helmet';
// import compression from 'compression';
require('./src/config/passport-google');
require('./src/config/passport-local-login');
require('./src/config/passport-local-register');

const PORT = config.server.port;

const server = express();

try {
  // function ignoreFavicon(req: any, res: any, next: any) {
  //   if (req.originalUrl.includes("favicon.ico")) {
  //     console.log('FAVI.ICON')
  //     res.status(204).end();
  //   }
  //   next();
  // }
  (async () => {
    redisClient.on('connect', () => logger.info('Redis is connected'));
    redisClient.on('ready', () => logger.info('Redis is now ready'));
    redisClient.on('error', (err) => {
      if (err) process.exit(5);
    });
    await redisClient.connect();
  })();
  (async () => {
    // https://stackoverflow.com/questions/67352856/postgres-database-connection-not-working-in-node-js
    // https://stackoverflow.com/questions/55405360/how-to-use-postgres-pooling-on-nodejs-express-server
    db.connect((err, client, done) => {
      if (err) process.exit(5);
      logger.info('Postgres Connected');
      done();
    });
  })();
  server.options('*', corsMw);
  server.use(corsMw);
  server.set('trust proxy', true);
  server.use(cookieParser());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(async (req, res, next) => {
    try {
      const connected = await isOnline();
      if (!connected) {
        return next(ApiError.internalError('Network Error'));
      }
      return next();
    } catch (err) {
      return next(ApiError.internalError('Network Error'));
    }
  });
  server.use(async (req, res, next) => {
    try {
      // check key if redis is empty, set NO expiration to this hash..
      // only use this for emergency cases if redis backup do not work.
      const identifierIfRedisIsNotEmptyKey = await redisClient.v4.hGet('doNotDeleteSpecialKey', 'id').catch(() => {
        return next(ApiError.internalError('Error'));
      });
      // this is an infinite key, only be removed when redis suddenly delete the data
      if (!identifierIfRedisIsNotEmptyKey) {
        const setKey = await redisClient.v4.hSet('doNotDeleteSpecialKey', 'id', '01-DO-NOT-DELETE-THIS-IDENTIFIER-KEY');
        const getDbPostsData = await db.query(`SELECT * FROM posts`).catch(() => {
          return next(ApiError.internalError('Error'));
        }); // needs improvement replace SELECT * FROM posts
        const getDbUsersData = await db.query(`SELECT * FROM users`).catch(() => {
          return next(ApiError.internalError('Error'));
        });
        const getDbImagesData = await db.query(`SELECT * FROM images`).catch(() => {
          return next(ApiError.internalError('Error'));
        });

        const copyDataToRedis = (data: any) => {
          return {
            copyPosts: async () => {
              for (let i = 0; i < data.rows.length; i += 1) {
                await redisClient.v4
                  .hSet(`post:${JSON.stringify(data.rows[i].pk_post_id)}`, {
                    id: JSON.stringify(data.rows[i].pk_post_id),
                    user_id: JSON.stringify(data.rows[i].fk_users_id),
                    author: JSON.stringify(data.rows[i].author),
                    title: JSON.stringify(data.rows[i].title),
                    store_name: JSON.stringify(data.rows[i].store_name),
                    overall_rating: JSON.stringify(data.rows[i].overall_product_rating),
                    quality: JSON.stringify(data.rows[i].quality),
                    price: JSON.stringify(data.rows[i].price),
                    customer_service: JSON.stringify(data.rows[i].customer_service),
                    likes_count: JSON.stringify(data.rows[i].likes_count),
                    views_count: JSON.stringify(data.rows[i].views_count),
                    category: JSON.stringify(data.rows[i].category),
                    comments_count: JSON.stringify(data.rows[i].comments_count),
                    date_created: JSON.stringify(data.rows[i].date_created),
                  })
                  .catch(() => {
                    return next(ApiError.internalError('Error'));
                  });
              }
            },
            copyUsers: async () => {
              for (let i = 0; i < data.rows.length; i += 1) {
                await redisClient.v4
                  .hSet(`user:${JSON.stringify(data.rows[i].pk_users_id)}`, {
                    id: JSON.stringify(data.rows[i].pk_users_id),
                    username: JSON.stringify(data.rows[i].username),
                    profile_img_src: JSON.stringify(data.rows[i].profile_img_url),
                    about: JSON.stringify(data.rows[i].about),
                    total_likes: JSON.stringify(data.rows[i].total_likes),
                    total_views: JSON.stringify(data.rows[i].total_views),
                    post_count: JSON.stringify(data.rows[i].post_count),
                    total_followers: JSON.stringify(data.rows[i].followers_count),
                    total_following: JSON.stringify(data.rows[i].following_count),
                    data_created: JSON.stringify(data.rows[i].date_created),
                  })
                  .catch(() => {
                    return next(ApiError.internalError('Error'));
                  });
              }
            },
            copyImages: async () => {
              for (let i = 0; i < data.rows.length; i += 1) {
                await redisClient.v4
                  .hSet(
                    `images:${JSON.stringify(data.rows[i].fk_post_id)}`,
                    JSON.stringify(data.rows[i].image_url),
                    JSON.stringify(data.rows[i].image_url),
                  )
                  .catch(() => {
                    return next(ApiError.internalError('Error'));
                  });
              }
            },
          };
        };
        if (setKey && getDbPostsData && getDbUsersData && getDbImagesData) {
          const onSuccess = await Promise.all([
            await copyDataToRedis(getDbPostsData).copyPosts(),
            await copyDataToRedis(getDbUsersData).copyUsers(),
            await copyDataToRedis(getDbImagesData).copyImages(),
          ]);
          if (onSuccess) {
            return next();
          }
          return next(ApiError.internalError('Error'));
        }
        return next(ApiError.internalError('Error'));
      }
      return next();
    } catch (err) {
      return next(ApiError.internalError('Error'));
    }
  }); // setup cache data
  server.use(async (req, res, next) => {
    const checkIfPostsIndexExist: any = await redisClient.ft._list().catch(() => {
      return next(ApiError.internalError('Error'));
    });

    const findPostIndex = checkIfPostsIndexExist.find((element: any) => element === 'posts:index');

    if (!findPostIndex) {
      await redisClient.ft
        .create(
          'posts:index',
          {
            id: {
              type: SchemaFieldTypes.TEXT,
            },
            user_id: {
              type: SchemaFieldTypes.TEXT,
            },
            author: {
              type: SchemaFieldTypes.TEXT,
            },
            title: {
              type: SchemaFieldTypes.TEXT,
            },
            store_name: {
              type: SchemaFieldTypes.TEXT,
            },
            overall_rating: {
              type: SchemaFieldTypes.TEXT,
            },
            quality: {
              type: SchemaFieldTypes.TEXT,
            },
            price: {
              type: SchemaFieldTypes.TEXT,
            },
            customer_service: {
              type: SchemaFieldTypes.TEXT,
            },
            likes_count: {
              type: SchemaFieldTypes.TEXT,
            },
            views_count: {
              type: SchemaFieldTypes.TEXT,
            },
            category: {
              type: SchemaFieldTypes.TEXT,
            },
            comments_count: {
              type: SchemaFieldTypes.TEXT,
            },
            date_created: {
              type: SchemaFieldTypes.TEXT,
            },
          },
          {
            ON: 'HASH',
            PREFIX: 'post:',
          },
        )
        .catch(() => {
          return next(ApiError.internalError('Error'));
        });
      return next();
    }
    return next();
  });
  server.use(async (req, res, next) => {
    const checkIfUsersIndexExist: any = await redisClient.ft._list().catch(() => {
      return next(ApiError.internalError('Error'));
    });
    const findUserIndex = checkIfUsersIndexExist.find((element: any) => element === 'users:index');

    if (!findUserIndex) {
      await redisClient.ft
        .create(
          'users:index',
          {
            id: {
              type: SchemaFieldTypes.TEXT,
            },
            username: {
              type: SchemaFieldTypes.TEXT,
            },
            profile_img_src: {
              type: SchemaFieldTypes.TEXT,
            },
            about: {
              type: SchemaFieldTypes.TEXT,
            },
            total_likes: {
              type: SchemaFieldTypes.TEXT,
            },
            total_views: {
              type: SchemaFieldTypes.TEXT,
            },
            post_count: {
              type: SchemaFieldTypes.TEXT,
            },
            total_followers: {
              type: SchemaFieldTypes.TEXT,
            },
            total_following: {
              type: SchemaFieldTypes.TEXT,
            },
            date_created: {
              type: SchemaFieldTypes.TEXT,
            },
          },
          {
            ON: 'HASH',
            PREFIX: 'user:', // lahat ng may hash prefix na post: ay pagkukunan ng data
          },
        )
        .catch(() => {
          return next(ApiError.internalError('Error'));
        });
      return next();
    }
    return next();
  });
  server.use(sessions);
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(async (req: any, res, next) => {
    if (req.user) {
      if (req.session.guestuser) {
        delete req.session.guestuser;
        return req.session.save((err: Error) => {
          if (err) return next(ApiError.internalError('Error'));
          return next();
        });
      }
      return next();
    }
    if (req.session.guestuser) {
      return next();
    }
    dayjs.extend(timezone); // get guest's timezone
    const tz = dayjs.tz.guess();
    const createGuestId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 100);
    // if wala pang guest session, then create, delete user thats not verified
    req.session.guestuser = {
      guestId: createGuestId(),
      guest: true,
      tz,
      verified: false,
      type: 'guest',
    };
    return req.session.save((err: Error) => {
      if (err) {
        return next(ApiError.internalError('Error'));
      }
      return next();
    });
  });
  server.use('/api', router);
  server.get('*', (req, res, next) => {
    next(ApiError.notFound('Not Found'));
  });
  server.use(errorHandler); // if all routes do not catch the particular error, this will execute.
  server.listen(PORT);
} catch (err) {
  process.exit(5);
}
