import React, { FC } from "react";
import styles from "./SideBarLogoLink.module.scss";

export const SideBarLogoLink: FC = () => {
  return (
    <div className={styles["header"]}>
      <a href="https://productaffair.com" className={styles["header__link"]}>
        Productaffair.com
      </a>
    </div>
  );
};

export default SideBarLogoLink;
