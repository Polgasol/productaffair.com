"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const apiError_1 = __importDefault(require("./apiError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof apiError_1.default) {
        return res.status(err.code).json({
            error: {
                code: err.code,
                message: err.message,
            },
        });
    }
    if (err instanceof multer_1.default.MulterError) {
        return res.status(500).json({
            error: {
                code: 500,
                message: 'Internal Error',
            },
        });
    }
    return res.status(500).json({
        error: {
            code: 500,
            message: 'Internal Error',
        },
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map