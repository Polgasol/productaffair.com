"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../api-error-handler/apiError"));
const validateReg = (ajvValidate) => {
    return (req, res, next) => {
        const validAjv = ajvValidate(req.body);
        if (!validAjv) {
            const { errors } = ajvValidate;
            next(apiError_1.default.badRequest(`${errors}`));
        }
        else {
            next();
        }
    };
};
exports.default = validateReg;
//# sourceMappingURL=validateRegDto.js.map