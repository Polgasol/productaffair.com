/* eslint-disable react/react-in-jsx-scope */
import type { GetServerSideProps, NextPage } from "next";
import React, { useContext } from "react";
import styles from "../styles/Home.module.scss";
import HomeTemplate from "../components/templates/home-template/HomeTemplate";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { userAuth } from "../api/auth";
import { AuthContext } from "../hooks/hooks";
import Head from "next/head";
import Script from "next/script";

// export const getServerSideProps: GetServerSideProps = async () => {
//   // check for authentication;
//   try {
//     // pwede 2 sabay mag fetchquery then cache the data in dehydrated state in new QueryClient() _app.tsx file;
//     // you can now use the cached data globally like in redux;
//     const queryClient = new QueryClient(); // accesses the cache data in hydrate
//     await queryClient.fetchQuery(["userAuth"], userAuth);
//     //const res = await userAuth()
//     return {
//       props: {
//         // dehydrate query cache
//         dehydratedState: dehydrate(queryClient),
//         // res
//       },
//     };
//   } catch (err) {
//     console.log("MAyroon Error");
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
//  Search the world's information,
// including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.
const Home: NextPage = () => {
  // const policyElement = privacyPolicy();
  return (
    <>
      {process.env.NODE_ENV==='production' ? 
      (<><Head>
        <title>
          Productaffair.com - Discover the best products on the market. Share
          your product experiences, upload images and make a review.
        </title>
        <meta
          content="width=device-width,maximum-scale=1.0,initial-scale=1.0,minimum-scale=0.9,user-scalable=no"
          name="viewport"
        ></meta>
        <meta
          property="description"
          name="description"
          content="Discover the best products on the market. Share
          your product experiences, upload images and make a review."
          data-app="true"
        ></meta>
        <meta
          property="og:description"
          name="og:description"
          content="Discover the best products on the market. Share
          your product experiences, upload images and make a review."
          data-app="true"
        ></meta>
        <meta
          property="og:type"
          name="og:type"
          content="website"
          data-app="true"
        ></meta>
        <meta name="google" content="notranslate"></meta>
        <meta name="application-name" content="Productaffair"></meta>
        <meta property="og:site_name" content="Productaffair"></meta>
        <meta property="og:url" content="https://wwww.productaffair.com"></meta>
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
      ): <></>
      }
      <HomeTemplate />
    </>
  );
};

export default Home;
