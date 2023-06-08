import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import styles from "./VideoTitleLink.module.scss";

interface Title {
  videotitle: string;
}
export const VideoTitleLink = ({ videotitle }: Title) => {
  return (
    <div className={styles["video-title"]}>
      <a href="http://localhost:8080" className={styles["video-title__link"]}>
        {videotitle}
      </a>
    </div>
  );
};

export default VideoTitleLink;
