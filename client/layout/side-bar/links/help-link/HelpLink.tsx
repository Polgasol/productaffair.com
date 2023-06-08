import React, { FC } from 'react';
import { ListItemButton } from '@mui/material';
import styles from './HelpLink.module.scss';

export const HelpLink: FC = () => {
  return (
    <ListItemButton>
      <div className={styles['help']}>
        <a className={styles['help__link']}>Help</a>
      </div>
    </ListItemButton>
  );
};

export default HelpLink;
