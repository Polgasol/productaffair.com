import React from 'react';
import styles from './LoginForm.module.scss';
import LoginField from './inputfields/login-field/LoginField';
import LoginTitle from './titles/login-title/LoginTitle';
import axios from 'axios';

const LoginForm = () => {
  return (
    <div className={styles['login-con']}>
      <LoginTitle />
      <LoginField />
    </div>
  );
};

export default LoginForm;
