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
const multer_1 = __importDefault(require("multer"));
const nanoid_1 = require("nanoid");
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const pool_1 = __importDefault(require("../../pool/pool"));
const auth_1 = require("../../models/ajv/auth");
const redis_1 = __importDefault(require("../../models/redis/redis"));
const apiError_1 = __importDefault(require("../../middleware/api-error-handler/apiError"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const router = express_1.default.Router();
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
const limits = {
    fields: 1,
    fileSize: 10000000,
    files: 1,
};
const upload = (0, multer_1.default)({ fileFilter, limits }).array('image', 2);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const s3 = new aws_sdk_1.S3();
    const { user } = req.query;
    const getProfileInfo = yield redis_1.default.v4.hmGet(`user:${user}`, [
        'id',
        'username',
        'about',
        'total_followers',
        'profile_img_src',
        'post_count',
    ]);
    const [userId, username, about, followers, profileImg, postCount] = getProfileInfo;
    const profileImgUrl = (image) => __awaiter(void 0, void 0, void 0, function* () {
        if (image !== '""' && image !== '') {
            const signedUrl = yield s3.getSignedUrlPromise('getObject', {
                Bucket: bucketName,
                Key: `imageuploads/${image}`,
                Expires: 60,
            });
            return signedUrl;
        }
        return null;
    });
    const profileImage = yield profileImgUrl(profileImg);
    const dataInfo = {
        userId,
        username,
        about,
        followers,
        profileImage,
        postCount,
    };
    const checkIfAuthor = () => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            if (req.user.id === user) {
                return 'Author';
            }
            return '!Author';
        }
        return 'Guest';
    });
    const checkIfAlreadyFollowed = (usersId) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            const check = yield redis_1.default.v4.hGet(`followers:user:${usersId}`, req.user.id);
            if (!check) {
                return '!Following';
            }
            return 'Following';
        }
        return 'Guest';
    });
    return res.status(200).json({
        data: Object.assign(Object.assign({}, dataInfo), { isAuthor: yield checkIfAuthor(), isFollowing: yield checkIfAlreadyFollowed(userId) }),
    });
}));
router.post('/', upload, authCheck_1.authCheckMwProfileInfo, (0, validateRegDto_1.default)(auth_1.ajvValidateAbout), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const { about } = req.body;
    const userId = req.user.id;
    const uploadToServer = (filesToUpload, usersID, aboutText) => __awaiter(void 0, void 0, void 0, function* () {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const s3 = new aws_sdk_1.S3();
        try {
            yield pool_1.default.query('BEGIN');
            yield pool_1.default.query(`UPDATE users SET about=$1 WHERE pk_users_id=$2`, [aboutText, usersID]);
            yield pool_1.default.query('COMMIT');
            const uploadParams = filesToUpload.map((file) => {
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
                try {
                    yield pool_1.default.query('BEGIN');
                    yield pool_1.default.query(`UPDATE users SET profile_img_url=$1 WHERE pk_users_id=$2`, [filename, usersID]);
                    yield pool_1.default.query('COMMIT');
                }
                catch (e) {
                    yield pool_1.default.query('ROLLBACK');
                    return e;
                }
                try {
                    yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                        yield isolatedClient.watch(`user:${usersID}`);
                        const multi = isolatedClient
                            .multi()
                            .hSet(`user:${usersID}`, 'profile_img_src', `${filename}`)
                            .hSet(`user:${usersID}`, 'about', `${aboutText}`);
                        return multi.exec();
                    }));
                }
                catch (e) {
                    yield pool_1.default.query('ROLLBACK');
                    yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                        yield isolatedClient.watch(`user:${usersID}`);
                        const multi = isolatedClient
                            .multi()
                            .hSet(`user:${usersID}`, 'profile_img_src', ``)
                            .hSet(`user:${usersID}`, 'about', ``);
                        return multi.exec();
                    }));
                    return e;
                }
            }));
            yield Promise.all(uploadParams.map((params) => s3.upload(params).promise())).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
                if (e) {
                    const rollbackPostgres = yield pool_1.default.query('ROLLBACK');
                    const deleteImagesRedis = yield redis_1.default.executeIsolated((isolatedClient) => __awaiter(void 0, void 0, void 0, function* () {
                        yield isolatedClient.watch(`user:${usersID}`);
                        const multi = isolatedClient
                            .multi()
                            .hSet(`user:${usersID}`, 'profile_img_src', ``)
                            .hSet(`user:${usersID}`, 'about', ``);
                        return multi.exec();
                    }));
                    const deleteImages = uploadParams.map((params) => {
                        const parameters = {
                            Bucket: params.Bucket,
                            Key: params.Key,
                        };
                        s3.deleteObject(parameters, (err) => {
                            if (err) {
                                return [null, err];
                            }
                            return [null, err];
                        });
                    });
                    yield Promise.allSettled([rollbackPostgres, deleteImagesRedis, deleteImages]);
                    return [null, 'Error'];
                }
            }));
            return ['Success', null];
        }
        catch (e) {
            yield pool_1.default.query('ROLLBACK');
            return [null, 'Error'];
        }
    });
    const [success, error] = yield uploadToServer(files, userId, about);
    if (success) {
        return res.status(200).json({
            data: {
                message: 'Success',
                userId: req.user.id,
            },
        });
    }
    if (error) {
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=profileInfo.js.map