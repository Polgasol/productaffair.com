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
const express_1 = __importDefault(require("express"));
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const user_1 = __importDefault(require("../../models/user-data/user"));
const auth_1 = require("../../models/ajv/auth");
const verifyCode_1 = require("../../controllers/verifyCode");
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const router = express_1.default.Router();
router.get('/', authCheck_1.authCheck);
router.post('/', (0, validateRegDto_1.default)(auth_1.ajvVerifyCode), authCheck_1.authCheckMwVerify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { verificationCode } = req.body;
    const verified = true;
    if (verificationCode === req.user.vcode) {
        const [success, failure] = yield user_1.default.updateVerified(verified, req.user.email);
        if (success) {
            delete req.user.vcode;
            req.user.verified = verified;
            return req.session.save((err) => {
                if (err)
                    return next(apiError_1.default.internalError('Error'));
                return res.status(200).json({
                    data: {
                        auth: {
                            verified: req.user.verified,
                            type: req.user.authtype,
                        },
                        user: {
                            id: req.user.id,
                            username: req.user.username,
                            guest: req.user.guest,
                            timezone: req.user.tz,
                        },
                    },
                });
            });
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return res.status(200).json({
        data: {
            auth: {
                verified: req.user.verified,
                type: req.user.authtype,
            },
            user: {
                id: req.user.id,
                username: req.user.username,
                guest: req.user.guest,
                timezone: req.user.tz,
            },
        },
    });
}));
router.get('/resend', authCheck_1.authCheckMwVerify, verifyCode_1.deleteCode, verifyCode_1.createCode, (req, res) => {
    res.status(200).json('/verify');
});
exports.default = router;
//# sourceMappingURL=verify.js.map