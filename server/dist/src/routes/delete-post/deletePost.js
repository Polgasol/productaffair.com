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
const aws_sdk_1 = require("aws-sdk");
const pool_1 = __importDefault(require("../../pool/pool"));
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const redis_1 = __importDefault(require("../../models/redis/redis"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const auth_1 = require("../../models/ajv/auth");
const router = express_1.default.Router();
router.post(`/`, authCheck_1.authCheckMwDeletePost, (0, validateRegDto_1.default)(auth_1.ajvValidatePostId), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.body;
    const idToString = JSON.parse(postId);
    const checkPostExist = yield redis_1.default.v4.hExists(`post:${idToString}`, 'id');
    if (checkPostExist) {
        const deletePostS3 = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const bucketName = process.env.AWS_S3_BUCKET_NAME;
                const s3 = new aws_sdk_1.S3();
                const imageArrayBeforeDeletion = yield redis_1.default.v4.hGetAll(`images:${postId}`);
                const imageGetValues = Object.values(imageArrayBeforeDeletion);
                const iterate = imageGetValues.map((img) => {
                    const imgWithoutQuotes = img.slice(1, -1);
                    const params = {
                        Bucket: bucketName,
                        Key: `imageuploads/${imgWithoutQuotes}`,
                    };
                    return s3.deleteObject(params, (err, data) => {
                        if (err) {
                            return [null, 'Error'];
                        }
                        return null;
                    });
                });
                const successIterate = yield Promise.all(iterate);
                if (successIterate) {
                    return ['Success', null];
                }
                return [null, 'Error'];
            }
            catch (e) {
                return [null, 'Error'];
            }
        });
        const deletePostRedis = (idPost, userId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                    yield isolatedClient.watch(`user:${userId}`);
                    const multi = isolatedClient
                        .multi()
                        .del(`post:${idPost}`)
                        .del(`images:${idPost}`)
                        .hIncrBy(`user:${userId}`, 'post_count', -1)
                        .zRem('postsSortedSet', `${idPost}`)
                        .lRem(`user:list:${userId}`, 0, `${idPost}`);
                    return multi.exec();
                }));
                return ['Success', null];
            }
            catch (e) {
                return [null, 'Error'];
            }
        });
        const deletePostPg = (idPost, userId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield pool_1.default.query('BEGIN');
                yield pool_1.default.query(`DELETE FROM images WHERE fk_post_id=$1`, [Number(idPost)]);
                yield pool_1.default.query(`DELETE FROM post_likes WHERE fk_post_id=$1`, [Number(idPost)]);
                yield pool_1.default.query(`DELETE FROM views WHERE fk_post_id=$1`, [Number(idPost)]);
                yield pool_1.default.query(`DELETE FROM posts WHERE pk_post_id=$1`, [Number(idPost)]);
                yield pool_1.default.query(`UPDATE users SET post_count=post_count-1 WHERE pk_users_id=$1`, [Number(userId)]);
                yield pool_1.default.query('COMMIT');
                return ['Success', null];
            }
            catch (e) {
                yield pool_1.default.query('ROLLBACK');
                return [null, 'Error'];
            }
        });
        const [successS3Del, failS3Del] = yield deletePostS3();
        const [successRedisDel, failRedisDel] = yield deletePostRedis(postId, req.user.id);
        const [successPgDel, failPgDel] = yield deletePostPg(postId, req.user.id);
        if (successS3Del && successRedisDel && successPgDel) {
            return res.status(200).json({ data: 'Post deletion completed' });
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=deletePost.js.map