import React, { FC } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import styles from "./CategoriesTitle.module.scss";

export const CategoriesTitle: FC = () => {
  return (
    <div className={styles["title"]}>
      <span className={styles["title__title"]}>Categories</span>
    </div>
  );
};

export default CategoriesTitle;
