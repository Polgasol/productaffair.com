import React, { FC } from 'react';
import styles from './ForgotField.module.scss';

const ForgotField: FC = () => {
  return (
    <form className={styles['forgot-input-form']}>
      <div className={styles['forgot-input-con']}>
        <div className={styles['enter-email-con']}>
          <input type="text" placeholder="Enter your email" />
        </div>
      </div>
    </form>
  );
};

export default ForgotField;
