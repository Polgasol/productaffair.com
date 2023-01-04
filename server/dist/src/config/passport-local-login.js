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
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const user_1 = __importDefault(require("../models/user-data/user"));
const LocalStrategy = require('passport-local').Strategy;
const authenticateUser = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dayjs_1.default.extend(utc_1.default);
        dayjs_1.default.extend(timezone_1.default);
        const tz = dayjs_1.default.tz.guess();
        const getUserId = yield user_1.default.getIdByUsername(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getUserPassword = yield user_1.default.getPasswordByUsername(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getUsernameByUsername = yield user_1.default.getUsernameByUsername(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getEmailByUsername = yield user_1.default.getEmailByUsername(username).catch(() => done(null, false, { message: 'Server Error' }));
        const isVerifiedByUsername = yield user_1.default.userUsernameVerified(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getEmailId = yield user_1.default.getIdByEmail(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getEmailPassword = yield user_1.default.getPasswordByEmail(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getUsernameByEmail = yield user_1.default.getUsernameByEmail(username).catch(() => done(null, false, { message: 'Server Error' }));
        const getEmailByEmail = yield user_1.default.getEmailByEmail(username).catch(() => done(null, false, { message: 'Server Error' }));
        const isVerifiedByEmail = yield user_1.default.userEmailVerified(username).catch(() => done(null, false, { message: 'Server Error' }));
        const passwordAuth = (userPass, loginType) => __awaiter(void 0, void 0, void 0, function* () {
            const compare = yield bcrypt_1.default.compare(password, userPass);
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
                        tz,
                    });
                }
                return done(null, false, { message: 'Server Error' });
            }
            return done(null, false, {
                message: 'Invalid username/email or password',
            });
        });
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
    }
    catch (err) {
        return done(err);
    }
});
passport_1.default.use('local-login', new LocalStrategy({ passReqToCallback: true }, authenticateUser));
//# sourceMappingURL=passport-local-login.js.map