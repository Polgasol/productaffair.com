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
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const user_1 = __importDefault(require("../models/user-data/user"));
const auth_1 = __importDefault(require("../models/auth/auth"));
const redis_1 = __importDefault(require("../models/redis/redis"));
const LocalStrategy = require('passport-local').Strategy;
const authenticateUser = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, age, email, confirmPassword } = req.body;
        dayjs_1.default.extend(utc_1.default);
        dayjs_1.default.extend(timezone_1.default);
        const tz = dayjs_1.default.tz.guess();
        const authtype = 'local';
        const verified = false;
        const about = '';
        const profImg = '';
        const salt = yield bcrypt_1.default.genSalt(12).catch(() => done(null, false, { message: 'Server Error' }));
        const isUserVerified = yield user_1.default.userEmailVerified(email).catch(() => done(null, false, { message: 'Server Error' }));
        const getUsername = yield user_1.default.getUsernameByEmail(email).catch(() => done(null, false, { message: 'Server Error' }));
        const getEmail = yield user_1.default.getEmailByUsername(username).catch(() => done(null, false, { message: 'Server Error' }));
        const localRegister = () => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPass = yield bcrypt_1.default
                .hash(confirmPassword, salt)
                .catch(() => done(null, false, { message: 'Server Error' }));
            if (hashedPass) {
                const [newRegister, failNewRegister] = yield auth_1.default.registerLocal(username, firstname, lastname, age, hashedPass, email, authtype, verified, about, profImg).catch(() => done(null, false, { message: 'Server Error' }));
                if (newRegister) {
                    const getUserId = yield user_1.default.getIdByEmail(email).catch(() => done(null, false, { message: 'Server Error' }));
                    const getDateCreated = yield user_1.default.getDateById(getUserId.rows[0].pk_users_id).catch(() => done(null, false, { message: 'Server Error' }));
                    const newRegisterRedis = yield redis_1.default.v4
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
        });
        const updateRegisteredUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPass = yield bcrypt_1.default
                .hash(confirmPassword, salt)
                .catch(() => done(null, false, { message: 'Server Error' }));
            if (hashedPass) {
                const [updateRegister, failUpdateRegister] = yield user_1.default.updateUnverifiedUser(username, firstname, lastname, age, hashedPass, email, authtype, verified, about, profImg).catch(() => done(null, false, { message: 'Server Error' }));
                if (updateRegister) {
                    const getUserId = yield user_1.default.getIdByEmail(email).catch(() => done(null, false, { message: 'Server Error' }));
                    const getDateCreated = yield user_1.default.getDateById(getUserId.rows[0].pk_users_id).catch(() => done(null, false, { message: 'Server Error' }));
                    const updateRegisterRedis = yield redis_1.default.v4
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
        });
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
                console.log(`Already Exist: ${isUserVerified.rows[0].verified}`);
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
        return done(null, false, { message: 'Something went wrong' });
    }
    catch (err) {
        return done(err);
    }
});
passport_1.default.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'createPassword',
    passReqToCallback: true,
}, authenticateUser));
//# sourceMappingURL=passport-local-register.js.map