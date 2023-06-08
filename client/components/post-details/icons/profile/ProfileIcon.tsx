import React from "react";
import Image from "next/image";
import styles from "../profile/ProfileIcon.module.scss";
import test from "../../../../assets/equal.jpg";

interface ProfileImg {
  profileImg: {
    profileImg?: string;
  };
}
const ProfileIcon = ({ profileImg }: ProfileImg) => {
  return (
    <div className={styles["account-icon"]}>
      {profileImg.profileImg === undefined ? (
        <div className={styles["tile"]}></div>
      ) : (
        <div className={styles["tile"]}>
          <img
            className={styles["tile__image"]}
            src={profileImg.profileImg}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
