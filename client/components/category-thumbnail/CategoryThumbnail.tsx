import React from "react";
import styles from "../category-thumbnail/CategoryThumbnail.module.scss";
import Staricon from "./icons/star/StarIcon";
import OverallRating from "./meta-data/overall-ratings/OverallRating";
import DatePosted from "./meta-data/date-posted/DatePosted";
import { LikesCount } from "./meta-data/likes-count/LikesCount";
import DotIcon from "./icons/dot/DotIcon";
import { ViewsCount } from "./meta-data/views-count/ViewsCount";
import PostTitleLink from "./links/post-title-link/PostTitleLink";
import UploaderLink from "./links/uploader-link/UploaderLink";
import Image from "next/image";
import ProfileImg from "./icons/profile-img/ProfileImg";
import test from "../../assets/equal.jpg";

const CategoriesThumbnail = ({ values }: any) => {
  return (
    <div className={styles["thumbnail"]}>
      <a
        href={`https://www.productaffair.com/post/${values.id}`}
        className={styles["thumbnail__link"]}
      >
        <div className={styles["thumbnail__top"]}>
          <div className={styles["thumbnail__rating"]}>
            <Staricon />
            <OverallRating overallrating={values.overall_rating} />
          </div>
          <div className={styles["thumbnail__date"]}>
            <DatePosted datecreated={values.date_created} />
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
            <LikesCount likescount={values.likes_count} />
            <ViewsCount viewscount={values.views_count} />
          </div>
          <div className={styles["thumbnail__title"]}>
            <PostTitleLink postTitle={values.title} id={values.id} />
          </div>
          <div className={styles["thumbnail__author"]}>
            <ProfileImg profileImg={values} />
            <UploaderLink author={values.author} id={values.user_id} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default CategoriesThumbnail;
