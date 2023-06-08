import React, { useCallback } from "react";
import styles from "./Post.module.scss";
import LikeBtn from "./buttons/like-btn/LikeBtn";
import DatePosted from "./meta-data/date-posted/DatePosted";
import LikesCount from "./meta-data/likes-count/LikesCount";
import ViewsCount from "./meta-data/views-count/ViewsCount";
import Dot from "./icons/dot/DotIcon";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";
import test from "../../assets/equal.jpg";

export const Post = ({ values }: any) => {
  const isLike = values.data.isLike;
  const images = values.data.data.images;
  const isAuthor = values.data.isAuthor;

  return (
    <div className={styles["post"]}>
      <div className={styles["post__top"]}>
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            width: 900,
            gap: "1rem",
          }}
          style={{
            backgroundColor: "var(--meta-data)",
          }}
        >
          {images.map((key: any, index: any) => {
            return (
              <SplideSlide key={index}>
                <img
                  className={styles["post__images"]}
                  src={key}
                  key={index}
                  width={900}
                  height={900}
                  alt={values.data.data.title}
                />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <div className={styles["post__bottom"]}>
        <LikeBtn
          postId={values.data.data.id}
          isLike={isLike}
          isAuthor={isAuthor}
        />
        <LikesCount likesCount={values.data.data.likes_count} />
        <ViewsCount viewsCount={values.data.data.views_count} />
        <DatePosted dateCreated={values.data.data.date_created} />
      </div>
    </div>
  );
};

export default Post;
