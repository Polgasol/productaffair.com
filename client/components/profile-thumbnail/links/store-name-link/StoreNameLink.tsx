import React from "react";
import style from '../store-name-link/StoreNameLink.module.scss';

const StoreNameLink = ({ storeName }: any) => {
  return (
    <div className={style["storeName"]}>
      <span className={style["storeName__text"]}>{storeName}</span>
    </div>
  );
};

export default StoreNameLink;
