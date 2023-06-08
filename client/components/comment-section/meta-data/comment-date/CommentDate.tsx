import React, { FC } from 'react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from './CommentDate.module.scss';

type dateCreation = {
  dateCreated: string;
}
const CommentDate = ({ dateCreated }: dateCreation) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(customParseFormat);
    const tz = dayjs.tz.guess();
    const latestDate = dayjs(dateCreated).tz(tz).format("MMM DD, YYYY");
  return (
    <div className={styles['comment-date']}>
      <span className={styles['comment-date__text']}>{latestDate}</span>
    </div>
  );
};

export default CommentDate;
