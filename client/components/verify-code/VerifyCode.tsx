import React, { FC } from "react";
import VerifyTitle from "./titles/verify-title/VerifyTitle";
import VerifyCodeField from "./input-fields/verify-code-field/VerifyCodeField";
import styles from "./VerifyCode.module.scss";
import { useQuery } from "@tanstack/react-query";
import NewCodeBtn from "./buttons/new-code-btn/NewCodeBtn";

const VerifyCode: FC = () => {
  return (
    <div className={styles["verify-div"]}>
      <VerifyTitle />
      {/* <div className={styles["verify-resend-con"]}>
        <NewCodeBtn />
      </div> */}
      <div className={styles["verify-input-div"]}>
        <VerifyCodeField />
      </div>
    </div>
  );
};

export default VerifyCode;
