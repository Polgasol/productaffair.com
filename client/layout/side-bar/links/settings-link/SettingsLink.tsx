import React, { FC } from 'react';
import { ListItemButton } from '@mui/material';
import styles from './SettingsLink.module.scss';

export const SettingsLink: FC = () => {
  return (
    <ListItemButton>
      <div className={styles['settings']}>
        <a className={styles['settings__link']}>Settings</a>
      </div>
    </ListItemButton>
  );
};

export default SettingsLink;
