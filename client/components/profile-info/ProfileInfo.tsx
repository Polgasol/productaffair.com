import React from "react";
import styles from "../profile-info/ProfileInfo.module.scss";
import Username from "./meta-data/username/Username";
import Followers from "./meta-data/followers/Followers";
import FollowBtn from "./buttons/follow/FollowBtn";
import ProfilePic from "./icons/profile-pic/ProfilePic";
import About from "./meta-data/about/About";
import ProfileEdit from "../profile-edit/ProfileEdit";
import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "../../api/profile";
// import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import Script from "next/script";

interface User {
  user: string | string[] | undefined;
}

const ProfileInfo = React.memo(({ user }: User) => {
  const { data, isLoading, isError, status } = useQuery(
    ["getProfileInfo", user],
    getProfileDetails
  );
  return status === "loading" ? (
    <div className={styles["loading-container"]}>
      <CircularProgress />
    </div>
  ) : status === "error" ? (
    <div className={styles[""]}></div>
  ) : (
    <>
      {process.env.NODE_ENV === "production" ? (
        <>
          <Head>
            <title>Productaffair - {data.username}</title>
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
            <meta
              property="og:url"
              content="https://wwww.productaffair.com"
            ></meta>
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
      <div className={styles["profile-info"]}>
        <div className={styles["profile-info__photo"]}>
          <ProfilePic profilePic={data} />
        </div>
        <div className={styles["profile-info__username"]}>
          <Username username={data} />
        </div>
        <div className={styles["profile-info__followers"]}>
          <Followers followersCount={data} />
        </div>
        <div className={styles["profile-info__follow-btn"]}>
          {(data.isAuthor === "!Author" && data.isFollowing === "!Following") ||
          (data.isAuthor === "Guest" && data.isFollowing === "Guest") ||
          (data.isAuthor === "!Author" && data.isFollowing === "Following") ? (
            <FollowBtn
              user={data.userId}
              isFollowed={data.isFollowing}
              isAuthor={data.isAuthor}
            />
          ) : isLoading ? (
            <LoadingButton loading={true} />
          ) : (
            <ProfileEdit values={data} />
          )}
        </div>
        <div className={styles["profile-info__about"]}>
          <About about={data} />
        </div>
      </div>
    </>
  );
});

export default ProfileInfo;
