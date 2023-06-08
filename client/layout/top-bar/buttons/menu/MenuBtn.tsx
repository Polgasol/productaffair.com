import React, { FC } from 'react';
import styles from './MenuBtn.module.scss';
// import ShowSidebarContext from '../../../side-bar/SideBar';

const MenuBtn: FC = () => {
  // const { setSidebar } = useContext(ShowSidebarContext);
  // const openMenu = (): void => {
  //   setSidebar(true);
  // };
  return (
    <div className={styles['menu-btn']}>
      <button type="button" className={styles['menu-btn__btn']}>
        Menu
      </button>
    </div>
  );
};

export default MenuBtn;
