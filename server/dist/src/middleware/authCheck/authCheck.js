"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheckDeleteComments = exports.authCheckMwComments = exports.authCheckMwDeletePost = exports.authCheckMwUnlike = exports.authCheckMwLike = exports.authCheckMwVerify = exports.authCheckMwRegister = exports.authCheckMwProfileInfo = exports.authCheckMwLogin = exports.authCheckMw = exports.authCheck = void 0;
const apiError_1 = __importDefault(require("../api-error-handler/apiError"));
const pool_1 = __importDefault(require("../../pool/pool"));
const redis_1 = __importDefault(require("../../models/redis/redis"));
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheck = authCheck;
const authCheckMw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMw = authCheckMw;
const authCheckMwLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return next();
});
exports.authCheckMwLogin = authCheckMwLogin;
const authCheckMwProfileInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true && req.user.id === req.query.user) ||
            (req.user.authtype === 'google' && req.user.verified === true && req.user.id === req.query.user)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMwProfileInfo = authCheckMwProfileInfo;
const authCheckMwDeletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const { postId } = req.body;
        const idToString = JSON.parse(postId);
        const checkUser = yield redis_1.default.v4.hGet(`post:${idToString}`, 'user_id').catch(() => {
            return res.status(200).json({
                data: {
                    auth: {
                        verified: req.session.guestuser.verified,
                        type: req.session.guestuser.type,
                    },
                    user: {
                        id: req.session.guestuser.guestId,
                        username: null,
                        guest: req.session.guestuser.guest,
                        timezone: req.session.guestuser.tz,
                    },
                },
            });
        });
        if ((req.user.authtype === 'local' && req.user.verified === true && req.user.id === checkUser) ||
            (req.user.authtype === 'google' && req.user.verified === true && req.user.id === checkUser)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMwDeletePost = authCheckMwDeletePost;
const authCheckMwRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return next();
});
exports.authCheckMwRegister = authCheckMwRegister;
const authCheckMwVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMwVerify = authCheckMwVerify;
const authCheckMwLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMwLike = authCheckMwLike;
const authCheckMwUnlike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMwUnlike = authCheckMwUnlike;
const authCheckMwComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMwComments = authCheckMwComments;
const authCheckDeleteComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
            const { commentId } = req.body;
            const checkIfAuthor = yield pool_1.default.query(`SELECT * FROM comments WHERE fk_commenter_id=$1 AND pk_comments_id=$2`, [
                Number(req.user.id),
                commentId,
            ]);
            if (((_a = checkIfAuthor.rows[0]) === null || _a === void 0 ? void 0 : _a.fk_commenter_id) === Number(req.user.id)) {
                return next();
            }
            return next(apiError_1.default.internalError('Error'));
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
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.session.guestuser.verified,
                type: req.session.guestuser.type,
            },
            user: {
                id: req.session.guestuser.guestId,
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckDeleteComments = authCheckDeleteComments;
//# sourceMappingURL=authCheck.js.map