import React, { FC } from "react";
import VerifyCode from "../../verify-code/VerifyCode";
import styles from "../../verify-code/VerifyCode.module.scss";
import { getVerify } from "../../../api/verify";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import Script from "next/script";

const VerifyCodeTemplate = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["getVerify"], getVerify); // invalidate if logout
  const isVerified = data?.auth?.verified; // req.user.authtype === 'local' && req.user.verified === false
  const authType = data?.auth?.type;

  if (isLoading) {
    return (
      <div className={styles["loading-container"]}>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return <div>There was a problem...</div>;
  }
  if (authType !== "local" && isVerified !== false) {
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
      <main className={styles["verify-code-main"]}>
        <VerifyCode />
      </main>
    </>
  );
};

export default VerifyCodeTemplate;
