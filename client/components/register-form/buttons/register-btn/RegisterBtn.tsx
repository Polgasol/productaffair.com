import React, { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

import styles from "./RegisterBtn.module.scss";

interface Status {
  status: boolean;
}
const RegisterBtn = ({ status }: Status) => {
  return (
    <div className={styles["register-btn-con"]}>
      {status ? (
        <LoadingButton
          loading
          variant="contained"
          size="large"
          sx={{ fontSize: "typography.fontSize" }}
        >
          Continue
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ fontSize: "typography.fontSize" }}
        >
          Continue
        </Button>
      )}
    </div>
  );
};

export default RegisterBtn;
