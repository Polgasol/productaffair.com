import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import RegisterBtn from "../../buttons/register-btn/RegisterBtn";
import styles from "./RegisterField.module.scss";
import { postRegister } from "../../../../api/register";
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import RegisterErrorAlert from "../../alerts/RegisterErrorAlert";
import DotIcon from "../../../home-thumbnail/icons/dot/DotIcon";

type Submit = {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  username: string;
  createPassword: string;
  confirmPassword: string;
};
const schema: SchemaOf<Submit> = yup
  .object()
  .shape({
    // kelangan may schema of
    firstname: yup
      .string()
      .matches(/(?=^.{1,100}$)[^s][a-zA-Zs]+[^s]$/, "Firstname is invalid")
      .min(1, "Firstname is required")
      .max(100, "You have reached maximum number of characters")
      .required("Firstname is invalid"),
    lastname: yup
      .string()
      .matches(/(?=^.{1,100}$)[^s][a-zA-Zs]+[^s]$/, "Lastname is invalid")
      .min(1, "Lastname is required")
      .max(100, "You have reached maximum number of characters")
      .required("Lastname is invalid"),
    age: yup
      .number()
      .positive()
      .integer()
      .min(13, "Age is required and must be 13 or older")
      .max(150, "Invalid age")
      .required("Age is required")
      .typeError("Age is invalid"), // sa number typeError nagana
    email: yup
      .string()
      .matches(
        /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,500})$/,
        "Email is invalid"
      )
      .email()
      .min(3, "Email is required")
      .max(500, "You have reached maximum number of characters")
      .required("Email is required"),
    username: yup
      .string()
      .matches(
        /^(?=.{1,100}$)(?:[0-9a-zA-Zd]+(?:[_][0-9a-zA-Zd])*)+$/,
        "Username is invalid"
      )
      .min(1, "Username is required")
      .max(120, "You have reached maximum number of characters")
      .required("Username is required"),
    createPassword: yup
      .string()
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$/,
        "Password No spaces allowed, Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .min(8, "Password is required")
      .max(64, "You have reached maximum number of characters") // bcrypt max length 72 bytes = 72 char
      .required(
        "Password No spaces allowed, Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .typeError(
        "Password No spaces allowed, Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("createPassword"), null])
      .required("Confirm password is required")
      .typeError("Password not match"),
  })
  .defined();

const RegisterField: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, data, reset, isLoading, isError }: any = useMutation({
    mutationFn: (data: FieldValues) => {
      return postRegister(data);
    },
    onSuccess: (data) => {
      if (data.verified === false && data.type === "local") {
        router.push("/verify");
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
      router.push("/");
    },
    onError: () => {
      setErrorAlert(true);
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
  const [errorAlert, setErrorAlert] = useState(false);
  const onSubmit = handleSubmit(
    (values) => {
      mutate(values);
    },
    (err: any) => console.log(err)
  );
  return (
    <form
      className={styles["register-input-form"]}
      onSubmit={onSubmit}
      role="presentation"
      autoComplete="off"
    >
      <div className={styles["name-con"]}>
        <div className={styles["first-input-con"]}>
          <input
            className={styles["firstname-input"]}
            type="text"
            {...register("firstname")}
            autoComplete="off"
            role="presentation"
            placeholder="Firstname"
          />
        </div>
        <div className={styles["last-input-con"]}>
          <input
            className={styles["lastname-input"]}
            type="text"
            {...register("lastname")}
            role="presentation"
            autoComplete="off"
            placeholder="Lastname"
          />
        </div>
      </div>
      <div className={styles["register-input-fields"]}>
        <div className={styles["email-con"]}>
          <div className={styles["email-input-con"]}>
            <input
              className={styles["email-input"]}
              type="text"
              {...register("email")}
              autoComplete="off"
              role="presentation"
              placeholder="Email"
            />
          </div>
        </div>
        <div className={styles["age-username-con"]}>
          <div className={styles["username-con"]}>
            <div className={styles["username-input-con"]}>
              <input
                className={styles["username-input"]}
                type="text"
                {...register("username")}
                autoComplete="off"
                role="presentation"
                placeholder="Username"
              />
            </div>
          </div>
          <div className={styles["age-con"]}>
            <div className={styles["age-input-con"]}>
              <input
                className={styles["age-input"]}
                type="text"
                {...register("age")}
                autoComplete="off"
                role="presentation"
                placeholder="Age"
              />
            </div>
          </div>
        </div>
        <div className={styles["createpass-con"]}>
          <div className={styles["createpass-input-con"]}>
            <input
              className={styles["createpass-input"]}
              type="password"
              {...register("createPassword")}
              autoComplete="off"
              role="presentation"
              placeholder="Create Password"
            />
          </div>
        </div>
        <div className={styles["confirmpass-con"]}>
          <div className={styles["confirmpass-input-con"]}>
            <input
              className={styles["confirmpass-input"]}
              type="password"
              {...register("confirmPassword")}
              autoComplete="off"
              role="presentation"
              placeholder="Confirm Password"
            />
          </div>
          <div className={styles["submit-con"]}>
            <RegisterBtn status={isLoading} />
          </div>
        </div>

        <div className={styles["error-con"]}>
          {errors?.firstname ? (
            <Alert severity="error">
              <AlertTitle>{errors.firstname?.message}</AlertTitle>
            </Alert>
          ) : errors?.lastname ? (
            <Alert severity="error">
              <AlertTitle>{errors.lastname?.message}</AlertTitle>
            </Alert>
          ) : errors.email ? (
            <Alert severity="error">
              <AlertTitle>{errors.email?.message}</AlertTitle>
            </Alert>
          ) : errors.username ? (
            <Alert severity="error">
              <AlertTitle>{errors.username?.message}</AlertTitle>
            </Alert>
          ) : errors.age ? (
            <Alert severity="error">
              <AlertTitle>{errors.age?.message}</AlertTitle>
            </Alert>
          ) : errors.createPassword ? (
            <Alert severity="error">
              <AlertTitle>{errors.createPassword?.message}</AlertTitle>
            </Alert>
          ) : errors.firstname ? (
            <Alert severity="error">
              <AlertTitle>{errors.password?.message}</AlertTitle>
            </Alert>
          ) : (
            <></>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterField;
