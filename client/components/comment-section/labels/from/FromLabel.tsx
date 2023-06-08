import React, { FC } from 'react';
import styles from './FromLabel.module.scss';

export const FromLabel: FC = () => {
  return (
    <div className={styles['from']}>
      <span className={styles['from__label']}>from</span>
    </div>
  );
};

export default FromLabel;
