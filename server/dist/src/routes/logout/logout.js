"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const router = express_1.default.Router();
router.get('/', authCheck_1.authCheckMw, (req, res, next) => {
    res.clearCookie('sid');
    return req.session.destroy((err) => {
        if (err) {
            return next(apiError_1.default.internalError('Internal Error'));
        }
        return res.status(200).json({ data: 'Logged out' });
    });
});
exports.default = router;
//# sourceMappingURL=logout.js.map