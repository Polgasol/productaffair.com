import React, { FC } from 'react';
import styles from './SettingsLink.module.scss';

export const SettingsLink: FC = () => {
  return (
    <div className={styles["settings-link-con"]}>
      <a
        href="https://www.productaffair.com"
        className={styles["settings-link"]}
      >
        Settings
      </a>
    </div>
  );
};

export default SettingsLink;
