import React, { FC } from 'react';
import styles from './UploaderLink.module.scss';

interface Author {
  author: string;
}
export const UploaderLink = ({ author }: Author) => {
  return (
      <div className={styles['author']}>
        <a className={styles['author__link']}>{author}</a>
      </div>
  );
};

export default UploaderLink;
