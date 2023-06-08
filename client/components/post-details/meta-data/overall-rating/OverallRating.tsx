import React, { FC } from 'react';
import styles from './OverallRating.module.scss';

interface Overall {
  overallRating: string;
}
export const OverallRating = ({ overallRating }: Overall) => {
    const overall = parseFloat(overallRating).toFixed(1);
  return (
    <div className={styles['overall']}>
      <span className={styles['overall__text']}>{overall}</span>
    </div>
  );
};

export default OverallRating;
