import React from "react";
import styles from "./Ratings.module.scss";

interface OverallRating {
  overallRating: string;
}
export const Ratings = ({ overallRating }: OverallRating) => {
  const overall = parseFloat(overallRating).toFixed(1);
  return (
    <div className={styles["rating"]}>
      <span className={styles["rating__text"]}>{overall}</span>
    </div>
  );
};

export default Ratings;
