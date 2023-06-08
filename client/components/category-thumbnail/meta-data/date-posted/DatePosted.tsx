import React from 'react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from './DatePosted.module.scss';

interface Date {
  datecreated: string;
}
export const DatePosted = ({ datecreated }: Date) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(customParseFormat);
    const tz = dayjs.tz.guess();
    const latestDate = dayjs(datecreated).tz(tz).format("MMM DD, YYYY");

  return (
    <div className={styles['date']}>
      <span className={styles["date__text"]}>{latestDate}</span>
    </div>
  );
};

export default DatePosted;
