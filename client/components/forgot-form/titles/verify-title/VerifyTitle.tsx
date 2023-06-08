import React, { FC } from 'react';
import styles from './VerifyTitle.module.scss';

const VerifyTitle: FC = () => {
  return (
    <div className={styles['verify-code-con']}>
      <span className={styles['verify-code-text']}>Enter Code</span>
    </div>
  );
};

export default VerifyTitle;
