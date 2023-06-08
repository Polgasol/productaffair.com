import React, { FC, useContext } from "react";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../../../hooks/hooks";
import styles from "./PostTitleLink.module.scss";

interface Title {
  postTitle: string;
  id: string;
}
export const PostTitleLink = ({ postTitle, id }: Title) => {
  const authData: any = useContext(AuthContext);
  const isVerified = authData?.auth?.verified;

  return (
    <div className={styles["post-title"]}>
      <p
        className={styles["post-title__link"]}
      >
        {postTitle} Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quidem inventore doloremque odit rerum, exercitationem incidunt est laboriosam dolorum itaque sit corrupti soluta ducimus labore nesciunt dolores suscipit nostrum nisi!
      </p>
    </div>
  );
};

export default PostTitleLink;
