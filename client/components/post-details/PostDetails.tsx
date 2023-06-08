import React, { FC, useState } from "react";
import styles from "./PostDetails.module.scss";
import FollowBtn from "./buttons/follow-btn/FollowBtn";
import ProfileIcon from "./icons/profile/ProfileIcon";
import DeleteBtn from "./buttons/delete-btn/DeleteBtn";
import LoadingButton from "@mui/lab/LoadingButton";
import OverallRatingLabel from "./labels/overall-rating/OverallLabel";
import StoreLabel from "./labels/store/StoreLabel";
import Uploader from "./links/uploader-link/UploaderLink";
import OverallRating from "./meta-data/overall-rating/OverallRating";
import RatingsList from "./meta-data/ratings-list/RatingsList";
import StoreName from "./titles/store-name/StoreName";
import PostTitle from "./titles/post-title/PostTitle";
import Staricon from "./icons/star/StarIcon";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CommentSection from "../comment-section/CommentSection";

export const PostDetails = ({ values }: any) => {
  const [expand, setExpand] = useState(false);

  const expandButton = () => {
    setExpand((bool) => {
      if (bool === true) {
        return false;
      }
      return true;
    });
  };

  return (
    <div className={styles["post-details"]}>
      <PostTitle postTitle={values.data.data.title} />
      <div className={styles["post-details__store"]}>
        {/* <StoreLabel /> */}
        <StoreName storeName={values.data.data.store_name} />
      </div>
      <div className={styles["post-details__overall-label"]}>
        <OverallRatingLabel />
        <Staricon />
        <OverallRating overallRating={values.data.data.overall_rating} />
      </div>
      {expand ? <RatingsList ratingsList={values.data.data} /> : <></>}
      <div className={styles["post-details__expand"]} onClick={expandButton}>
        {!expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
      <CommentSection />
    </div>
  );
};

export default PostDetails;
