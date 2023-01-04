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
exports.deleteCode = exports.createCode = void 0;
const nanoid_1 = require("nanoid");
const index_1 = __importDefault(require("../logger/index"));
const apiError_1 = __importDefault(require("../middleware/api-error-handler/apiError"));
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const createCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verificationCode = (0, nanoid_1.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
        const code = verificationCode();
        const sendVerification = () => (0, nodemailer_1.default)(req.user.firstname, req.user.email, code);
        const codeTtl = () => {
            setTimeout(() => {
                delete req.user.vcode;
                return req.session.save((error) => {
                    if (error) {
                        index_1.default.info('Vcode is now expires');
                        return next(apiError_1.default.internalError('Session error'));
                    }
                    return index_1.default.info('Session expired');
                });
            }, 360000);
        };
        req.user.vcode = code;
        req.session.save((err) => {
            index_1.default.info('Now saving the verified code to session');
            if (err) {
                index_1.default.info(err);
                index_1.default.info(req.user.vcode);
                return next(apiError_1.default.internalError('Error Code'));
            }
            index_1.default.info('Verification Code sent to users email');
            index_1.default.info(`Check if req authtype is mounted: ${req.user.authtype}`);
            index_1.default.info(req.user.vcode);
            sendVerification();
            codeTtl();
            return res.status(200).json({ data: { verified: false, type: 'local' } });
        });
    }
    catch (error) {
        return next(apiError_1.default.internalError('Error Code'));
    }
});
exports.createCode = createCode;
const deleteCode = (req, res, next) => {
    delete req.user.vcode;
    return req.session.save((err) => {
        if (err) {
            return next(apiError_1.default.internalError('Internal sessions'));
        }
        index_1.default.info('Verification code is now deleted');
        return next();
    });
};
exports.deleteCode = deleteCode;
//# sourceMappingURL=verifyCode.js.map