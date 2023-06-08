import React, { FC } from "react";
import styles from "./PostTitle.module.scss";

interface Title {
  postTitle: string;
}
export const PostTitle = ({ postTitle }: Title) => {
  return (
    <div className={styles["post-title"]}>
      <h3 className={styles["post-title__text"]}>{postTitle}</h3>
    </div>
  );
};

export default PostTitle;
