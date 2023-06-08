import React, { useState } from "react";
import DotIcon from "../search-thumbnail/icons/dot/DotIcon";
import Staricon from "./icons/star/StarIcon";
import PostTitleLink from "./links/post-title-link/PostTitleLink";
import DatePosted from "./meta-data/date-created/DateCreated";
import { LikesCount } from "./meta-data/likes-count/LikesCount";
import PostRating from "./meta-data/post-ratings/PostRating";
import { ViewsCount } from "./meta-data/views-count/ViewsCount";
import Image from "next/image";
import styles from "./SearchThumbnail.module.scss";
import test from "../../assets/equal.jpg";
const SearchThumbnail = ({ values }: any) => {
  return (
    <div className={styles["search-card"]}>
      <a
        className={styles["search-card__link"]}
        href={`https://www.productaffair.com/post/${values.id}`}
      >
        <div className={styles["search-card__left"]}>
          <img
            src={values.images[0]}
            className={styles["search-card__image"]}
            width={500}
            height={500}
            alt={values.title}
          />
        </div>
        <div className={styles["search-card__right"]}>
          <div className={styles["search-card__meta-data"]}>
            <LikesCount likesCount={values.likes_count} />
            <ViewsCount viewsCount={values.views_count} />
            <DatePosted dateCreated={values.date_created} />
          </div>
          <div className={styles["search-card__title"]}>
            <PostTitleLink postTitle={values.title} />
          </div>
          <div className={styles["search-card__rating"]}>
            <Staricon />
            <PostRating overallRating={values.overall_rating} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default SearchThumbnail;
