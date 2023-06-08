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
const auth_1 = require("../../models/ajv/auth");
const redis_1 = __importDefault(require("../../models/redis/redis"));
const authCheck_1 = require("../../middleware/authCheck/authCheck");
const validateRegDto_1 = __importDefault(require("../../middleware/ajv-validation/validateRegDto"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateGetComments)(req.query);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, page } = req.query;
        const s3 = new aws_sdk_1.S3();
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const resultsPerPage = 1;
        const offsetComment = parseInt(page) * resultsPerPage;
        const limitComment = resultsPerPage;
        const getComments = (id, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
            const { rows } = yield pool_1.default.query('SELECT * FROM comments WHERE FK_post_id = $1 ORDER BY date_created DESC LIMIT $2 OFFSET $3', [id, limit, offset]);
            return rows;
        });
        const result = yield getComments(postId, offsetComment, limitComment);
        const commentData = result.map((obj) => __awaiter(void 0, void 0, void 0, function* () {
            const profileImg = yield redis_1.default.v4.hGet(`user:${obj.fk_commenter_id}`, 'profile_img_src');
            const profileImgUrl = () => __awaiter(void 0, void 0, void 0, function* () {
                if (profileImg !== '""' && profileImg !== '') {
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
            const checkCommentLike = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                if (req.user) {
                    const isLikedExist = yield pool_1.default.query(`SELECT * from comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`, [commentId, Number(req.user.id)]);
                    if (((_a = isLikedExist.rows[0]) === null || _a === void 0 ? void 0 : _a.fk_comliker_id) === Number(req.user.id)) {
                        return true;
                    }
                    return false;
                }
                return false;
            });
            const checkCommentAuthor = (commenterId) => __awaiter(void 0, void 0, void 0, function* () {
                var _b;
                if (req.user) {
                    const isAuthorExist = yield pool_1.default.query(`SELECT * from comments WHERE pk_comments_id=$1 AND fk_commenter_id=$2`, [commenterId, Number(req.user.id)]);
                    if (((_b = isAuthorExist.rows[0]) === null || _b === void 0 ? void 0 : _b.fk_commenter_id) === Number(req.user.id)) {
                        return true;
                    }
                    return false;
                }
                return false;
            });
            const isLike = yield checkCommentLike(obj.pk_comments_id);
            const isAuthor = yield checkCommentAuthor(obj.pk_comments_id);
            return {
                profileImg: profileImage,
                isLike,
                isAuthor,
                commentId: obj.pk_comments_id,
                postId: obj.fk_post_id,
                userId: obj.fk_commenter_id,
                username: obj.author,
                commentText: obj.comment_text,
                likesCount: obj.likes_count,
                dislikesCount: obj.dislikes_count,
                dateCreated: obj.date_created,
            };
        }));
        if (parseInt(page) < 0) {
            return next(apiError_1.default.internalError('Error'));
        }
        if (parseInt(page) > 1000) {
            return next(apiError_1.default.internalError('Error'));
        }
        if (!commentData.length) {
            return res.status(200).json({ data: undefined });
        }
        return res.status(200).json({ data: yield Promise.all(commentData) });
    }
    catch (e) {
        return next(apiError_1.default.internalError('Error'));
    }
}));
router.post('/', authCheck_1.authCheckMwComments, (0, validateRegDto_1.default)(auth_1.ajvValidateComments), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const author = req.user.username;
    const userId = req.user.id;
    const likesCount = 0;
    const dislikesCount = 0;
    const { commentText, id } = req.body;
    const postToPostgres = (authorName, text, user, postId, likes, dislikes) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield pool_1.default.query('BEGIN');
            const commentId = yield pool_1.default.query(`INSERT INTO comments(fk_post_id,fk_commenter_id,author,comment_text,likes_count,dislikes_count) VALUES($1,$2,$3,$4,$5,$6) RETURNING pk_comments_id`, [postId, user, authorName, text, likes, dislikes]);
            yield pool_1.default.query('COMMIT');
            return [commentId, null];
        }
        catch (e) {
            yield pool_1.default.query('ROLLBACK');
            return [null, 'Failure'];
        }
    });
    const [commentId, failedCommentId] = yield postToPostgres(author, commentText, userId, id, likesCount, dislikesCount);
    const isQueryResult = (value) => {
        return value && typeof value.rows !== 'undefined';
    };
    if (isQueryResult(commentId)) {
        return res.status(200).json({ data: { commentId: commentId.rows[0].pk_comments_id, commentText } });
    }
    if (failedCommentId) {
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
router.post('/like', authCheck_1.authCheckMwLike, (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateCommentLike)(req.body);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { commentId } = req.body;
    const checkCommentLike = (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        if (req.user) {
            const isLikedExist = yield pool_1.default.query(`SELECT * from comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`, [id, Number(req.user.id)]);
            if (((_d = isLikedExist.rows[0]) === null || _d === void 0 ? void 0 : _d.fk_comliker_id) === Number(req.user.id)) {
                return true;
            }
            return false;
        }
        return false;
    });
    const checkIfLike = yield checkCommentLike(commentId);
    if (!checkIfLike) {
        const checkIfCommentExist = yield pool_1.default.query(`SELECT * FROM comments WHERE pk_comments_id = $1`, [commentId]);
        if (((_c = checkIfCommentExist.rows[0]) === null || _c === void 0 ? void 0 : _c.pk_comments_id) === commentId) {
            const likeToPg = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield pool_1.default.query('BEGIN');
                    yield pool_1.default.query(`UPDATE comments SET likes_count=likes_count + 1 WHERE pk_comments_id = $1`, [commentId]);
                    yield pool_1.default.query('INSERT INTO comment_likes(fk_comment_id,fk_comliker_id) VALUES($1,$2)', [
                        commentId,
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
            const [successLikePg, failureLikePg] = yield likeToPg();
            if (successLikePg) {
                return res.status(200).json({ data: true });
            }
            if (failureLikePg) {
                return next(apiError_1.default.internalError('Error'));
            }
            return next(apiError_1.default.internalError('Error'));
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
router.post('/unlike', authCheck_1.authCheckMwUnlike, (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateCommentLike)(req.body);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { commentId } = req.body;
    const checkCommentLike = (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        if (req.user) {
            const isLikedExist = yield pool_1.default.query(`SELECT * from comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`, [id, Number(req.user.id)]);
            if (((_f = isLikedExist.rows[0]) === null || _f === void 0 ? void 0 : _f.fk_comliker_id) === Number(req.user.id)) {
                return true;
            }
            return false;
        }
        return false;
    });
    const checkIfLike = yield checkCommentLike(commentId);
    if (checkIfLike) {
        const checkIfCommentExist = yield pool_1.default.query(`SELECT * FROM comments WHERE pk_comments_id = $1`, [commentId]);
        if (((_e = checkIfCommentExist.rows[0]) === null || _e === void 0 ? void 0 : _e.pk_comments_id) === commentId) {
            const unlikePg = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield pool_1.default.query('BEGIN');
                    yield pool_1.default.query(`UPDATE comments SET likes_count=likes_count - 1 WHERE pk_comments_id = $1`, [commentId]);
                    yield pool_1.default.query(`Delete FROM comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`, [
                        commentId,
                        Number(req.user.id),
                    ]);
                    yield pool_1.default.query('COMMIT');
                    return ['Success', null];
                }
                catch (e) {
                    return [null, 'Error'];
                }
            });
            const [successUnLikePg, failureUnLikePg] = yield unlikePg();
            if (successUnLikePg) {
                return res.status(200).json({ data: true });
            }
            if (failureUnLikePg) {
                return next(apiError_1.default.internalError('Error'));
            }
            return next(apiError_1.default.internalError('Error'));
        }
        return next(apiError_1.default.internalError('Error'));
    }
    return next(apiError_1.default.internalError('Error'));
}));
router.post('/delete', authCheck_1.authCheckDeleteComments, (req, res, next) => {
    const isValid = (0, auth_1.ajvValidateCommentDelete)(req.body);
    if (isValid) {
        return next();
    }
    return next(apiError_1.default.internalError('Error'));
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = req.body;
    const deleteComments = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield pool_1.default.query(`DELETE FROM comments WHERE fk_commenter_id=$1 AND pk_comments_id=$2`, [
                Number(req.user.id),
                id,
            ]);
            return ['Success', null];
        }
        catch (e) {
            yield pool_1.default.query('ROLLBACK');
            return [null, 'Error'];
        }
    });
    const [deleteCommentSuccess, deleteCommentFailure] = yield deleteComments(commentId);
    if (deleteCommentSuccess) {
        return res.status(200).json({ data: 'Success' });
    }
    if (deleteCommentFailure) {
        return res.status(200).json({ data: 'Failure' });
    }
    return next(apiError_1.default.internalError('Error'));
}));
exports.default = router;
//# sourceMappingURL=comments.js.map