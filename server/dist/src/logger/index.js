"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const devLogger_1 = __importDefault(require("./devLogger"));
const prodLogger_1 = __importDefault(require("./prodLogger"));
let logger = null;
if (process.env.NODE_ENV === 'development') {
    logger = (0, devLogger_1.default)();
}
else {
    logger = (0, prodLogger_1.default)();
}
exports.default = logger;
//# sourceMappingURL=index.js.map