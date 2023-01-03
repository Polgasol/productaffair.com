import bcrypt from 'bcrypt';
import passport from 'passport';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import User from '../models/user-data/user';
// import logger from '../logger';

const LocalStrategy = require('passport-local').Strategy;

const authenticateUser = async (req: any, username: string, password: string, done: any) => {
  try {
    // ----------------------------------- MODELS ------------------------------------------->
    dayjs.extend(utc);
    dayjs.extend(timezone); // get guest's timezone
    const tz = dayjs.tz.guess();
    const getUserId = await User.getIdByUsername(username).catch(() => done(null, false, { message: 'Server Error' }));
    const getUserPassword = await User.getPasswordByUsername(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const getUsernameByUsername = await User.getUsernameByUsername(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const getEmailByUsername = await User.getEmailByUsername(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const isVerifiedByUsername = await User.userUsernameVerified(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );

    const getEmailId = await User.getIdByEmail(username).catch(() => done(null, false, { message: 'Server Error' }));
    const getEmailPassword = await User.getPasswordByEmail(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const getUsernameByEmail = await User.getUsernameByEmail(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const getEmailByEmail = await User.getEmailByEmail(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );
    const isVerifiedByEmail = await User.userEmailVerified(username).catch(() =>
      done(null, false, { message: 'Server Error' }),
    );

    const passwordAuth = async (userPass: any, loginType: string) => {
      const compare = await bcrypt.compare(password, userPass);
      if (compare) {
        if (loginType === 'byUsername') {
          return done(null, {
            id: getUserId.rows[0].pk_users_id.toString(),
            username: getUsernameByUsername.rows[0].username.toString(),
            email: getEmailByUsername.rows[0].email.toString(),
            verified: true,
            authtype: 'local',
            guest: false,
            tz,
          });
        }
        if (loginType === 'byEmail') {
          return done(null, {
            id: getEmailId.rows[0].pk_users_id.toString(),
            username: getUsernameByEmail.rows[0].username.toString(),
            email: getEmailByEmail.rows[0].email.toString(),
            verified: true,
            authtype: 'local',
            guest: false,
            tz, // get timezone from postgres.
          });
        }
        return done(null, false, { message: 'Server Error' });
      }
      return done(null, false, {
        message: 'Invalid username/email or password',
      });
    };
    // ------------------------END OF MODELS ----------------------------------------------->
    // ----------------------- START OF IF-STATEMENTS -------------------------------------->
    // if walang tumutugma sa login it means wala pa silang account or unverified pa.

    if (!getUsernameByUsername || !getEmailByEmail) {
      return done(null, false, { message: 'Invalid username or password' });
    }
    if (isVerifiedByUsername.rows[0]) {
      if (isVerifiedByUsername.rows[0].verified === true) {
        return passwordAuth(getUserPassword.rows[0].password.toString(), 'byUsername');
      }
      return done(null, false, { message: 'Invalid username or password' });
    }
    if (isVerifiedByEmail.rows[0]) {
      if (isVerifiedByEmail.rows[0].verified === true) {
        return passwordAuth(getEmailPassword.rows[0].email.toString(), 'byEmail');
      }
      return done(null, false, { message: 'Invalid username or password' });
    }
    if (isVerifiedByUsername.rows[0]) {
      if (isVerifiedByUsername.rows[0].verified === false) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, false, { message: 'Invalid username or password' });
    }
    if (isVerifiedByEmail.rows[0]) {
      if (isVerifiedByEmail.rows[0].verified === false) {
        return done(null, false, { message: 'Invalid username or password' });
      }
      return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, false, { message: 'Invalid username or password' });
  } catch (err) {
    return done(err);
  }
  // ---------------------- END OF IF-STATEMENTS ------------------------------------------->
};

passport.use('local-login', new LocalStrategy({ passReqToCallback: true }, authenticateUser));
// passport.serializeUser((user: any, done: any) => {
//   done(null, user); // iseset mo yung result sa object na id
//   logger.info('naset na');
// });
// passport.deserializeUser(async (id: any, done: any) => {
//   done(null, id); // req.session.id is the name of the session req.user can now be acccessed
//   logger.info('naset nanaman');
// });
