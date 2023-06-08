import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import styles from "./PostTitleLink.module.scss";

interface Title {
  postTitle: string;
}
export const PostTitleLink = ({ postTitle }: Title) => {

  return (
    <div className={styles["post-title"]}>
      <p className={styles["post-title__link"]}>
        {postTitle}
      </p>
    </div>
  );
};

export default PostTitleLink;
