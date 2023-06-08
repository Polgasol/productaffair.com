import React, { FC } from 'react';
import styles from './RegisterTitle.module.scss';

const RegisterTitle: FC = () => {
  return (
    <div className={styles['register-title-con']}>
      <span className={styles['register-title-text']}>Register</span>
    </div>
  );
};

export default RegisterTitle;
