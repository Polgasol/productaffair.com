import React, { useContext } from "react";
import type { GetServerSideProps, NextPage } from "next";
import UploadTemplate from "../components/templates/upload-template/UploadTemplate";
import Head from "next/head";
import Script from "next/script";
// always run on build time
// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const queryClient = new QueryClient();
//     const { auth }: any = await queryClient.fetchQuery(['userAuth'], userAuth);
//     // if user is already verified redirect to /home
//     if (auth.verified === false) {
//       return {
//         redirect: {
//           permanent: false,
//           destination: '/',

//         },
//         props: {
//           // dehydrate query cache
//           dehydratedState: dehydrate(queryClient),
//         },
//       };
//     }
//     // else continue to register page as guest
//     return {
//       props: {
//         // dehydrate query cache
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         error: {
//           message: `Internal Error`,
//           statusCode: 404,
//         },
//       },
//     };
//   }
// };
const Upload = () => {
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
      <UploadTemplate />
    </>
  );
  // }
  // router.push("/login");
};

export default Upload;
