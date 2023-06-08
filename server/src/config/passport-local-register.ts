/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import passport from 'passport';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import User from '../models/user-data/user';
import logger from '../logger/index';
import Auth from '../models/auth/auth';
import redisClient from '../models/redis/redis';
import { RegisterForm } from '../types/auth';

const LocalStrategy = require('passport-local').Strategy;

const authenticateUser = async (req: any, username: string, password: string, done: any) => {
  try {
    // ----------------------------------- MODELS ------------------------------------------->
    const { firstname, lastname, age, email, confirmPassword }: RegisterForm = req.body;
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const tz = dayjs.tz.guess();
    const authtype = 'local';
    const verified = false;
    const about = '';
    const profImg = '';
    const resendTries = 1;
    const salt = await bcrypt.genSalt(12).catch(() => done(null, false, { message: 'Server Error' }));
    const isUserVerified = await User.userEmailVerified(email).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const getUsername = await User.getUsernameByEmail(email).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const getEmail = await User.getEmailByUsername(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );

    const localRegister = async () => {
      const hashedPass = await bcrypt
        .hash(confirmPassword, salt)
        .catch(() => done(null, false, { message: 'Server Error' }));
      if (hashedPass) {
        const [newRegister, failNewRegister] = await Auth.registerLocal(
          username,
          firstname,
          lastname,
          age,
          hashedPass,
          email,
          authtype,
          verified,
          about,
          profImg,
        ).catch(() => done(null, false, { message: 'Server Error' }));

        if (newRegister) {
          const getUserId = await User.getIdByEmail(email).catch(() => done(null, false, { message: 'Server Error' }));
          const getDateCreated = await User.getDateById(getUserId.rows[0].pk_users_id).catch(() =>
            done(null, false, { message: 'Server Error' }),
          );
          const newRegisterRedis = await redisClient.v4
            .hSet(`user:${getUserId.rows[0].pk_users_id}`, {
              id: `${getUserId.rows[0].pk_users_id}`,
              username: `${username}`,
              profile_img_src: `${''}`,
              about: `${''}`,
              total_likes: `${0}`,
              total_views: `${0}`,
              post_count: `${0}`,
              total_followers: `${0}`,
              total_following: `${0}`,
              verified: `${false}`,
              data_created: `${getDateCreated.rows[0].date_created}`,
            })
            .catch(() => done(null, false, { message: 'Server Error' }));
          if (getUserId && newRegisterRedis) {
            return done(null, {
              id: getUserId.rows[0].pk_users_id.toString(),
              firstname,
              username,
              email,
              vcode: '',
              resendTries,
              guest: false,
              authtype,
              verified,
              tz,
            });
          }
          return done(null, false, { message: 'Error Doning' });
        }
        return done(null, false, { message: 'Error Registeration' });
      }
      return done(null, false, { message: 'Error Hashing' });
    };
    const updateRegisteredUser = async () => {
      const hashedPass = await bcrypt
        .hash(confirmPassword, salt)
        .catch(() => done(null, false, { message: 'Server Error' }));
      if (hashedPass) {
        const [updateRegister, failUpdateRegister] = await User.updateUnverifiedUser(
          username,
          firstname,
          lastname,
          age,
          hashedPass,
          email,
          authtype,
          verified,
          about,
          profImg,
        ).catch(() => done(null, false, { message: 'Server Error' }));
        if (updateRegister) {
          const getUserId = await User.getIdByEmail(email).catch(() => done(null, false, { message: 'Server Error' }));
          const getDateCreated = await User.getDateById(getUserId.rows[0].pk_users_id).catch(() =>
            done(null, false, { message: 'Server Error' }),
          );
          const updateRegisterRedis = await redisClient.v4
            .hSet(`user:${getUserId.rows[0].pk_users_id}`, {
              id: `${getUserId.rows[0].pk_users_id}`,
              username: `${username}`,
              profile_img_src: `${''}`,
              about: `${''}`,
              total_likes: `${0}`,
              total_views: `${0}`,
              post_count: `${0}`,
              total_followers: `${0}`,
              total_following: `${0}`,
              verified: `${false}`,
              data_created: `${getDateCreated.rows[0].date_created}`,
            })
            .catch(() => done(null, false, { message: 'Server Error' }));

          if (getUserId.rowCount === 1 && updateRegisterRedis === 0) {
            return done(null, {
              id: getUserId.rows[0].pk_users_id.toString(),
              firstname,
              username,
              email,
              vcode: '',
              resendTries,
              guest: false,
              verified,
              authtype,
              tz,
            });
          }
        }
        return done(null, false, { message: 'Something went wrong' });
      }
      return done(null, false, { message: 'Something went wrong' });
    };
    // ------------------------END OF MODELS ----------------------------------------------->
    // ----------------------- START OF IF-STATEMENTS -------------------------------------->

    if (!getEmail.rows[0] && !getUsername.rows[0]) {
      if (password === confirmPassword) {
        return localRegister();
      }
      return done(null, false, { message: 'Invalid Password' });
    }
    if (getEmail.rows[0] && !getUsername.rows[0]) {
      return done(null, false, { message: 'Email already exist' });
    }
    if (!getEmail.rows[0] && getUsername.rows[0]) {
      return done(null, false, { message: 'Username already exist' });
    }

    if (isUserVerified.rows[0]) {
      if (isUserVerified.rows[0].verified === true) {
        if (getUsername.rows[0]) {
          return done(null, false, { message: 'Username already exist' });
        }
        if (getEmail.rows[0]) {
          return done(null, false, { message: 'Email already exist' });
        }
        return done(null, false, { message: 'Something went wrong' });
      }
      if (isUserVerified.rows[0].verified === false) {
        if (password === confirmPassword) {
          return updateRegisteredUser();
        }
        return done(null, false, { message: 'Invalid Password' });
      }
      return done(null, false, { message: 'Something went wrong' });
    }
    // ---------------------------END IF STATEMENTS ------------------------------------------------------------------------------>
    return done(null, false, { message: 'Something went wrong' }); // return done false if it does not match any of the if statements.
  } catch (err) {
    return done(err);
  }
};

passport.use(
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'createPassword',
      passReqToCallback: true,
    },
    authenticateUser,
  ),
);
passport.serializeUser((user: any, done: any) => {
  process.nextTick(() => {
    done(null, user);
  }); // iseset mo yung result sa object na id
});
passport.deserializeUser(async (user: any, done: any) => {
  process.nextTick(() => {
    done(null, user);
  }); // req.session.id is the name of the session req.user can now be acccessed
});
