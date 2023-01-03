import passport from 'passport';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import User from '../models/user-data/user';

const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
      passReqToCallback: true,
    },
    // eslint-disable-next-line consistent-return
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        // ----------------------------------- MODELS ------------------------------------------->
        dayjs.extend(utc);
        dayjs.extend(timezone); // get guest's timezone
        const tz = dayjs.tz.guess();
        const getGoogleId = await User.googleId(profile.id); // .rows[0];
        const getGoogleUsername = await User.googleUsername(profile.id); // .rows[0].username.toString();
        const getGoogleVerified = await User.googleVerified(profile.id); // .rows[0];
        const registerNewGoogle = async () => {
          const newGoogle = await User.createNewGoogleUser(
            // execute this async code when id or username dont exist
            profile.name.givenName,
            profile.name.familyName,
            profile.id,
            profile.provider,
            profile.email,
          );
          return newGoogle;
        };
        // ------------------------END OF MODELS ----------------------------------------------->
        // ----------------------- START OF IF-STATEMENTS -------------------------------------->
        if (getGoogleId && getGoogleVerified.rows[0].verified === true) {
          // proceed login if google account exist
          return done(null, {
            id: profile.id,
            username: getGoogleUsername.rows[0].username,
            email: profile.email,
            verified: true, // verified = true
            authtype: profile.provider,
            guest: false,
            tz,
          });
        }
        if (getGoogleId && getGoogleVerified.rows[0].verified === false) {
          // proceed login if google account exist
          return done(null, {
            id: profile.id,
            email: profile.email, // NO username stored in sessions
            verified: false, // verified = false redirect to /newuser route
            authType: profile.provider,
            guest: false,
            tz,
          });
        }
        // if google account do not exist then create new account
        if (!getGoogleId) {
          if ((await registerNewGoogle()).rows.length) {
            // if user successfully registered with no errors, done
            return done(null, {
              id: profile.id,
              email: profile.email,
              verified: false,
              authType: profile.provider,
              guest: false,
              tz,
            }); // verified false coz new user
          }
          // if it did not register throw done false
          return done(null, false, { message: 'Google Auth Error' });
        }
        return done(null, false, { message: 'Server Error' }); // return done false if it does not match any of the if statements.
        // ---------------------------END IF STATEMENTS ------------------------------------------------------------------------------>
      } catch (err) {
        console.log('May Error sa google-sign in');
        done(err);
      }
    },
  ),
);

passport.serializeUser(async (user, done) => {
  // si google na nagauthenticate so no need to use bcryptjs, isasave na nya yung data sa sessions
  // sinasave neto yung object data from google to sessions to redis.
  // loads into req.session.passport.user
  // serialize user is just storing the new data to redis
  done(null, user); // done(null, user.id)saved to req.session.passport.user
});

passport.deserializeUser(async (id: string, done) => {
  // id = to user done(null, user) dyan galing yung data from cookie.
  // done(null, id) = req.user --- store sa req.user ang id para magamit sa express app
  done(null, id); // select * from users where user_id=id then done(null, user) = req.user
  // create a hash redis, use id as the key and place inside the key the username, user id
  // kapag iaaccess mo na to sa express, magiging req.user.id or req.user.email or req.user.username
  // add later on the req.user.username kapag newly registered.
});
