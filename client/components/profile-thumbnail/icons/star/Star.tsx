import React from 'react'
import StarIcon from "@mui/icons-material/Star";
import styles from '../star/Star.module.scss';

const Star = () => {
  return (
    <div className={styles["star"]}>
      <StarIcon className={styles["star__icon"]} sx={{ fontSize: "1rem" }} />
    </div>
  );
}

export default Star