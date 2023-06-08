import React, { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "./DateCreated.module.scss";

interface Date {
  dateCreated: string;
}
export const DateCreated = ({ dateCreated }: Date) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(customParseFormat);
  const tz = dayjs.tz.guess();
  const latestDate = dayjs(dateCreated).tz(tz).format("MMM DD, YYYY");

  return (
    <div className={styles["date"]}>
      <span className={styles["date__text"]}>{latestDate}</span>
    </div>
  );
}

export default DateCreated;
