import React, { FC } from 'react';
import styles from './DotIcon.module.scss';

export const DotIcon: FC = React.memo(() => {
  return (
    <div className={styles['dot']}>
      <span className={styles["dot__icon"]}>•</span>
    </div>
  );
})

export default DotIcon;
