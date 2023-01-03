import ApiError from '../api-error-handler/apiError';

const authCheck = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  console.log('Dito na sa AuthCheck before if statements');
  if (req.user.id) {
    if (
      (req.user.authtype === 'local' && req.user.verified === true) ||
      (req.user.authtype === 'google' && req.user.verified === true)
    ) {
      console.log('Auth is local or google and verified is true');
      return res.status(200).json({
        data: {
          auth: {
            verified: req.user.verified,
            type: req.user.authtype,
          },
          user: {
            id: req.user.id,
            username: req.user.username,
            guest: req.user.guest,
            timezone: req.user.tz,
          },
        },
      });
    }
    if (req.user.authtype === 'google' && req.user.verified === false) {
      console.log('Google auth but not verified');
      return res.status(200).json({
        data: {
          auth: {
            verified: req.user.verified,
            type: req.user.authtype,
          },
          user: {
            id: req.user.id,
            username: null,
            guest: req.user.guest,
            timezone: req.user.tz,
          },
        },
      });
    }
    if (req.user.authtype === 'local' && req.user.verified === false) {
      console.log('Local auth but not verified');

      return res.status(200).json({
        data: {
          auth: {
            verified: req.user.verified,
            type: req.user.authtype,
          },
          user: {
            id: req.user.id,
            username: req.user.username,
            guest: req.user.guest,
            timezone: req.user.tz,
          },
        },
      });
    }
    console.log('Session is present but error occurs');
    return next(ApiError.internalError('Error'));
  }
  console.log('No session has been created, guest user is only abailable');
  return res.status(200).json({
    data: {
      auth: {
        verified: req.session.guestuser.verified,
        type: req.session.guestuser.type,
      },
      user: {
        id: req.session.guestuser.guestId,
        username: null, // always null
        guest: req.session.guestuser.guest, // always true
        timezone: req.session.guestuser.tz,
      },
    },
  });
};

const authCheckMw = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  console.log('Dito na sa AuthCheck before if statements');
  if (req.user) {
    if (
      (req.user.authtype === 'local' && req.user.verified === true) ||
      (req.user.authtype === 'google' && req.user.verified === true)
    ) {
      console.log('Auth is local or google and verified is true');
      return next();
    }
    if (req.user.authtype === 'google' && req.user.verified === false) {
      console.log('Google auth but not verified');
      return res.status(200).json({
        data: {
          auth: {
            verified: req.user.verified,
            type: req.user.authtype,
          },
          user: {
            id: req.user.id,
            username: null,
            guest: req.user.guest,
            timezone: req.user.tz,
          },
        },
      });
    }
    if (req.user.authtype === 'local' && req.user.verified === false) {
      console.log('Local auth but not verified');

      return res.status(200).json({
        data: {
          auth: {
            verified: req.user.verified,
            type: req.user.authtype,
          },
          user: {
            id: req.user.id,
            username: req.user.username,
            guest: req.user.guest,
            timezone: req.user.tz,
          },
        },
      });
    }
    console.log('Session is present but error occurs');
    return next(ApiError.internalError('Error'));
  }
  console.log('No session has been created, guest user is only abailable');
  return res.status(200).json({
    data: {
      auth: {
        verified: req.session.guestuser.verified,
        type: req.session.guestuser.type,
      },
      user: {
        id: req.session.guestuser.guestId,
        username: null, // always null
        guest: req.session.guestuser.guest, // always true
        timezone: req.session.guestuser.tz,
      },
    },
  });
};

export { authCheck, authCheckMw };
