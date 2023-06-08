import React, { FC } from 'react';
import styles from './VerifyField.module.scss';

const VerifyField: FC = () => {
  return (
    <form className={styles['verify-input-form']}>
      <div className={styles['verify-input-con']}>
        <div className={styles['verify-code-con']}>
          <input type="text" placeholder="Verify Code" />
        </div>
      </div>
    </form>
  );
};

export default VerifyField;
