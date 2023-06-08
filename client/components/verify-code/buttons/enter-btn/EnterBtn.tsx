import React from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import styles from "./EnterBtn.module.scss";

const EnterBtn = ({ isLoading }: any) => {
  return (
    <div className={styles["enter-btn-div"]}>
      {isLoading ? (
        <LoadingButton
          loading
          type="submit"
          variant="contained"
          size="small"
          sx={{ fontSize: "typography.fontSize" }}
        >
          Verify
        </LoadingButton>
      ) : (
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ fontSize: "typography.fontSize" }}
        >
          Verify
        </Button>
      )}
    </div>
  );
};

export default EnterBtn;
