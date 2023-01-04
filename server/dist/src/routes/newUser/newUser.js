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
const auth_1 = require("../../models/ajv/auth");
const user_1 = __importDefault(require("../../models/user-data/user"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const router = express_1.default.Router();
router.post('/', (0, validateRegDto_1.default)(auth_1.ajvValidateGoogleUsername), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { googleUsername } = req.body;
        const update = () => __awaiter(void 0, void 0, void 0, function* () {
            const updateVerify = yield user_1.default.updateVerified(true, req.user.email);
            if (updateVerify) {
                return res.redirect('/home');
            }
            return next(apiError_1.default.internalError('Error'));
        });
        req.user.username = googleUsername;
        req.user.verified = true;
        req.session.save((err) => {
            if (err) {
                return next(apiError_1.default.internalError('Error'));
            }
            return update();
        });
        return next(apiError_1.default.internalError('Error'));
    }
    catch (err) {
        return next(apiError_1.default.internalError('Error'));
    }
}));
exports.default = router;
//# sourceMappingURL=newUser.js.map