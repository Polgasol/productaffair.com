import { AppProps } from "next/dist/pages/_app";
import React, { FC } from "react";
import styles from "../profile-thumbnail/ProfileThumbnail.module.scss";
import Dot from "./icons/dot/Dot";
import Star from "./icons/star/Star";
import UploaderLink from "./links/uploader-link/UploaderLink";
import PostTitleLink from "./links/post-title-link/PostTitleLink";
import DateCreated from "./meta-data/date-created/DateCreated";
import { LikesCount } from "./meta-data/likes-count/LikesCount";
import Ratings from "./meta-data/ratings/Ratings";
import { ViewsCount } from "./meta-data/views-count/ViewsCount";
import Image from "next/image";
import StoreNameLink from "./links/store-name-link/StoreNameLink";
import test from "../../assets/equal.jpg";
const ProfileThumbnail = ({ values }: any) => {
  return (
    <div className={styles["profile-thumbnail"]}>
      <a
        href={`https://www.productaffair.com/post/${values.id}`}
        className={styles["thumbnail__link"]}
      >
        <div className={styles["profile-thumbnail__top"]}>
          <StoreNameLink storeName={values.store_name} />
          <div className={styles["profile-thumbnail__meta-data"]}>
            {/* <Star />
            <Ratings overallRating={values.overall_rating} /> */}
            <LikesCount likesCount={values.likes_count} />
            <ViewsCount viewsCount={values.views_count} />
            <DateCreated dateCreated={values.date_created} />
          </div>
          <PostTitleLink postTitle={values.title} />
        </div>
        <div className={styles["profile-thumbnail__mid"]}>
          <img
            className={styles["profile-thumbnail__image"]}
            src={values.images[0]}
            width={500}
            height={500}
            alt={values.title}
          />
        </div>
        {/* <div className={styles["profile-thumbnail__bot"]}>
          <div className={styles["profile-thumbnail__meta"]}>
            <LikesCount likesCount={values.likes_count} />
            <ViewsCount viewsCount={values.views_count} />
          </div>
          <div className={styles["profile-thumbnail__title"]}>
            <PostTitleLink postTitle={values.title} />
          </div>
          <div className={styles["profile-thumbnail__author"]}>
            <UploaderLink author={values.author} />
          </div>
        </div> */}
      </a>
    </div>
  );
};

export default ProfileThumbnail;
