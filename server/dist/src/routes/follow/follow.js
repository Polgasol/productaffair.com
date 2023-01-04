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
router.post('/', authCheck_1.authCheckMw, (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateFollow)(req.body);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const checkIfUserExist = yield redis_1.default.v4.hExists(`user:${userId}`, 'id');
    if (checkIfUserExist) {
        const checkIfAlreadyFollowed = yield redis_1.default.v4.hGet(`followers:user:${userId}`, req.user.id);
        if (checkIfAlreadyFollowed) {
            return res.status(200).json({ data: 'Following' });
        }
        const followToRedis = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                    yield isolatedClient.watch(`user:${userId}`);
                    const multi = isolatedClient
                        .multi()
                        .hSet(`followers:user:${userId}`, req.user.id, req.user.id)
                        .hIncrBy(`user:${userId}`, 'total_followers', 1);
                    return multi.exec();
                }));
                return ['Success', null];
            }
            catch (e) {
                return [null, 'Error'];
            }
        });
        const uploadToPostgres = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield pool_1.default.query('BEGIN');
                yield pool_1.default.query('INSERT INTO follow(user_followed_id,new_follower_id) VALUES($1,$2)', [
                    Number(userId),
                    Number(req.user.id),
                ]);
                yield pool_1.default.query(`UPDATE users SET followers_count=followers_count + 1 WHERE pk_users_id = $1`, [
                    Number(userId),
                ]);
                yield pool_1.default.query(`UPDATE users SET following_count=following_count + 1 WHERE pk_users_id = $1`, [
                    Number(req.user.id),
                ]);
                yield pool_1.default.query('COMMIT');
                return ['Success', null];
            }
            catch (e) {
                yield pool_1.default.query('ROLLBACK');
                return [null, 'Error'];
            }
        });
        const [successRedisUpload, failureRedisUpload] = yield followToRedis();
        const [successPgUpload, failurePgUpload] = yield uploadToPostgres();
        if (successRedisUpload && successPgUpload) {
            return res.status(200).json({ data: 'Following' });
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=follow.js.map