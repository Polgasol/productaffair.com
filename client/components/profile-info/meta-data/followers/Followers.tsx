import React from "react";
import styles from "../followers/Followers.module.scss";

interface Followers {
  followersCount: {
    followers: string;
  }
}
const Followers = ({ followersCount }: Followers) => {
  return (
    <div className={styles["followers"]}>
      <span className={styles["followers__text"]}>{followersCount.followers} Followers</span>
    </div>
  );
};

export default Followers;
