import React, { FC } from "react";
import RegisterForm from "../../register-form/RegisterForm";
import styles from "./RegisterTemplate.module.scss";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getRegister } from "../../../api/register";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import Script from "next/script";

const RegisterTemplate: FC = ({ checkSession }: any) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["getRegister"], getRegister); // invalidate if logout
  const isVerified = data?.auth?.verified;

  if (isLoading) {
    return (
      <div className={styles["loading-container"]}>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    router.push("/404");
  }
  if (isVerified) {
    router.push("/");
  }
  return (
    <>
      {process.env.NODE_ENV === "production" ? (
        <>
          <Head>
            <meta name="description" content=""></meta>
            <meta
              content="width=device-width,maximum-scale=1.0,initial-scale=1.0,minimum-scale=0.9,user-scalable=no"
              name="viewport"
            ></meta>
            <meta name="format-detection" content="telephone=no"></meta>
            <meta name="google" content="notranslate"></meta>
            <meta name="application-name" content="Productaffair"></meta>
            <meta property="og:site_name" content="Productaffair"></meta>
            <meta property="og:locale" content="en_US"></meta>
          </Head>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2FJZ116LFW"
            strategy="afterInteractive"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2FJZ116LFW');`}
          </Script>
        </>
      ) : (
        <></>
      )}
      <main className={styles["register-main"]}>
        <RegisterForm {...checkSession} />
      </main>
    </>
  );
};

export default RegisterTemplate;
