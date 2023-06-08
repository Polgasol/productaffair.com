import React from "react";
import styles from "../error-template/ErrorTemplate.module.scss";
import Head from "next/head";
import Script from "next/script";

const ErrorTemplate = () => {
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
      <main className={styles["error-main"]}>
        <div className={styles["error-main__con"]}>
          <h2 className={styles["error-main__text1"]}>Productaffair.com</h2>
          <p className={styles["error-main__text2"]}>
            404. Sorry, page not found.
          </p>
        </div>
      </main>
    </>
  );
};

export default ErrorTemplate;
