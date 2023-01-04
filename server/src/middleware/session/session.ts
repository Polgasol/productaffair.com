import session from 'express-session';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import redisClient from '../../models/redis/redis';

dotenv.config();
const Reddistore = require('connect-redis')(session);

const sessions = session({
  secret: `${process.env.SESSION_SECRET}`, // specify what is the default type of the object
  name: 'sid',
  genid: () => {
    return nanoid(36); // use UUIDs for session IDs to be stored in the cookie. this id is associated with data in store
  },
  cookie: {
    maxAge: 86400000, // 24 hr = 86,400,000 ms
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    // secure: true, allowed only if https na yung website
    // sameSite: true,  blocks CORS requests on cookies. This will affect the workflow on API calls and mobile applications.
  },
  resave: true, // forces session to force back again to resave in session store
  saveUninitialized: true, // what sessions do if nothing changed
  store: new Reddistore({ client: redisClient, ttl: 86400 }), // 24 hr ttl is in seconds
});

export default sessions;
