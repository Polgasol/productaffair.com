import React, { FC } from 'react';
import styles from './ForgotTemplate.module.scss';
import ForgotForm from '../../forgot-form/ForgotForm';

const ForgotTemplate: FC = () => {
  return (
    <main className={styles['forgot-main']}>
      <ForgotForm />
    </main>
  );
};

export default ForgotTemplate;
