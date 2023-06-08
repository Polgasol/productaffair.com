import ApiError from '../api-error-handler/apiError';

const authCheck = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  if (req.user.id) {
    if (
      (req.user.authtype === 'local' && req.user.verified === true) ||
      (req.user.authtype === 'google' && req.user.verified === true)
    ) {
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
    return next(ApiError.internalError('Error'));
  }
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
  if (req.user) {
    if (
      (req.user.authtype === 'local' && req.user.verified === true) ||
      (req.user.authtype === 'google' && req.user.verified === true)
    ) {
      return next();
    }
    if (req.user.authtype === 'google' && req.user.verified === false) {
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
    return next(ApiError.internalError('Error'));
  }
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
