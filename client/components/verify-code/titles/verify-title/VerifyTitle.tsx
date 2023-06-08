import React, { FC } from 'react';
import styles from './VerifyTitle.module.scss';

const VerifyTitle: FC = () => {
  return (
    <div className={styles['verify-page-con']}>
      <div className={styles['verify-title-con']}>
        <span className={styles['verify-title-text']}>Verify Email</span>
      </div>
      <div className={styles['code-title-con']}>
        <span className={styles['code-title-text']}>Enter verification code sent to your e-mail</span>
      </div>
    </div>
  );
};

export default VerifyTitle;
