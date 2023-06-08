import React, { FC } from "react";
import styles from "./CommentBtn.module.scss";
import { Button, CircularProgress } from "@mui/material";
import { LoadingButton } from '@mui/lab';

type CommentButton = {
  commentBtn: boolean;
  isLoading: boolean;
};
export const CommentBtn = ({ commentBtn, isLoading }: CommentButton) => {
  return (
    <div className={styles["comment-btn"]}>
      {commentBtn ? (
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          className={styles["comment-btn__btn"]}
          sx={{ borderRadius: "0" }}
          
        >
          {isLoading ? (
            <CircularProgress
              className={styles["comment-btn__loading-btn"]}
              size={24}
              sx={{ color: "var(--meta-data)" }}
            />
          ) : (
            "Comment"
          )}
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          className={styles["comment-btn__disabled-btn"]}
          disabled
          sx={{ borderRadius: "0" }}
        >
          Comment
        </Button>
      )}
    </div>
  );
};

export default CommentBtn;
