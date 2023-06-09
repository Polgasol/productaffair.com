import ApiError from '../api-error-handler/apiError';
import db from '../../pool/pool';
import redisClient from '../../models/redis/redis';

const authCheck = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  if (req.user) {
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
    // IF VERIFIED USER
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

const authCheckMwLogin = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  if (req.user) {
    // IF VERIFIED USER
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
      return next();
    }
    if (req.user.authtype === 'local' && req.user.verified === false) {
      return next();
    }

    return next(ApiError.internalError('Error'));
  }

  return next();
};

const authCheckMwProfileInfo = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.

  if (req.user) {
    // IF VERIFIED USER
    if (
      (req.user.authtype === 'local' && req.user.verified === true && req.user.id === req.query.user) ||
      (req.user.authtype === 'google' && req.user.verified === true && req.user.id === req.query.user)
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

const authCheckMwDeletePost = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.

  if (req.user) {
    // IF VERIFIED USER
    const { postId } = req.body;
    const idToString = JSON.parse(postId);
    const checkUser = await redisClient.v4.hGet(`post:${idToString}`, 'user_id').catch(() => {
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
    });
    if (
      (req.user.authtype === 'local' && req.user.verified === true && req.user.id === checkUser) ||
      (req.user.authtype === 'google' && req.user.verified === true && req.user.id === checkUser)
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

const authCheckMwRegister = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  if (req.user) {
    // IF VERIFIED USER
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
      return next();
    }
    if (req.user.authtype === 'local' && req.user.verified === false) {
      return next();
    }
    return next(ApiError.internalError('Error'));
  }
  return next();
};

const authCheckMwVerify = async (req: any, res: any, next: any) => {
  // if youre getting data from sessions, bolean values that are stored can only be read as string.
  // check if req.vcode is 120s before requesting new code

  if (req.user) {
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
      return next();
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

const authCheckMwLike = async (req: any, res: any, next: any) => {
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
const authCheckMwUnlike = async (req: any, res: any, next: any) => {
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

const authCheckMwComments = async (req: any, res: any, next: any) => {
  if (req.user) {
    // IF VERIFIED USER
    // if verified user does not pass this condition then
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
const authCheckDeleteComments = async (req: any, res: any, next: any) => {
  // check if author;
  // req.user.id
  // commentId = fk_
  if (req.user) {
    if (
      (req.user.authtype === 'local' && req.user.verified === true) ||
      (req.user.authtype === 'google' && req.user.verified === true)
    ) {
      const { commentId } = req.body;
      const checkIfAuthor = await db.query(`SELECT * FROM comments WHERE fk_commenter_id=$1 AND pk_comments_id=$2`, [
        Number(req.user.id),
        commentId,
      ]);
      if (checkIfAuthor.rows[0]?.fk_commenter_id === Number(req.user.id)) {
        return next();
      }
      return next(ApiError.internalError('Error'));
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

export {
  authCheck,
  authCheckMw,
  authCheckMwLogin,
  authCheckMwProfileInfo,
  authCheckMwRegister,
  authCheckMwVerify,
  authCheckMwLike,
  authCheckMwUnlike,
  authCheckMwDeletePost,
  authCheckMwComments,
  authCheckDeleteComments,
};
