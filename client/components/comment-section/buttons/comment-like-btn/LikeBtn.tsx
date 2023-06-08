import React, { useState, useEffect, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { likeComment, unlikeComment } from "../../../../api/comment";
import { AuthContext } from "../../../../hooks/hooks";
import styles from "./LikeBtn.module.scss";

type Like = {
  isLike: boolean;
  commentId: string | any;
  isAuthor: boolean;
};
const LikeBtn = ({ isAuthor, isLike, commentId }: Like) => {
  const authData: any = useContext(AuthContext);
  const checkIfGuest = authData.user.guest;
  const queryClient = useQueryClient();
  const router = useRouter();
  const [like, setLike] = useState<boolean>(false);
  const likeMutation = useMutation({
    mutationFn: (data) => {
      const commentId = {
        commentId: data,
      };
      return likeComment(commentId);
    },
    onSuccess: (data) => {
      if (data === true) {
        setLike(true);
        queryClient.invalidateQueries(["getComments", commentId]);
      }
    },
  });

  const unLikeMutation = useMutation({
    mutationFn: (data) => {
      const commentId = {
        commentId: data,
      };
      return unlikeComment(commentId);
    },
    onSuccess: (data) => {
      if (data === false) {
        setLike(false);
        queryClient.invalidateQueries(["getComments", commentId]);
      }
    },
  });

  const clickLike = () => {
    if (checkIfGuest === true) {
      router.push("/login");
    }
    likeMutation.mutate(commentId);
  };

  const clickUnlike = () => {
    if (checkIfGuest === true) {
      router.push("/login");
    }
    unLikeMutation.mutate(commentId);
  };

  useEffect(() => {
    if (isLike === true) {
      return setLike(true);
    }
    if (isLike === false) {
      return setLike(false);
    }
  }, [isLike]);
  return (
    <div className={styles["like-btn"]}>
      {!like ? (
        <FavoriteBorder
          className={styles["like-btn__btn"]}
          onClick={clickLike}
        />
      ) : (
        <FavoriteIcon className={styles["like-btn__btn"]} onClick={clickUnlike} />
      )}
    </div>
  );
};

export default LikeBtn;
