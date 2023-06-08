import React, { FC } from 'react';
import styles from './CopyrightTitle.module.scss';

export const CopyrightTitle: FC = () => {
  return (
    <div className={styles['copyrights']}>
      <span className={styles['copyrights__text']}>Copyright © Productaffair.com All Rights Reserved.</span>
    </div>
  );
};

export default CopyrightTitle;
