import React, { FC } from "react";
import styles from "./UploaderLink.module.scss";

interface Author {
  author: string;
  id: string;
}
export const UploaderLink = ({ author, id }: Author) => {
  return (
    <div className={styles["author"]}>
      <p className={styles["author__link"]}>{author}</p>
    </div>
  );
};

export default UploaderLink;
