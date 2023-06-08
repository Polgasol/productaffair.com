/* eslint-disable no-unused-vars */
import express from 'express';
import { S3 } from 'aws-sdk';
import { QueryResult } from 'pg';
import db from '../../pool/pool';
import ApiError from '../../middleware/api-error-handler/apiError';
import {
  ajvValidateGetComments,
  ajvValidateComments,
  ajvValidateCommentLike,
  ajvValidateCommentDelete,
} from '../../models/ajv/auth';
import redisClient from '../../models/redis/redis';
import {
  authCheckMwComments,
  authCheckMwLike,
  authCheckMwUnlike,
  authCheckDeleteComments,
} from '../../middleware/authCheck/authCheck';
import logger from '../../logger/index';
import validateReg from '../../middleware/ajv-validation/validateRegDto';

const router = express.Router();

router.get(
  '/',
  (req, res, next) => {
    const isValid = ajvValidateGetComments(req.query); // url schema
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next) => {
    try {
      const { postId, page } = req.query;
      const s3 = new S3();
      const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
      const resultsPerPage = 1;
      const offsetComment = parseInt(page) * resultsPerPage;
      const limitComment = resultsPerPage;
      const getComments = async (id: number, offset: number, limit: number) => {
        const { rows } = await db.query(
          'SELECT * FROM comments WHERE FK_post_id = $1 ORDER BY date_created DESC LIMIT $2 OFFSET $3',
          [id, limit, offset],
        );
        return rows;
      };

      const result = await getComments(postId, offsetComment, limitComment); // will return 10 items;
      const commentData = result.map(async (obj) => {
        // get profile picture;

        const profileImg = await redisClient.v4.hGet(`user:${obj.fk_commenter_id}`, 'profile_img_src');
        const profileImgUrl = async () => {
          if (profileImg !== '""' && profileImg !== '') {
            const signedUrl = await s3.getSignedUrlPromise('getObject', {
              Bucket: bucketName,
              Key: `imageuploads/${profileImg}`,
              Expires: 60, // in seconds
            });
            return signedUrl;
          }
          return null;
        };

        const profileImage = await profileImgUrl();
        const checkCommentLike = async (commentId: any) => {
          if (req.user) {
            const isLikedExist = await db.query(
              `SELECT * from comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`,
              [commentId, Number(req.user.id)],
            );
            if (isLikedExist.rows[0]?.fk_comliker_id === Number(req.user.id)) {
              return true;
            }
            return false;
          }
          return false;
        };
        const checkCommentAuthor = async (commenterId: any) => {
          if (req.user) {
            const isAuthorExist = await db.query(
              `SELECT * from comments WHERE pk_comments_id=$1 AND fk_commenter_id=$2`,
              [commenterId, Number(req.user.id)],
            );
            if (isAuthorExist.rows[0]?.fk_commenter_id === Number(req.user.id)) {
              return true;
            }
            return false;
          }
          return false;
        };

        const isLike = await checkCommentLike(obj.pk_comments_id);
        const isAuthor = await checkCommentAuthor(obj.pk_comments_id);
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
      });
      if (parseInt(page) < 0) {
        return next(ApiError.internalError('Error'));
      }
      //  1000 is the maximum allowed page
      if (parseInt(page) > 1000) {
        return next(ApiError.internalError('Error'));
      }
      if (!commentData.length) {
        return res.status(200).json({ data: undefined });
      }
      return res.status(200).json({ data: await Promise.all(commentData) });
    } catch (e) {
      return next(ApiError.internalError('Error'));
    }
  },
);

