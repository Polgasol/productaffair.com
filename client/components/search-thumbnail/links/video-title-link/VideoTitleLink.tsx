import React, { FC, useContext } from "react";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../../../hooks/hooks";
import styles from "./VideoTitleLink.module.scss";

interface Title {
  videotitle: string;
  id: string;
}
export const VideoTitleLink = ({ videotitle, id }: Title) => {
  const authData: any = useContext(AuthContext);
  const isVerified = authData?.auth?.verified;
  return (
    <div className={styles["video-title"]}>
      {isVerified ? (
        <a
          href={`http://localhost:3000/post/${id}`}
          className={styles["video-title__link"]}
        >
          {videotitle}
        </a>
      ) : (
        <a
          href={`http://localhost:3000/login`}
          className={styles["video-title__link"]}
        >
          {videotitle}
        </a>
      )}
    </div>
  );
};

export default VideoTitleLink;
