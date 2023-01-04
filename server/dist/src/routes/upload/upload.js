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
const multer_1 = __importDefault(require("multer"));
const nanoid_1 = require("nanoid");
const aws_sdk_1 = require("aws-sdk");
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const auth_1 = require("../../models/ajv/auth");
const pool_1 = __importDefault(require("../../pool/pool"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const redis_1 = __importDefault(require("../../models/redis/redis"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const limits = {
    fields: 4,
    fileSize: 20000000,
    files: 5,
};
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/webp') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({ fileFilter, limits }).array('image', 5);
const router = express_1.default.Router();
router.get('/', authCheck_1.authCheck);
router.post('/', upload, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.ratings = JSON.parse(req.body.ratings);
    next();
}), authCheck_1.authCheckMw, (0, validateRegDto_1.default)(auth_1.ajvValidateUpload), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const { title, storeName, ratings, category } = req.body;
    const userId = req.user.id;
    const { username } = req.user;
    const overallRating = ratings.map((n) => n.score).reduce((prev, score) => prev + score, 0) / 3;
    const uploadDetails = (idUser, userName, postTitle, storename, individualRating, postCategory, averageRating) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield pool_1.default.query('BEGIN');
            const postId = yield pool_1.default.query(`INSERT INTO posts(fk_users_id, author, title, store_name, category, quality, price, customer_service, overall_product_rating) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9) RETURNING pk_post_id`, [
                idUser,
                userName,
                postTitle,
                storename,
                postCategory,
                individualRating[0].score,
                individualRating[1].score,
                individualRating[2].score,
                averageRating,
            ]);
            yield pool_1.default.query(`UPDATE users SET post_count=post_count+1 WHERE pk_users_id=$1`, [userId]);
            yield pool_1.default.query('COMMIT');
            return [postId, null];
        }
        catch (e1) {
            yield pool_1.default.query('ROLLBACK');
            return [null, e1];
        }
    });
    const uploadRedis = (postId, idUser, userName, postTitle, storename, individualRating, postCategory, averageRating) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dateCreated = yield pool_1.default.query(`SELECT date_created from posts where pk_post_id=$1`, [
                postId.rows[0].pk_post_id,
            ]);
            if (dateCreated) {
                yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                    yield isolatedClient.watch(`user:${idUser}`);
                    const multi = isolatedClient
                        .multi()
                        .hSet(`post:${postId.rows[0].pk_post_id}`, [
                        'id',
                        `${postId.rows[0].pk_post_id}`,
                        'user_id',
                        `${idUser}`,
                        'author',
                        `${userName}`,
                        'title',
                        `${postTitle}`,
                        'store_name',
                        `${storename}`,
                        'overall_rating',
                        `${averageRating}`,
                        'quality',
                        `${individualRating[0].score}`,
                        'price',
                        `${individualRating[1].score}`,
                        'customer_service',
                        `${individualRating[2].score}`,
                        'likes_count',
                        `${0}`,
                        'views_count',
                        `${0}`,
                        'category',
                        `${postCategory}`,
                        'comments_count',
                        `${0}`,
                        'date_created',
                        `${dateCreated.rows[0].date_created}`,
                    ])
                        .lPush(`user:list:${userId}`, `${postId.rows[0].pk_post_id}`)
                        .hIncrBy(`user:${userId}`, 'post_count', 1)
                        .v4.zAdd('postsSortedSet', [
                        {
                            score: 1,
                            value: `${postId.rows[0].pk_post_id}`,
                        },
                    ]);
                    return multi.exec();
                }));
                return ['Success', null];
            }
            return [null, 'Error'];
        }
        catch (e2) {
            yield pool_1.default.query('ROLLBACK');
            yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                yield isolatedClient.watch(`user:${userId}`);
                const multi = isolatedClient
                    .multi()
                    .del(`post:${postId.rows[0].pk_post_id}`)
                    .del(`images:${postId.rows[0].pk_post_id}`)
                    .hIncrBy(`user:${userId}`, 'post_count', -1)
                    .zRem('postsSortedSet', `${postId.rows[0].pk_post_id}`)
                    .lRem(`user:list:${userId}`, 0, `${postId.rows[0].pk_post_id}`);
                return multi.exec();
            }));
            return [null, e2];
        }
    });
    const uploadFiles = (postFiles, details) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bucketName = process.env.AWS_S3_BUCKET_NAME;
            const s3 = new aws_sdk_1.S3();
            const uploadParams = postFiles.map((file) => {
                const appendFileName = (0, nanoid_1.nanoid)(64);
                const fileName = appendFileName + file.originalname;
                const checkFileExtension = file.originalname.slice(((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
                if (checkFileExtension === 'jpeg' ||
                    checkFileExtension === 'jpg' ||
                    checkFileExtension === 'png' ||
                    checkFileExtension === 'webp') {
                    return {
                        Bucket: bucketName,
                        Body: file.buffer,
                        Key: `imageuploads/${fileName}`,
                    };
                }
                return {
                    Bucket: bucketName,
                    Body: file.buffer,
                    Key: `imageuploads/${fileName}${'.jpeg'}`,
                };
            });
            uploadParams.map((params) => __awaiter(void 0, void 0, void 0, function* () {
                const filename = params.Key.substring(13, params.Key.length - 0);
                const mediaId = (0, nanoid_1.nanoid)(32);
                try {
                    yield pool_1.default.query('BEGIN');
                    yield pool_1.default.query(`INSERT INTO images(fk_post_id, media_id, image_url) VALUES ($1,$2, $3) RETURNING pk_image_id`, [details.rows[0].pk_post_id, mediaId, filename]);
                    yield pool_1.default.query('COMMIT');
                }
                catch (e4) {
                    yield pool_1.default.query('ROLLBACK');
                    return e4;
                }
                try {
                    yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                        yield isolatedClient.watch(`post:${uploadDetails.rows[0].pk_post_id}`);
                        const multi = isolatedClient
                            .multi()
                            .hSet(`images:${uploadDetails.rows[0].pk_post_id}`, JSON.stringify(filename), JSON.stringify(filename));
                        return multi.exec();
                    }));
                }
                catch (e5) {
                    const deleteImages = yield redis_1.default.del(`images:${details.rows[0].pk_post_id}`);
                    if (deleteImages)
                        return e5;
                    return e5;
                }
            }));
            yield Promise.all(uploadParams.map((params) => s3.upload(params).promise())).catch(() => __awaiter(void 0, void 0, void 0, function* () {
                const rollbackPostgres = yield pool_1.default.query('ROLLBACK');
                const deleteImagesRedis = yield redis_1.default.del(`images:${uploadDetails.rows[0].pk_post_id}`);
                const deleteImages = uploadParams.map((params) => {
                    const parameters = {
                        Bucket: params.Bucket,
                        Key: params.Key,
                    };
                    s3.deleteObject(parameters, (err, data) => {
                        if (err) {
                            return [null, err];
                        }
                        return [null, err];
                    });
                });
                yield Promise.allSettled([rollbackPostgres, deleteImagesRedis, deleteImages]);
                return [null, 'Error'];
            }));
            return ['Success', null];
        }
        catch (e3) {
            return [null, e3];
        }
    });
    const [postId, e1] = yield uploadDetails(userId, username, title, storeName, ratings, category, overallRating);
    const [redisPostDetailsUpload, e2] = yield uploadRedis(postId, userId, username, title, storeName, ratings, category, overallRating);
    const [successUpload, e3] = yield uploadFiles(files, postId);
    if (postId && redisPostDetailsUpload && successUpload) {
        return res.status(200).json({
            data: {
                userId: req.user.id,
            },
        });
    }
    if (e1 || e2 || e3) {
        if (e3) {
            yield pool_1.default.query('ROLLBACK');
            yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                yield isolatedClient.watch(`user:${userId}`);
                const multi = isolatedClient
                    .multi()
                    .del(`post:${postId.rows[0].pk_post_id}`)
                    .del(`images:${postId.rows[0].pk_post_id}`)
                    .hIncrBy(`user:${userId}`, 'post_count', -1)
                    .zRem('postsSortedSet', `${postId.rows[0].pk_post_id}`)
                    .lRem(`user:list:${userId}`, 0, `${postId.rows[0].pk_post_id}`);
                return multi.exec();
            }));
            return next(apiError_1.default.internalError('Error'));
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=upload.js.map