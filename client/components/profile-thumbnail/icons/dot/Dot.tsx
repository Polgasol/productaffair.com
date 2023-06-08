import React from "react";
import styles from "../dot/Dot.module.scss";

const Dot = () => {
  return (
    <div className={styles["dot"]}>
      <span className={styles["dot__icon"]}>•</span>
    </div>
  );
};

export default Dot;
