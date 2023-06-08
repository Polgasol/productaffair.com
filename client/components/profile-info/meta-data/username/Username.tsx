import React from 'react'
import styles from '../username/Username.module.scss';
interface Username {
  username: {
    username: string;
  };
}
const Username = ({ username }: Username) => {
  const userName = username.username;
  return (
    <div className={styles["username"]}>
      <span className={styles["username__text"]}>{userName}</span>
    </div>
  );
};

export default Username