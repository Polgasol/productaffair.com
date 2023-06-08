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
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const auth_1 = require("../../models/ajv/auth");
const verifyCode_1 = require("../../controllers/verifyCode");
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const router = express_1.default.Router();
router.get('/', authCheck_1.authCheck);
router.post('/', (0, validateRegDto_1.default)(auth_1.ajvValidateReg), authCheck_1.authCheckMwRegister, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    passport_1.default.authenticate('local-register', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(apiError_1.default.internalError('Error Auth'));
        }
        if (info) {
            return next(apiError_1.default.internalError('Error Auth'));
        }
        if (!user) {
            return next(apiError_1.default.internalError('Error Auth'));
        }
        req.user = user;
        return req.login(user, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return next(apiError_1.default.internalError('Error Auth'));
            }
            return req.session.save((erro) => __awaiter(void 0, void 0, void 0, function* () {
                if (erro) {
                    return next(apiError_1.default.internalError('Error Auth'));
                }
                return next();
            }));
        }));
    }))(req, res, next);
}, verifyCode_1.createCode);
exports.default = router;
//# sourceMappingURL=register.js.map