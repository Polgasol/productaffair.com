import React, { FC, useState } from "react";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { Alert } from "@mui/material";
import LoginBtn from "../../buttons/login-btn/LoginBtn";
import { useRouter } from "next/router";
import styles from "./LoginField.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin } from "../../../../api/login";
import RegisterBtn from "../../buttons/login-btn/register-btn/RegisterBtn";

type loginType = {
  username: string;
  password: string;
};

const schema: SchemaOf<loginType> = yup
  .object()
  .shape({
    username: yup
      .string()
      .matches(
        /^(?=.{1,100}$)(?:[0-9a-zA-Zd]+(?:[_][0-9a-zA-Zd])*)+$/,
        "Invalid"
      )
      .min(1)
      .max(100)
      .required()
      .defined(),
    password: yup
      .string()
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$/,
        "Invalid"
      )
      .min(8)
      .max(64)
      .required("Invalid")
      .defined(),
  })
  .defined();

const LoginField: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, data, reset, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (data: FieldValues) => {
      return postLogin(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      setErrorLogin(true);
    },
  });
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  if (isSuccess) {
    if (data.verified === true && data.type === "local") {
      router.push("/");
    }
    router.push("/login");
  }
  const [errorLogin, setErrorLogin] = useState(false);
  const login = handleSubmit(
    (values) => {
      mutate(values);
    },
    (err) => {
      setErrorLogin(true);
    }
  );
  return (
    <form
      className={styles["login-input-form"]}
      onSubmit={login}
      autoComplete="off"
      role="presentation"
    >
      <div className={styles["login-input-con"]}>
        <div className={styles["username-con"]}>
          <input
            className={styles["username-input"]}
            type="text"
            {...register("username")}
            autoComplete="off"
            role="presentation"
            placeholder="Username"
          />
        </div>
        <div className={styles["password-con"]}>
          <input
            className={styles["password-input"]}
            type="password"
            {...register("password")}
            autoComplete="off"
            role="presentation"
            placeholder="Password"
          />
        </div>
      </div>
      <div className={styles["error-con"]}>
        {errorLogin && (
          <Alert severity="error">
            <strong>Invalid username or password</strong>
          </Alert>
        )}
      </div>
      <div className={styles["btn-con"]}>
        {isLoading ? <LoginBtn isLoading={isLoading}/> : <LoginBtn />}
        <RegisterBtn />
      </div>
    </form>
  );
};

export default LoginField;
