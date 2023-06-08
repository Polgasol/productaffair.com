import React, { FC } from 'react';
import styles from './StoreName.module.scss';

interface StoreName {
  storeName: string;
}
export const StoreName = ({ storeName }: StoreName) => {
  return (
    <div className={styles['store']}>
      <span className={styles['store__text']}>
        {storeName}
      </span>
    </div>
  );
};

export default StoreName;
