import React, { FC } from 'react';
import styles from './SendCode.module.scss';

const SendCode: FC = () => {
  return (
    <div className={styles['send-con']}>
      <button type="submit" className={styles['send-code-btn']}>
        Send Code
      </button>
    </div>
  );
};

export default SendCode;
