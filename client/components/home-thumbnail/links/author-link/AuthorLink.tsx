import React, { FC } from "react";
import styles from "./AuthorLink.module.scss";

interface Author {
  author: string;
  id: string;
}
export const AuthorLink = ({ author, id }: Author) => {
  return (
    <div className={styles["author"]}>
      <span className={styles["author__link"]}>{author}</span>
    </div>
  );
};

export default AuthorLink;
