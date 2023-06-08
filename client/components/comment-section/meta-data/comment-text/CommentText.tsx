import React, { FC } from 'react';
import styles from './CommentText.module.scss';

type commentText = {
  comment: string;
}
const CommentText = ({ comment }: commentText) => {
  return (
    <div className={styles["comment"]}>
      <span className={styles["comment__text"]}>
        {comment}
      </span>
    </div>
  );
};

export default CommentText;
