import React, { FC } from 'react';
import styles from './ForgotTitle.module.scss';

const ForgotTitle: FC = () => {
  return (
    <div className={styles['forgot-title-con']}>
      <span className={styles['forgot-title-text']}>Forgot Password?</span>
    </div>
  );
};

export default ForgotTitle;
