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
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../../models/ajv/auth");
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const router = express_1.default.Router();
router.get('/', authCheck_1.authCheck);
router.post('/', authCheck_1.authCheckMwLogin, (0, validateRegDto_1.default)(auth_1.ajvValidateLogin), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session) {
        delete req.session.guestuser;
        return req.session.save((err) => {
            if (err)
                return next(apiError_1.default.internalError('Error'));
            return next();
        });
    }
    return next();
}), (req, res, next) => {
    passport_1.default.authenticate('local-login', (err, user, info) => {
        if (err) {
            return next(apiError_1.default.internalError(err.message));
        }
        if (info) {
            return next(apiError_1.default.internalError(info));
        }
        if (!user) {
            return next(apiError_1.default.internalError('Error Auth'));
        }
        req.user = user;
        return req.login(user, (error) => {
            if (error) {
                return next(apiError_1.default.internalError('Error Auth'));
            }
            return req.session.save((erro) => {
                if (erro) {
                    return next(apiError_1.default.internalError('Error Auth'));
                }
                return res.status(200).json({ data: { verified: true, type: 'local' } });
            });
        });
    })(req, res, next);
});
exports.default = router;
//# sourceMappingURL=login.js.map