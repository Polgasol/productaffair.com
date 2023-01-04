"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const whitelist = new Set([
    'http://localhost:3000',
    'https://www.productaffair.com',
    'https://www.amazon.com',
]);
const corsOptions = {
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
        if (whitelist.has(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('May error'), false);
        }
    },
    credentials: true,
};
const corsMw = (0, cors_1.default)(corsOptions);
exports.default = corsMw;
//# sourceMappingURL=cors.js.map