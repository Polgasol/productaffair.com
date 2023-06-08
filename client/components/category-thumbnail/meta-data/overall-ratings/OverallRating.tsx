import React from 'react';
import styles from './OverallRating.module.scss';

interface OverallRating {
  overallrating: string
}
export const OverallRating = ({ overallrating }: OverallRating) => {
  const toFloat = parseFloat(overallrating).toFixed(1);
  return (
    <div className={styles['rating']}>
      <span className={styles["rating__text"]}>{toFloat}</span>
    </div>
  );
};

export default OverallRating;
