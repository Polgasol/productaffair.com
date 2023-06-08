"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
const sslMiddleware = (req, res, next) => {
    req.headers.origin = req.headers.referer;
    logger_1.default.info(`Referer origin referer => ${req.headers.referer}`);
    logger_1.default.info(`Session origin referer => ${req.headers.origin}`);
    return next();
};
exports.default = sslMiddleware;
//# sourceMappingURL=ssl.js.map