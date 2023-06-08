import React, { FC } from 'react';
import styles from './RegisterForm.module.scss';
import RegisterTitle from './titles/register-title/RegisterTitle';
import RegisterField from './inputfields/register-field/RegisterField';
import { useQuery } from '@tanstack/react-query';

const RegisterForm: FC = () => {
  return (
    <div className={styles['register-con']}>
      <RegisterTitle />
      <RegisterField />
    </div>
  );
};

export default RegisterForm;
