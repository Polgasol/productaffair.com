import React, { FC } from 'react';
import styles from './OverallLabel.module.scss';

export const OverallLabel: FC = () => {
  return (
    <div className={styles['overall']}>
      <span className={styles['overall__label']}>Overall:</span>
    </div>
  );
};

export default OverallLabel;
