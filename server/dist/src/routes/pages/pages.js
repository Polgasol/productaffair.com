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
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const aws_sdk_1 = require("aws-sdk");
const redis_1 = __importDefault(require("../../models/redis/redis"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const auth_1 = require("../../models/ajv/auth");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    const isValid = (0, auth_1.ajvValidatePages)(req.query);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const s3 = new aws_sdk_1.S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    dayjs_1.default.extend(utc_1.default);
    dayjs_1.default.extend(timezone_1.default);
    dayjs_1.default.extend(duration_1.default);
    const checkIfSortedSetExist = yield redis_1.default.v4.zCard('postsSortedSet');
    const getAllPost = yield redis_1.default.v4.zRange('postsSortedSet', 0, -1);
    const updateScores = getAllPost.map((postID) => __awaiter(void 0, void 0, void 0, function* () {
        const getAllPosts = yield redis_1.default.v4.hGetAll(`post:${postID}`);
        const currentTime = (0, dayjs_1.default)().utc();
        const timeCreated = getAllPosts.date_created;
        const likesCount = parseInt(getAllPosts.likes_count) * 5;
        const viewsCount = parseInt(getAllPosts.views_count) * 4;
        const commentsCount = parseInt(getAllPosts.comments_count) * 1;
        const baseScore = Math.log(Math.max(likesCount + viewsCount + commentsCount, 1));
        const timeDifference = dayjs_1.default.duration(currentTime.diff(timeCreated)).asWeeks();
        if (timeDifference > 1) {
            const x = timeDifference - 1;
            const newScore = baseScore * Math.exp(-8 * x * x);
            return yield redis_1.default.v4.zAdd('postsSortedSet', [{ score: newScore, value: postID }]);
        }
        return yield redis_1.default.v4.zAdd('postsSortedSet', [{ score: baseScore, value: postID }]);
    }));
    if (checkIfSortedSetExist === 0) {
        return res.status(200).json({ data: 'No posts are available' });
    }
    if (checkIfSortedSetExist > 1000000) {
        yield redis_1.default.zPopMin('postsSortedSet');
    }
    if (getAllPost && updateScores) {
        const start = 0 + parseInt(page) * 24;
        const end = 23 + parseInt(page) * 24;
        const postData = yield redis_1.default.v4.zRange('postsSortedSet', start, end, {
            REV: true,
        });
        if (postData) {
            const getPostData = postData.map((postID) => __awaiter(void 0, void 0, void 0, function* () {
                const postDetails = yield redis_1.default.v4.hGetAll(`post:${postID}`);
                const profileImg = yield redis_1.default.v4.hGet(`user:${postDetails.user_id}`, 'profile_img_src');
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
                const postImages = yield redis_1.default.v4.hGetAll(`images:${postID}`);
                const imageGetValues = Object.values(postImages);
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
                return Object.assign(Object.assign({ profileImg: profileImage }, postDetails), { images });
            }));
            if (parseInt(page) < 0) {
                return next(apiError_1.default.internalError('Error'));
            }
            if (parseInt(page) > 1000) {
                return next(apiError_1.default.internalError('Error'));
            }
            if (!getPostData.length) {
                return res.status(200).json({ data: undefined });
            }
            return res.status(200).json({ data: yield Promise.all(getPostData) });
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=pages.js.map