import React, { FC } from 'react';
import styles from './LoginLink.module.scss';

const LoginLink: FC = () => {
  return (
    <div className={styles["login"]}>
      <a
        href="https://www.productaffair.com/login"
        className={styles["login__link"]}
      >
        Login
      </a>
    </div>
  );
};

export default LoginLink;
