import React, { FC, useContext } from "react";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../../../hooks/hooks";
import styles from "./PostTitleLink.module.scss";

interface Title {
  postTitle: string;
  id: string;
}
export const PostTitleLink = ({ postTitle, id }: Title) => {

  return (
    <div className={styles["post-title"]}>
      <p
        className={styles["post-title__link"]}
      >
        {postTitle}
      </p>
    </div>
  );
};

export default PostTitleLink;
