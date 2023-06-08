import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import styles from "./PostTitleLink.module.scss";

interface Title {
  postTitle: string;
  id: string;
}
export const PostTitleLink = ({ postTitle, id }: Title) => {
  return (
    <div className={styles["video-title"]}>
      <a
        href={`http://localhost:3000/post/${id}`}
        className={styles["video-title__link"]}
      >
        {postTitle}
      </a>
    </div>
  );
};

export default PostTitleLink;
