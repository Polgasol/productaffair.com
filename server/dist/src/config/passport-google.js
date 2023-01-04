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
const passport_1 = __importDefault(require("passport"));
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const user_1 = __importDefault(require("../models/user-data/user"));
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dayjs_1.default.extend(utc_1.default);
        dayjs_1.default.extend(timezone_1.default);
        const tz = dayjs_1.default.tz.guess();
        const getGoogleId = yield user_1.default.googleId(profile.id);
        const getGoogleUsername = yield user_1.default.googleUsername(profile.id);
        const getGoogleVerified = yield user_1.default.googleVerified(profile.id);
        const registerNewGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
            const newGoogle = yield user_1.default.createNewGoogleUser(profile.name.givenName, profile.name.familyName, profile.id, profile.provider, profile.email);
            return newGoogle;
        });
        if (getGoogleId && getGoogleVerified.rows[0].verified === true) {
            return done(null, {
                id: profile.id,
                username: getGoogleUsername.rows[0].username,
                email: profile.email,
                verified: true,
                authtype: profile.provider,
                guest: false,
                tz,
            });
        }
        if (getGoogleId && getGoogleVerified.rows[0].verified === false) {
            return done(null, {
                id: profile.id,
                email: profile.email,
                verified: false,
                authType: profile.provider,
                guest: false,
                tz,
            });
        }
        if (!getGoogleId) {
            if ((yield registerNewGoogle()).rows.length) {
                return done(null, {
                    id: profile.id,
                    email: profile.email,
                    verified: false,
                    authType: profile.provider,
                    guest: false,
                    tz,
                });
            }
            return done(null, false, { message: 'Google Auth Error' });
        }
        return done(null, false, { message: 'Server Error' });
    }
    catch (err) {
        console.log('May Error sa google-sign in');
        done(err);
    }
})));
passport_1.default.serializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    done(null, user);
}));
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    done(null, id);
}));
//# sourceMappingURL=passport-google.js.map