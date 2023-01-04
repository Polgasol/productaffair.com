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
exports.authCheckMw = exports.authCheck = void 0;
const apiError_1 = __importDefault(require("../api-error-handler/apiError"));
const authCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dito na sa AuthCheck before if statements');
    if (req.user.id) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
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
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheck = authCheck;
const authCheckMw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Dito na sa AuthCheck before if statements');
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
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
        return next(apiError_1.default.internalError('Error'));
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
                username: null,
                guest: req.session.guestuser.guest,
                timezone: req.session.guestuser.tz,
            },
        },
    });
});
exports.authCheckMw = authCheckMw;
//# sourceMappingURL=authCheckWithIdentity.js.map