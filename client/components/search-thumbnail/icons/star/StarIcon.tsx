import React, { FC } from 'react';
import StarIcon from '@mui/icons-material/Star';
import styles from './StarIcon.module.scss';

export const Staricon: FC = () => {
  return (
    <div className={styles['star']}>
      <StarIcon className={styles['star__icon']} sx={{ 'fontSize': '0.9rem'}} />
    </div>
  );
};

export default Staricon;
