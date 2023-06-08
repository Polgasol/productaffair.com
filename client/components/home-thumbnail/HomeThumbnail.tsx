/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import styles from "./HomeThumbnail.module.scss";
import Staricon from "./icons/star/StarIcon";
import VideoRating from "./meta-data/post-ratings/PostRating";
import DateCreated from "./meta-data/date-created/DateCreated";
import LikesCount from "./meta-data/likes-count/LikesCount";
import AuthorLink from "./links/author-link/AuthorLink";
import PostTitleLink from "./links/post-title-link/PostTitleLink";
import DotIcon from "./icons/dot/DotIcon";
import ViewsCount from "./meta-data/views-count/ViewsCount";
import Image from "next/image";
import ProfileImg from "./icons/profile-img/ProfileImg";
import immg from '../../assets/equal.jpg';
interface ImagePro {
  urls: {
    thumb: string;
  };
  id: string;
}
export const HomeThumbnail = ({ values }: any) => {
  return (
    <div className={styles["thumbnail"]}>
      <a
        href={`https://www.productaffair.com/post/${values.id}`}
        className={styles["thumbnail__link"]}
      >
        <div className={styles["thumbnail__top"]}>
          <div className={styles["thumbnail__rating"]}>
            <Staricon />
            <VideoRating overallRating={values.overall_rating} />
          </div>
          <div className={styles["thumbnail__date"]}>
            <DateCreated dateCreated={values.date_created} />
          </div>
        </div>
        <div className={styles["thumbnail__mid"]}>
            <img
              className={styles["thumbnail__image"]}
              src={values.images[0]}
              width={500}
              height={500}
              alt={values.title}
            />
        </div>
        <div className={styles["thumbnail__bot"]}>
          <div className={styles["thumbnail__meta"]}>
            <LikesCount likesCount={values.likes_count} />
            <ViewsCount viewsCount={values.views_count} />
          </div>
          <div className={styles["thumbnail__title"]}>
            <PostTitleLink postTitle={values.title} id={values.id} />
          </div>
          <div className={styles["thumbnail__author"]}>
            <ProfileImg profileImg={values} />
            <AuthorLink author={values.author} id={values.user_id} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default HomeThumbnail;
