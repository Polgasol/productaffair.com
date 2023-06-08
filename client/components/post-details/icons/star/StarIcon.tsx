import React, { FC } from "react";
import StarIcon from "@mui/icons-material/Star";
import styles from "./StarIcon.module.scss";

interface IProps {
  starStyle: string;
}

export const Staricon = () => {
  return (
    <div className={styles["star"]}>
      <StarIcon className={styles["star__icon"]} sx={{ fontSize: "1rem" }} />
    </div>
  );
};

export default Staricon;
