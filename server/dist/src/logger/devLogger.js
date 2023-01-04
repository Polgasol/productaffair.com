"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { timestamp, combine, printf, errors } = winston_1.format;
const buildDevLogger = () => {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });
    return (0, winston_1.createLogger)({
        level: 'debug',
        format: combine(winston_1.format.colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
        transports: [new winston_1.transports.Console()],
    });
};
exports.default = buildDevLogger;
//# sourceMappingURL=devLogger.js.map