router.post(
  '/',
  // check if login before commenting
  authCheckMwComments,
  validateReg(ajvValidateComments),
  async (req: any, res: any, next) => {
    const author = req.user.username;
    const userId = req.user.id;
    const likesCount = 0; // number type, initial likes value;
    const dislikesCount = 0; // number type, initial dislikes value;
    const { commentText, id } = req.body;

    const postToPostgres = async (
      authorName: string,
      text: string,
      user: string,
      postId: string,
      likes: number,
      dislikes: number,
    ) => {
      // return comment id for this comment
      // direct write to postgresql and direct read to postgresql
      // res.status(200).json({ data: commentId });
      try {
        // postId, req.user.id, comment_text, likesCount, dislikesCount
        await db.query('BEGIN');
        const commentId = await db.query(
          `INSERT INTO comments(fk_post_id,fk_commenter_id,author,comment_text,likes_count,dislikes_count) VALUES($1,$2,$3,$4,$5,$6) RETURNING pk_comments_id`,
          [postId, user, authorName, text, likes, dislikes],
        );
        await db.query('COMMIT');
        return [commentId, null];
      } catch (e) {
        await db.query('ROLLBACK');
        return [null, 'Failure'];
      }
    };
    const [commentId, failedCommentId] = await postToPostgres(
      author,
      commentText,
      userId,
      id,
      likesCount,
      dislikesCount,
    );
    const isQueryResult = (value: any): value is QueryResult<any> => {
      return value && typeof value.rows !== 'undefined';
    };
    if (isQueryResult(commentId)) {
      return res.status(200).json({ data: { commentId: commentId.rows[0].pk_comments_id, commentText } });
    }
    if (failedCommentId) {
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);

router.post(
  '/like',
  authCheckMwLike,
  (req, res, next) => {
    const isValid = ajvValidateCommentLike(req.body);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    const { commentId } = req.body;
    // check if post exists;
    // check if you really like
    const checkCommentLike = async (id: any) => {
      if (req.user) {
        const isLikedExist = await db.query(
          `SELECT * from comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`,
          [id, Number(req.user.id)],
        );
        if (isLikedExist.rows[0]?.fk_comliker_id === Number(req.user.id)) {
          return true;
        }
        return false;
      }
      return false;
    };
    const checkIfLike = await checkCommentLike(commentId);
    if (!checkIfLike) {
      const checkIfCommentExist = await db.query(`SELECT * FROM comments WHERE pk_comments_id = $1`, [commentId]);
      if (checkIfCommentExist.rows[0]?.pk_comments_id === commentId) {
        const likeToPg = async () => {
          try {
            await db.query('BEGIN');
            await db.query(`UPDATE comments SET likes_count=likes_count + 1 WHERE pk_comments_id = $1`, [commentId]);
            await db.query('INSERT INTO comment_likes(fk_comment_id,fk_comliker_id) VALUES($1,$2)', [
              commentId,
              Number(req.user.id),
            ]);
            await db.query('COMMIT');
            return ['Success', null];
          } catch (e) {
            await db.query('ROLLBACK');
            return [null, 'Error'];
          }
        };

        const [successLikePg, failureLikePg] = await likeToPg();
        if (successLikePg) {
          return res.status(200).json({ data: true });
        }
        if (failureLikePg) {
          return next(ApiError.internalError('Error'));
        }
        return next(ApiError.internalError('Error'));
      }
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);

router.post(
  '/unlike',
  authCheckMwUnlike,
  (req, res, next) => {
    const isValid = ajvValidateCommentLike(req.body);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    const { commentId } = req.body;
    const checkCommentLike = async (id: any) => {
      if (req.user) {
        const isLikedExist = await db.query(
          `SELECT * from comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`,
          [id, Number(req.user.id)],
        );
        if (isLikedExist.rows[0]?.fk_comliker_id === Number(req.user.id)) {
          return true;
        }
        return false;
      }
      return false;
    };
    const checkIfLike = await checkCommentLike(commentId);
    if (checkIfLike) {
      const checkIfCommentExist = await db.query(`SELECT * FROM comments WHERE pk_comments_id = $1`, [commentId]);
      if (checkIfCommentExist.rows[0]?.pk_comments_id === commentId) {
        const unlikePg = async () => {
          try {
            await db.query('BEGIN');
            await db.query(`UPDATE comments SET likes_count=likes_count - 1 WHERE pk_comments_id = $1`, [commentId]);
            await db.query(`Delete FROM comment_likes WHERE fk_comment_id=$1 AND fk_comliker_id=$2`, [
              commentId,
              Number(req.user.id),
            ]);
            await db.query('COMMIT');
            return ['Success', null];
          } catch (e) {
            return [null, 'Error'];
          }
        };
        const [successUnLikePg, failureUnLikePg] = await unlikePg();

        if (successUnLikePg) {
          return res.status(200).json({ data: true });
        }
        if (failureUnLikePg) {
          return next(ApiError.internalError('Error'));
        }
        return next(ApiError.internalError('Error'));
      }
      return next(ApiError.internalError('Error'));
    }
    return next(ApiError.internalError('Error'));
  },
);

router.post(
  '/delete',
  authCheckDeleteComments,
  (req, res, next) => {
    const isValid = ajvValidateCommentDelete(req.body);
    if (isValid) {
      return next();
    }
    return next(ApiError.internalError('Error')); // return no search result
  },
  async (req: any, res: any, next: any) => {
    // checkIfAuthor;
    // check if post exist on postgres
    const { commentId } = req.body; // commentId typeof number
    const deleteComments = async (id: number) => {
      try {
        await db.query(`DELETE FROM comments WHERE fk_commenter_id=$1 AND pk_comments_id=$2`, [
          Number(req.user.id),
          id,
        ]);
        return ['Success', null];
      } catch (e) {
        await db.query('ROLLBACK');
        return [null, 'Error'];
      }
    };
    const [deleteCommentSuccess, deleteCommentFailure] = await deleteComments(commentId);

    if (deleteCommentSuccess) {
      return res.status(200).json({ data: 'Success' });
    }
    if (deleteCommentFailure) {
      return res.status(200).json({ data: 'Failure' });
    }
    return next(ApiError.internalError('Error'));
  },
);

export default router;
