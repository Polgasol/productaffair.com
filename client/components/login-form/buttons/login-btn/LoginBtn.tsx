import React, { FC } from 'react';
import { Button } from '@mui/material';
import styles from './LoginBtn.module.scss';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

const LoginBtn = ({ isLoading }: any) => {
  return (
    <div className={styles["login-con"]}>
      <div className={styles["login-btn-con"]}>
        {isLoading ? (
          <LoadingButton
            loading
            type="submit"
            variant="contained"
            size="large"
            sx={{
              fontSize: "typography.fontSize",
              backgroundColor: "var(--blue)",
              color: "var(--white)",
            }}
          >
            LOGIN
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              fontSize: "typography.fontSize",
              backgroundColor: "var(--blue)",
              color: "var(--white)",
            }}
          >
            LOGIN
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginBtn;
