import React from "react";
import Image from "next/image";
import styles from "../profile-pic/ProfilePic.module.scss";

interface ProfilePic {
  profilePic: {
    profileImage: string;
  };
}

const ProfilePic = ({ profilePic }: ProfilePic) => {
  return profilePic.profileImage === undefined ? (
    <div className={styles["profile"]}>
      <div className={styles["profile__tile"]}></div>
    </div>
  ) : (
    <div className={styles["profile"]}>
      <div className={styles["profile__tile"]}>
        <img
          src={profilePic.profileImage}
          width={500}
          height={500}
          className={styles["profile__image"]}
        />
      </div>
    </div>
  );
};

export default ProfilePic;
