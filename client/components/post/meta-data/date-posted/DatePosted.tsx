import React, { FC } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "./DatePosted.module.scss";

export const DatePosted = ({ dateCreated }: any) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(customParseFormat);
  const tz = dayjs.tz.guess();
  const latestDate = dayjs(dateCreated).tz(tz).format("MMM DD, YYYY");
  return (
    <div className={styles["dateposted"]}>
      <span className={styles["dateposted__text"]}>{latestDate}</span>
    </div>
  );
};

export default DatePosted;
