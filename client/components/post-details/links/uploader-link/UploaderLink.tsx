import React, { FC } from 'react';
import { string } from 'yup';
import styles from './UploaderLink.module.scss';

interface Values {
  values: {
    author?: string;
    user_id?: string;
  };
}
export const UploaderLink = ({ values }: Values) => {
  const author = values.author;
  const id = values.user_id;
  return (
    <div className={styles["uploader"]}>
      <a
        href={`https://www.productaffair.com/profile/${id}`}
        className={styles["uploader__link"]}
      >
        <span className={styles["uploader__text"]}>{author}</span>
      </a>
    </div>
  );
};

export default UploaderLink;
