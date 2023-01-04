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
const pool_1 = __importDefault(require("../../pool/pool"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const auth_1 = require("../../models/ajv/auth");
const redis_1 = __importDefault(require("../../models/redis/redis"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const router = express_1.default.Router();
router.post('/', authCheck_1.authCheckMwUnlike, (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateLike)(req.body);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    const checkIfPostExist = yield redis_1.default.v4.hExists(`post:${postId}`, 'id');
    if (checkIfPostExist) {
        const checkIfAlreadyUnliked = yield redis_1.default.v4.hGet(`likes:post:${postId}`, req.user.id);
        if (!checkIfAlreadyUnliked) {
            return res.status(200).json({ data: '!Like' });
        }
        const unlikeRedis = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                    yield isolatedClient.watch(`post:${postId}`);
                    const multi = isolatedClient
                        .multi()
                        .hDel(`likes:post:${postId}`, req.user.id)
                        .hIncrBy(`post:${postId}`, 'likes_count', -1);
                    return multi.exec();
                }));
                return ['Success', null];
            }
            catch (e) {
                return [null, 'Error'];
            }
        });
        const unlikePg = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield pool_1.default.query(`Delete FROM post_likes WHERE fk_post_id=$1 AND fk_liker_id=$2`, [
                    Number(postId),
                    Number(req.user.id),
                ]);
                yield pool_1.default.query(`UPDATE posts SET likes_count=likes_count - 1 WHERE pk_post_id = $1`, [Number(postId)]);
                return ['Success', null];
            }
            catch (e) {
                return [null, 'Error'];
            }
        });
        const [successUnLikeRedis, failureUnLikeRedis] = yield unlikeRedis();
        const [successUnLikePg, failureUnLikePg] = yield unlikePg();
        if (successUnLikeRedis && successUnLikePg) {
            return res.status(200).json({ data: '!Like' });
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=unlike.js.map