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
    const isValid = (0, auth_1.ajvValidateSearch)(req.query);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, page } = req.query;
    const start = 0 + parseInt(page) * 25;
    const end = 24 + parseInt(page) * 25;
    const s3 = new aws_sdk_1.S3();
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const redisSearch = yield redis_1.default.ft
        .search('posts:index', query, {
        LIMIT: {
            from: start,
            size: end,
        },
    })
        .catch(() => {
        return next(apiError_1.default.internalError('Error'));
    });
    const result = redisSearch.documents;
    const searchResults = result.map((values) => __awaiter(void 0, void 0, void 0, function* () {
        const data = values.value;
        const imageId = values.value.id;
        const getImagesFromRedis = yield redis_1.default.v4.hGetAll(`images:${imageId}`).catch(() => {
            return next(apiError_1.default.internalError('Error'));
        });
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
        return Object.assign(Object.assign({}, data), { images });
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
    return res.status(200).json({ data: 'No posts are available' });
}));
exports.default = router;
//# sourceMappingURL=search.js.map