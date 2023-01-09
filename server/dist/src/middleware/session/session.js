"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const nanoid_1 = require("nanoid");
const redis_1 = __importDefault(require("../../models/redis/redis"));
const Reddistore = require('connect-redis')(express_session_1.default);
const sessions = (0, express_session_1.default)({
    secret: `${process.env.SESSION_SECRET}`,
    name: 'sid',
    genid: () => {
        return (0, nanoid_1.nanoid)(36);
    },
    cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    },
    resave: true,
    saveUninitialized: true,
    store: new Reddistore({ client: redis_1.default, ttl: 86400 }),
});
exports.default = sessions;
//# sourceMappingURL=session.js.map