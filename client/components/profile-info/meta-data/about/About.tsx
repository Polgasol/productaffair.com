import React from "react";
import styles from "../about/About.module.scss";

interface About {
  about: {
    about: string;
  };
}
const About = ({ about }: About) => {
  return (
    <div className={styles["about"]}>
      {about.about === '""' ? (
        <></>
      ) : (
        <span className={styles["about__text"]}>{about.about}</span>
      )}
    </div>
  );
};

export default About;
