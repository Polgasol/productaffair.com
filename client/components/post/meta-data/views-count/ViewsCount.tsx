import React, { FC } from 'react';
import styles from './ViewsCount.module.scss';

export const ViewsCount = ({ viewsCount }: any) => {
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
    <div className={styles['views-count']}>
      <span className={styles['views-count__text']}>{result} Views</span>
    </div>
  );
};

export default ViewsCount;
