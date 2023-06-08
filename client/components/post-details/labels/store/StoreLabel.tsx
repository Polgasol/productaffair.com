import React, { FC } from 'react';
import styles from './StoreLabel.module.scss';

export const StoreLabel: FC = () => {
  return (
    <div className={styles['store']}>
      <span className={styles['store__label']}>Store:</span>
    </div>
  );
};

export default StoreLabel;
