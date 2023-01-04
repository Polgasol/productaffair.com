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
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const redis_1 = __importDefault(require("../../models/redis/redis"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, page } = req.query;
    const s3 = new aws_sdk_1.S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const start = 0 + page * 24;
    const end = 23 + page * 24;
    const checkIfUserListExist = yield redis_1.default.v4.exists(`user:list:${user}`);
    if (checkIfUserListExist) {
        const getPostKeys = yield redis_1.default.v4.lRange(`user:list:${user}`, start, end);
        const getPostData = getPostKeys.map((keys) => __awaiter(void 0, void 0, void 0, function* () {
            const postDetails = yield redis_1.default.v4.hGetAll(`post:${keys}`).catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            const profileImg = yield redis_1.default.v4.hGet(`user:${postDetails.user_id}`, 'profile_img_src').catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
                const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                    Bucket: bucketName,
                    Key: `imageuploads/${profileImg}`,
                    Expires: 60,
                });
                return signedUrl;
            });
            const profileImage = yield profileImgUrl().catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            const postImages = yield redis_1.default.v4.hGetAll(`images:${keys}`).catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            const imageGetValues = Object.values(postImages);
            const imageUrl = imageGetValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
                const imgWithoutQuotes = img.slice(1, -1);
                const signedUrl = yield s3
                    .getSignedUrlPromise('getObject', {
                    Bucket: bucketName,
                    Key: `imageuploads/${imgWithoutQuotes}`,
                    Expires: 60,
                })
                    .catch(() => {
                    return next(apiError_1.default.internalError('Error'));
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
}));
exports.default = router;
//# sourceMappingURL=profile.js.map