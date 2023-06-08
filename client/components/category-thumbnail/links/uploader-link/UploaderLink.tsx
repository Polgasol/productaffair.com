import React, { FC } from "react";
import styles from "./UploaderLink.module.scss";

interface Author {
  author: string;
  id: string;
}
export const UploaderLink = ({ author, id }: Author) => {
  return (
    <div className={styles["author"]}>
      <span className={styles["author__link"]}>{author}</span>
    </div>
  );
};

export default UploaderLink;
