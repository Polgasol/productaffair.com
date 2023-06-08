import React, { FC } from 'react';
import styles from './ForgotForm.module.scss';
import SendCode from './buttons/send-code/SendCode';
import ForgotField from './inputfields/forgot-field/ForgotField';
import VerifyField from './inputfields/verify-field/VerifyField';
import ForgotTitle from './titles/forgot-title/ForgotTitle';
import VerifyTitle from './titles/verify-title/VerifyTitle';

const ForgotForm: FC = () => {
  return (
    <div className={styles['forgot-con']}>
      <ForgotTitle />
      <ForgotField />
      <SendCode />
      <VerifyTitle />
      <VerifyField />
    </div>
  );
};

export default ForgotForm;
