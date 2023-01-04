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
            console.log('AJV ERROR');
            console.log(errors);
            next(apiError_1.default.badRequest(`Invalid`));
        }
        else {
            next();
        }
    };
};
exports.default = validateReg;
//# sourceMappingURL=validateRegDto.js.map