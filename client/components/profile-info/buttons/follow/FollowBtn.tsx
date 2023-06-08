import React, { useState, useEffect } from "react";
import styles from "../follow/FollowBtn.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unFollowUser } from "../../../../api/follow";
import { useRouter } from "next/router";

interface Data {
  isFollowed: string;
  isAuthor: string;
  user: void;
}

const FollowBtn = ({ isFollowed, isAuthor, user }: Data) => {
  const router = useRouter();
  const [following, setFollowing] = useState<boolean>(false);
  const [author, setAuthor] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const followMutation = useMutation({
    mutationFn: (data) => {
      const userId = {
        userId: data,
      };
      return followUser(userId);
    },
    onSuccess: (data) => {
      if (data.data === "Following") {
        setFollowing(true);
      }
    },
    onError: () => {
      router.push("/404");
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: (data) => {
      const userId = {
        userId: data,
      };
      return unFollowUser(userId);
    },
    onSuccess: (data) => {
      if (data.data === "!Following") {
        setFollowing(false);
      }
    },
    onError: () => {
      router.push("/404");
    },
  });

  const follow = () => {
    if (isAuthor === "Guest") {
      router.push("/login");
    }
    if (isAuthor === "!Author") {
      followMutation.mutate(user);
    }
  };

  const unFollow = () => {
    if (isAuthor === "Guest") {
      router.push("/login");
    }
    if (isAuthor === "!Author") {
      unFollowMutation.mutate(user);
    }
  };

  // this component can only be showed if your are not the author
  useEffect(() => {
    if (isFollowed === "Following" && isAuthor === "!Author") {
      return setFollowing(true);
    }
    if (isFollowed === "!Following" && isAuthor === "!Author") {
      return setFollowing(false);
    }
    if (isFollowed === "Guest" && isAuthor === "Guest") {
      return setFollowing(false);
    }
  }, [isFollowed]);
  return (
    <div className={styles["follow-btn"]}>
      {(following === false && isAuthor === "!Author") || // react state level without react-query
      (following === false && isAuthor === "Guest") ? (
        <button
          type="button"
          className={styles["follow-btn__btn"]}
          onClick={follow}
        >
          Follow
        </button>
      ) : following === true && isAuthor === "!Author" ? (
        <button
          type="button"
          className={styles["unfollow-btn__btn"]} 
          onClick={unFollow}
        >
          Following
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FollowBtn;
