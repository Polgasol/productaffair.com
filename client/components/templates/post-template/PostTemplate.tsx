import React, { useContext } from "react";
import styles from "./PostTemplate.module.scss";
import Post from "../../post/Post";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../../api/post";
import PostDetails from "../../post-details/PostDetails";
import { useRouter } from "next/router";
import { AuthContext } from "../../../hooks/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import Script from "next/script";
import ProfileIcon from "../../post-details/icons/profile/ProfileIcon";
import DeleteBtn from "../../post-details/buttons/delete-btn/DeleteBtn";
import LoadingButton from "@mui/lab/LoadingButton";
import Uploader from "../../post-details/links/uploader-link/UploaderLink";
import FollowBtn from "../../post-details/buttons/follow-btn/FollowBtn";
import { useMediaQuery } from "@mui/material";

const PostTemplate = () => {
  const matches = useMediaQuery("(min-width:56.25rem)"); // 900px
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useQuery(["getPost", id], () =>
    getPost(id)
  ); // invalidate if logout
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
  const isAuthor = data.isAuthor; // "!Author", "Author", "Guest"
  const isFollowed = data.isFollowed; // "!Following", "Following",
  const values = {
    data,
    isLoading,
    isError,
  };
  return (
    <>
      {process.env.NODE_ENV === "production" ? (
        <>
          <Head>
            <title>{values.data.data.title}</title>
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
      <main className={styles["post-main"]}>
        <section className={styles["post-main__section"]}>
          <div className={styles["post-main__uploader"]}>
            <div className={styles["post-main__uploader-name"]}>
              <ProfileIcon profileImg={values.data.data} />
              <Uploader values={values.data.data} />
            </div>
            {(isAuthor === "!Author" && isFollowed === "!Following") ||
            (isAuthor === "Guest" && isFollowed === "Guest") ? (
              <FollowBtn
                userId={values.data.data.user_id}
                isFollowed={isFollowed}
                isAuthor={isAuthor}
              />
            ) : isLoading ? (
              <LoadingButton loading={true} />
            ) : isAuthor === "Author" ? (
              <DeleteBtn />
            ) : (
              <FollowBtn
                userId={values.data.data.user_id}
                isFollowed={isFollowed}
                isAuthor={isAuthor}
              />
            )}
          </div>
          <div className={styles["main-content"]}>
            <Post values={values} />
            <PostDetails values={values} />
          </div>
        </section>
      </main>
    </>
  );
};

export default PostTemplate;
