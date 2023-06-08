import React, { FC } from 'react';
import styles from './ReadMoreBtn.module.scss';

const ReadMoreBtn: FC = () => {
  return (
    <div className={styles['readmore-btn']}>
      <button type="button" className={styles['readmore-btn__btn']}>
        show more
      </button>
    </div>
  );
};

export default ReadMoreBtn;
