"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const index_1 = __importDefault(require("../../logger/index"));
const router = express_1.default.Router();
router.get('/google', (req, res, next) => {
    index_1.default.info(`GOOGLE ROUTE GET REQUEST`);
    if (req.user) {
        if ((req.user.authtype === 'local' && req.user.verified === true) ||
            (req.user.authtype === 'google' && req.user.verified === true)) {
            index_1.default.info('redirect to /home');
            return res.status(200).json({
                data: {
                    verified: true,
                    type: req.user.authtype,
                },
            });
        }
        if (req.user.authtype === 'google' && req.user.verified === false) {
            delete req.session.passport.user;
            return req.session.save(req.sessionID, (err) => {
                if (err)
                    return next(apiError_1.default.internalError('Error'));
                index_1.default.info(`Unverified GOOGLE is now deleted`);
                return next();
            });
        }
        if (req.user.authtype === 'local' && req.user.verified === false) {
            delete req.session.passport.user;
            return req.session.save(req.sessionID, (err) => {
                if (err)
                    return next(apiError_1.default.internalError('Error'));
                index_1.default.info(`Unverified LOCAL is now deleted`);
                return next();
            });
        }
        return res.status(200).json({ data: { verified: false, type: 'guest' } });
    }
    return next();
}, passport_1.default.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account',
}));
exports.default = router;
//# sourceMappingURL=google.js.map