import React, { FC } from 'react';
import styles from './CommenterLink.module.scss';

type commenter = {
  username: string;
};
const CommenterLink = ({ username }: commenter) => {
  return (
    <div className={styles['comment-name']}>
      <a href="http://localhost:8080" className={styles['comment-name__link']}>
        <span className={styles['comment-name__text']}>@{username}</span>
      </a>
    </div>
  );
};

export default CommenterLink;
