import React, { FC } from 'react';
import styles from './SeeMoreBtn.module.scss';

const SeeMoreBtn: FC = () => {
  return (
    <div className={styles['see-more']}>
      <button type="button" className={styles['see-more__btn']}>
        more comments
      </button>
    </div>
  );
};

export default SeeMoreBtn;
