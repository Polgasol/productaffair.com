import React, { FC } from "react";
import styles from "./ViewsCount.module.scss";

interface ViewsCount {
  viewsCount: string;
}
export const ViewsCount = ({ viewsCount }: ViewsCount) => {
  const toNum: any = Number(viewsCount);
  const viewsFormat = (num: number) => {
    if (Math.abs(num) < 1000) return Math.sign(num) * num;
    if (Math.abs(num) > 9999 && Math.abs(num) < 1000000)
      return Math.sign(num) * Math.round(Math.abs(num) / 1000) + "K";
    if (Math.abs(num) > 999999 && Math.abs(num) < 1000000000)
      return Math.sign(num) * Math.round(Math.abs(num) / 1000000) + "M";
    if (Math.abs(num) > 999999999 && Math.abs(num) < 1000000000000)
      return Math.sign(num) * Math.round(Math.abs(num) / 1000000000) + "B";
    return Math.sign(num) * Math.round(Math.abs(num) / 1000000000000) + "T";
  };
  const result = viewsFormat(toNum);

  return (
    <div className={styles["views"]}>
      <span className={styles["views__text"]}>{result} Views</span>
    </div>
  );
};

export default ViewsCount;
