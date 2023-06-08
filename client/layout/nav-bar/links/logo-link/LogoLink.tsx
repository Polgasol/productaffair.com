import React, { FC } from "react";
import styles from "./LogoLink.module.scss";

export const LogoLink: FC = () => {

  return (
    <div className={styles["logo"]}>

      <a href="https://www.productaffair.com" className={styles["logo__link"]} >
        Productaffair.com
      </a> 
    </div>
  );
};

export default LogoLink;
