import React, { FC } from 'react';
import StarIcon from '@mui/icons-material/Star';
import styles from './StarIcon.module.scss';

export const Staricon: FC = React.memo(() => {
  return (
    <div className={styles['star']}>
      <StarIcon className={styles['star__icon']} sx={{ 'fontSize': '1rem'}} />
    </div>
  );
})

export default Staricon;
