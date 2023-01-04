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
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const redis_1 = __importDefault(require("../../models/redis/redis"));
const auth_1 = require("../../models/ajv/auth");
const ipaddr = require('ipaddr.js');
const router = express_1.default.Router();
router.get('/:postId', (req, res, next) => {
    const isValid = (0, auth_1.ajvValidatePostId)(req.params);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new aws_sdk_1.S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const { postId } = req.params;
    const idToString = JSON.parse(postId);
    const checkPostExist = yield redis_1.default.v4.hExists(`post:${idToString}`, 'id');
    if (checkPostExist) {
        if (ipaddr.isValid(req.ip) && req.user) {
            const checkUsernamePostIdExist = yield redis_1.default.v4
                .hExists(`view:${req.user.username}++${req.ip}++${idToString}`, 'id')
                .catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            if (checkUsernamePostIdExist) {
                const getPost = yield redis_1.default.v4.hGetAll(`post:${postId}`);
                const profileImg = yield redis_1.default.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
                const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
                    if (profileImg !== '""') {
                        const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                            Bucket: bucketName,
                            Key: `imageuploads/${profileImg}`,
                            Expires: 60,
                        });
                        return signedUrl;
                    }
                    return null;
                });
                const profileImage = yield profileImgUrl();
                const postImages = yield redis_1.default.v4.hGetAll(`images:${postId}`);
                const imageGetValues = Object.values(postImages);
                const checkIfAlreadyFollowed = () => __awaiter(void 0, void 0, void 0, function* () {
                    const check = yield redis_1.default.v4.hGet(`followers:user:${getPost.user_id}`, req.user.id);
                    if (!check) {
                        return '!Following';
                    }
                    return 'Following';
                });
                const checkIfYouAreTheAuthor = () => __awaiter(void 0, void 0, void 0, function* () {
                    if (req.user) {
                        if (req.user.id === getPost.user_id) {
                            return 'Author';
                        }
                        return '!Author';
                    }
                    return 'Guest';
                });
                const checkIfLike = () => __awaiter(void 0, void 0, void 0, function* () {
                    const check = yield redis_1.default.v4.hGet(`likes:post:${getPost.id}`, req.user.id);
                    if (!check) {
                        return '!Like';
                    }
                    return 'Like';
                });
                const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
                    const imageUrl = imageGetValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                        const imgWithoutQuotes = img.slice(1, -1);
                        const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                            Bucket: bucketName,
                            Key: `imageuploads/${imgWithoutQuotes}`,
                            Expires: 60,
                        });
                        return signedUrl;
                    }));
                    const images = yield Promise.all(imageUrl);
                    if (images.length > 1) {
                        images.reverse();
                    }
                    return Object.assign(Object.assign({ profileImg: profileImage }, getPost), { images });
                });
                return res.status(200).json({
                    data: yield sendData(),
                    isFollowed: yield checkIfAlreadyFollowed(),
                    isLike: yield checkIfLike(),
                    isAuthor: yield checkIfYouAreTheAuthor(),
                });
            }
            yield redis_1.default
                .multi()
                .hSet(`view:${req.user.username}++${req.ip}++${postId}`, 'id', postId)
                .expire(`view:${req.user.username}++${req.ip}++${postId}`, 150)
                .hIncrBy(`post:${postId}`, 'views_count', 1)
                .exec();
            const getPost = yield redis_1.default.v4.hGetAll(`post:${postId}`);
            const profileImg = yield redis_1.default.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
            const postViewsPg = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield pool_1.default.query('BEGIN');
                    yield pool_1.default.query(`UPDATE posts SET views_count=views_count + 1 WHERE pk_post_id = $1`, [Number(postId)]);
                    yield pool_1.default.query('COMMIT');
                    return ['Success', null];
                }
                catch (e) {
                    yield pool_1.default.query('ROLLBACK');
                    return [null, 'Error'];
                }
            });
            const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
                const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                    Bucket: bucketName,
                    Key: `imageuploads/${profileImg}`,
                    Expires: 60,
                });
                return signedUrl;
            });
            const profileImage = yield profileImgUrl();
            const postImages = yield redis_1.default.v4.hGetAll(`images:${postId}`);
            const imageGetValues = Object.values(postImages);
            const checkIfAlreadyFollowed = () => __awaiter(void 0, void 0, void 0, function* () {
                const check = yield redis_1.default.v4.hGet(`followers:user:${getPost.user_id}`, req.user.id);
                if (!check) {
                    return 'Not following';
                }
                return 'Following';
            });
            const checkIfYouAreTheAuthor = () => __awaiter(void 0, void 0, void 0, function* () {
                if (req.user) {
                    if (req.user.id === getPost.user_id) {
                        return 'Author';
                    }
                    return '!Author';
                }
                return 'Guest';
            });
            const checkIfLike = () => __awaiter(void 0, void 0, void 0, function* () {
                const check = yield redis_1.default.v4.hGet(`likes:post:${getPost.id}`, req.user.id);
                if (!check) {
                    return 'No like';
                }
                return 'Like';
            });
            const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
                const imageUrl = imageGetValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                    const imgWithoutQuotes = img.slice(1, -1);
                    const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                        Bucket: bucketName,
                        Key: `imageuploads/${imgWithoutQuotes}`,
                        Expires: 60,
                    });
                    return signedUrl;
                }));
                const images = yield Promise.all(imageUrl);
                if (images.length > 1) {
                    images.reverse();
                }
                return Object.assign(Object.assign({ profileImg: profileImage }, getPost), { images });
            });
            const [successPgViewsPost, failPgViewsPost] = yield postViewsPg();
            if (successPgViewsPost) {
                return res.status(200).json({
                    data: yield sendData(),
                    isFollowed: yield checkIfAlreadyFollowed(),
                    isLike: yield checkIfLike(),
                    isAuthor: yield checkIfYouAreTheAuthor(),
                });
            }
            return next(apiError_1.default.internalError('Error'));
        }
        if (ipaddr.isValid(req.ip) && !req.user) {
            const checkIpPostIdExist = yield redis_1.default.v4.hExists(`view:${req.ip}++${postId}`, 'id');
            if (checkIpPostIdExist) {
                const getPost = yield redis_1.default.v4.hGetAll(`post:${postId}`);
                const profileImg = yield redis_1.default.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
                const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
                    const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                        Bucket: bucketName,
                        Key: `imageuploads/${profileImg}`,
                        Expires: 60,
                    });
                    return signedUrl;
                });
                const profileImage = yield profileImgUrl();
                const postImages = yield redis_1.default.v4.hGetAll(`images:${postId}`);
                const imageGetValues = Object.values(postImages);
                const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
                    const imageUrl = imageGetValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                        const imgWithoutQuotes = img.slice(1, -1);
                        const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                            Bucket: bucketName,
                            Key: `imageuploads/${imgWithoutQuotes}`,
                            Expires: 60,
                        });
                        return signedUrl;
                    }));
                    const images = yield Promise.all(imageUrl);
                    if (images.length > 1) {
                        images.reverse();
                    }
                    return Object.assign(Object.assign({ profileImg: profileImage }, getPost), { images });
                });
                return res.status(200).json({
                    data: yield sendData(),
                    isFollowed: 'Guest',
                    isLike: 'Guest',
                    isAuthor: 'Guest',
                });
            }
            yield redis_1.default
                .multi()
                .hSet(`view:${req.ip}++${postId}`, 'id', postId)
                .expire(`view:${req.ip}++${postId}`, 150)
                .hIncrBy(`post:${postId}`, 'views_count', 1)
                .exec();
            const getPost = yield redis_1.default.v4.hGetAll(`post:${postId}`);
            const profileImg = yield redis_1.default.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
            const postViewsPg = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield pool_1.default.query('BEGIN');
                    yield pool_1.default.query(`UPDATE posts SET views_count=views_count + 1 WHERE pk_post_id = $1`, [Number(postId)]);
                    yield pool_1.default.query('COMMIT');
                    return ['Success', null];
                }
                catch (e) {
                    yield pool_1.default.query('ROLLBACK');
                    return [null, 'Error'];
                }
            });
            const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
                const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                    Bucket: bucketName,
                    Key: `imageuploads/${profileImg}`,
                    Expires: 60,
                });
                return signedUrl;
            });
            const profileImage = yield profileImgUrl();
            const postImages = yield redis_1.default.v4.hGetAll(`images:${postId}`);
            const imageGetValues = Object.values(postImages);
            const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
                const imageUrl = imageGetValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                    const imgWithoutQuotes = img.slice(1, -1);
                    const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                        Bucket: bucketName,
                        Key: `imageuploads/${imgWithoutQuotes}`,
                        Expires: 60,
                    });
                    return signedUrl;
                }));
                const images = yield Promise.all(imageUrl);
                if (images.length > 1) {
                    images.reverse();
                }
                return Object.assign(Object.assign({ profileImg: profileImage }, getPost), { images });
            });
            const [successPgViewsPost, failPgViewsPost] = yield postViewsPg();
            if (successPgViewsPost) {
                return res.status(200).json({
                    data: yield sendData(),
                    isFollowed: 'Guest',
                    isLike: 'Guest',
                    isAuthor: 'Guest',
                });
            }
            return next(apiError_1.default.internalError('Error'));
        }
        const getPost = yield redis_1.default.v4.hGetAll(`post:${postId}`);
        const profileImg = yield redis_1.default.v4.hGet(`user:${getPost.user_id}`, 'profile_img_src');
        const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
            const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                Bucket: bucketName,
                Key: `imageuploads/${profileImg}`,
                Expires: 60,
            });
            return signedUrl;
        });
        const profileImage = yield profileImgUrl();
        const postImages = yield redis_1.default.v4.hGetAll(`images:${postId}`);
        const imageGetValues = Object.values(postImages);
        const sendData = () => __awaiter(void 0, void 0, void 0, function* () {
            const imageUrl = imageGetValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                const imgWithoutQuotes = img.slice(1, -1);
                const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                    Bucket: bucketName,
                    Key: `imageuploads/${imgWithoutQuotes}`,
                    Expires: 60,
                });
                return signedUrl;
            }));
            const images = yield Promise.all(imageUrl);
            if (images.length > 1) {
                images.reverse();
            }
            return Object.assign(Object.assign({ profileImg: profileImage }, getPost), { images });
        });
        return res.status(200).json({
            data: yield sendData(),
            isFollowed: 'Guest',
            isLike: 'Guest',
            isAuthor: 'Guest',
        });
    }
    return next(apiError_1.default.internalError('No Post Found'));
}));
exports.default = router;
//# sourceMappingURL=post.js.map