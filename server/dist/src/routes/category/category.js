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
const auth_1 = require("../../models/ajv/auth");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateGetCategories)(req.query);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, page } = req.query;
    const start = 0 + parseInt(page) * 25;
    const end = 24 + parseInt(page) * 25;
    const s3 = new aws_sdk_1.S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    try {
        const redisSearch = yield redis_1.default.ft.search('posts:index', `@category:${category}`, {
            LIMIT: {
                from: start,
                size: end,
            },
            SORTBY: {
                BY: 'date_created',
            },
        });
        const result = redisSearch.documents;
        const searchResults = result.map((values) => __awaiter(void 0, void 0, void 0, function* () {
            const data = values.value;
            const imageId = values.value.id;
            const userId = values.value.user_id;
            const profileImg = yield redis_1.default.v4.hGet(`user:${userId}`, 'profile_img_src');
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
            const getImagesFromRedis = yield redis_1.default.v4.hGetAll(`images:${imageId}`);
            const getImageValues = Object.values(getImagesFromRedis);
            const imageUrl = getImageValues.map((img) => __awaiter(void 0, void 0, void 0, function* () {
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
            return Object.assign(Object.assign({ profileImg: profileImage }, data), { images });
        }));
        if (parseInt(page) < 0) {
            return next(apiError_1.default.internalError('Error'));
        }
        if (parseInt(page) > 1000) {
            return next(apiError_1.default.internalError('Error'));
        }
        if (!result.length) {
            return res.status(200).json({ data: undefined });
        }
        if (result) {
            return res.status(200).json({ data: yield Promise.all(searchResults.reverse()) });
        }
        return next(apiError_1.default.internalError('Error'));
    }
    catch (e) {
        return next(apiError_1.default.internalError('Error'));
    }
}));
exports.default = router;
//# sourceMappingURL=category.js.map