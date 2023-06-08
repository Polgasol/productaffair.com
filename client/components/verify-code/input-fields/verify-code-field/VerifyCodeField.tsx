import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import styles from "./VerifyCodeField.module.scss";
import EnterBtn from "../../buttons/enter-btn/EnterBtn";
import NewCodeBtn from "../../buttons/new-code-btn/NewCodeBtn";
import { AlertTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVerify } from "../../../../api/verify";
import VerifyAlert from "../../alerts/VerifyAlert";

type VerifyCode = {
  verificationCode: number;
};

const schema: SchemaOf<VerifyCode> = yup
  .object()
  .shape({
    verificationCode: yup
      .string()
      .min(1)
      .max(8, "You have reached maximum number of characters")
      .required()
      .typeError("Please enter a valid code"),
  })
  .defined();

const VerifyCodeField = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); // connection between yup and react-hoo-form

  const [errorAlert, setErrorAlert] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, data, reset, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (data: FieldValues) => {
      return postVerify(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
  const onSubmit = handleSubmit(
    (values) => {
      mutate(values);
    },
    (err) => {
      return setErrorAlert(true); // session expired or whatever.
    }
  );
    if (isSuccess) {
      if (data.auth.verified === true && data.auth.type === "local") {
        router.push("/");
      }
      router.push("/login");
    }
  return (
    <form className={styles["verify-code-form"]} onSubmit={onSubmit}>
      <div className={styles["verify-input-con"]}>
        <input
          className={styles["verify-input"]}
          type="text"
          {...register("verificationCode")}
          onChange={(e) => {
            reset();
            clearErrors("verificationCode");
            setErrorAlert(false);
          }}
          autoComplete="off"
          placeholder="Enter verification code"
        />
        <div className={styles["enter-btn-div"]}>
          <EnterBtn post={isLoading} />
        </div>
      </div>
      {/* <div className={styles["new-code-div"]}>
        <a className={styles["resend-code-link"]}>resend code</a>
      </div> */}
      <div>
        <div className={styles["verify-error-con"]}>
          {isError && !errorAlert ? (
            <Alert severity="error">
              <AlertTitle>Something went wrong.</AlertTitle>
            </Alert>
          ) : (
            <div />
          )}
          {errorAlert ? (
            <Alert severity="error">
              <AlertTitle>
                Sorry, there was a problem with your request.
              </AlertTitle>
            </Alert>
          ) : (
            <div />
          )}
          {errors ? <VerifyAlert errors={errors} /> : <div />}
        </div>
      </div>
    </form>
  );
};

export default VerifyCodeField;
