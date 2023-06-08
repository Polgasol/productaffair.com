import React from "react";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import styles from "./RegisterBtn.module.scss";
import { useMutation } from "@tanstack/react-query";

const RegisterBtn = () => {
  const router = useRouter();
  const register = async () => {
    router.push("/register");
  };
  return (
    <div className={styles["register-con"]}>
      <Button
      variant="outlined"
        sx={{
          width: "100%",
          border: "2px solid",
          color: "var(--blue)",
        }}
        type="button"
        onClick={register}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterBtn;
