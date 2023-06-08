import React, { FC } from 'react';
import styles from './LoginTitle.module.scss';

const LoginTitle: FC = () => {
  return (
    <div className={styles['login-title-con']}>
      <span className={styles['login-title-text']}>Login</span>
    </div>
  );
};

export default LoginTitle;
