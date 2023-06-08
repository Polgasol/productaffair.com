import React, { FC } from 'react';
import styles from './UploaderLink.module.scss';

interface Author {
  author: string;
}
export const UploaderLink = ({ author }: Author) => {
  return (
      <div className={styles['author']}>
        <p className={styles['author__link']}>{author}</p>
      </div>
  );
};

export default UploaderLink;
