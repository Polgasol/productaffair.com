import React, { FC } from 'react';
import styles from './ByLabel.module.scss';

export const ByLabel: FC = () => {
  return (
    <div className={styles['by']}>
      <span className={styles['by__label']}>by</span>
    </div>
  );
};

export default ByLabel;
