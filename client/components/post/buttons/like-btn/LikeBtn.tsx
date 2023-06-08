import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./LikeBtn.module.scss";
import { likePost, unlikePost } from "../../../../api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const LikeBtn = ({ postId, isLike, isAuthor }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [like, setLike] = useState<boolean>(false);
  const likeMutation = useMutation({
    mutationFn: (data) => {
      const postId = {
        postId: data,
      };
      return likePost(postId);
    },
    onSuccess: (data) => {
      if (data === "Like") {
        setLike(true);
        queryClient.invalidateQueries(["getPost", postId]);
      }
    },
  });

  const unLikeMutation = useMutation({
    mutationFn: (data) => {
      const postId = {
        postId: data,
      };
      return unlikePost(postId);
    },
    onSuccess: (data) => {
      if (data === "!Like") {
        setLike(false);
        queryClient.invalidateQueries(["getPost", postId]);
      }
    },
  });

  const clickLike = () => {
    if (isAuthor === "Guest") {
      router.push("/login");
    }
    likeMutation.mutate(postId);
  };

  const clickUnlike = () => {
    if (isAuthor === "Guest") {
      router.push("/login");
    }
    unLikeMutation.mutate(postId);
  };

  useEffect(() => {
    if (isLike === "Like") {
      return setLike(true);
    }
    if (isLike === "!Like") {
      return setLike(false);
    }
  }, [isLike]);

  return (
    <div className={styles["like-btn"]}>
      {!like ? (
        <FavoriteBorderIcon
          className={styles["like-btn__unlike-icon"]}
          onClick={clickLike}
        />
      ) : (
        <FavoriteIcon
          className={styles["like-btn__like-icon"]}
          onClick={clickUnlike}
        />
      )}
    </div>
  );
};

export default LikeBtn;
