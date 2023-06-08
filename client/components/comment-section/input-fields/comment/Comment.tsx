import React, { FC, useState, useContext } from "react";
import CommentBtn from "../../buttons/comment-btn/CommentBtn";
import styles from "./Comment.module.scss";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postComment } from "../../../../api/comment";
import { AuthContext } from "../../../../hooks/hooks";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

type commentType = {
  commentText: string;
};

type Item = {
  username: string;
  dateCreated: string;
  likesCount: number;
  isLike: boolean;
  isAuthor: boolean; // set to true proceed with showing delete button in the component;
  commentId: string; // comment id is present then do not fetch the api from the server database
  commentText: string;
};
type commentData = {
  setCommentError: React.Dispatch<React.SetStateAction<boolean>>;
  setComment: React.Dispatch<React.SetStateAction<Item[]>>;
  comment: Item[];
  id: string | string[] | undefined;
};
const schema: SchemaOf<commentType> = yup
  .object()
  .shape({
    commentText: yup.string().min(1).max(500).required().defined(),
  })
  .defined();

export const Comment = ({
  setCommentError,
  setComment,
  comment,
  id,
}: commentData) => {
  const router = useRouter();
  const authData: any = useContext(AuthContext);
  const isVerified = authData?.auth?.verified;
  const today = dayjs();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(customParseFormat);
  const tz = dayjs.tz.guess();
  const latestDate = dayjs(today).tz(tz).format("MMM DD, YYYY");
  const userName = authData?.user?.username;
  const [commentBtn, setCommentBtn] = useState<boolean>(false);
  // const queryClient = useQueryClient();
  // push new comment to useState([]);
  // setComment([..comment, newComment]);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { mutate, data, reset, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (data: FieldValues) => {
      const postData = {
        id,
        ...data,
      };
      return postComment(postData);
    },
    onSuccess: (data) => {
      // username
      // dateCreated
      // likesCount
      // isAuthor
      // commentId
      // commentText
      const newComment = {
        username: userName, // useContext() from reactjs;
        dateCreated: latestDate, // dayjs reactjs;
        likesCount: 0, // initial value is equal to zero;
        isLike: false,
        isAuthor: true, // set to true proceed with showing delete button in the component;
        commentId: data.commentId, // comment id is present then do not fetch the api from the server database
        commentText: data.commentText,
      };
      setComment([newComment, ...comment]);
      setCommentError(false);
    },
    onError: () => {
      setCommentError(true);
    },
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setCommentBtn(true);
    }
    if (event.target.value === "") {
      setCommentBtn(false);
    }
  };
  const submitComment = handleSubmit(
    (values) => {
      if (isVerified) {
        return mutate(values);
      }
      return router.push("/login");
    },
    (err) => {
      setCommentError(true);
    }
  );
  return (
    <form
      className={styles["post-comments__comment-input"]}
      onSubmit={submitComment}
      autoComplete="off"
      role="presentation"
    >
      <div className={styles["comment"]}>
        <input
          type="text"
          className={styles["comment__input"]}
          placeholder="Write a comment..."
          {...register("commentText")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
          autoComplete="off"
          role="presentation"
        />
      </div>
      <CommentBtn commentBtn={commentBtn} isLoading={isLoading} />
    </form>
  );
};

export default Comment;
