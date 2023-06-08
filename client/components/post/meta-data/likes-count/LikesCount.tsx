import React, { FC } from "react";
import styles from "./LikesCount.module.scss";

export const LikesCount = ({ likesCount }: any) => {
  const toNum: number = Number(likesCount);
  const likesFormat = (num: number) => {
    if (Math.abs(num) < 1000) return Math.sign(num) * num;
    if (Math.abs(num) > 999 && Math.abs(num) < 1000000)
      return Math.sign(num) * Math.round(Math.abs(num) / 1000) + "K";
    if (Math.abs(num) > 999999 && Math.abs(num) < 1000000000)
      return Math.sign(num) * Math.round(Math.abs(num) / 1000000) + "M";
    if (Math.abs(num) > 999999999 && Math.abs(num) < 1000000000000)
      return Math.sign(num) * Math.round(Math.abs(num) / 1000000000) + "B";

    return Math.sign(num) * Math.round(Math.abs(num) / 1000000000000) + "T";
  };
  const result = likesFormat(toNum);
  return (
    <div className={styles["likes-count"]}>
      <span className={styles["likes-count__text"]}>{result} Likes</span>
    </div>
  );
};

export default LikesCount;
