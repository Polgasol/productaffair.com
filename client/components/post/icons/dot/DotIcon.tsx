import React, { FC } from 'react';
import styles from './DotIcon.module.scss';

export const DotIcon: FC = () => {
  return <span className={styles['dot-icon']}>•</span>;
};

export default DotIcon;
