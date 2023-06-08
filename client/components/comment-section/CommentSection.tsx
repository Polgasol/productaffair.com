import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import FromLabel from "./labels/from/FromLabel";
import CommenterLink from "./links/commenter-link/CommenterLink";
import CommentDate from "./meta-data/comment-date/CommentDate";
import CommentText from "./meta-data/comment-text/CommentText";
import CommentLikes from "./meta-data/comment-likes/CommentLikes";
import SeeMoreBtn from "./buttons/see-more-btn/SeeMoreBtn";
import ReadMoreBtn from "./buttons/read-more-btn/ReadMoreBtn";
import LikeBtn from "./buttons/comment-like-btn/LikeBtn";
import CommentBtn from "./buttons/comment-btn/CommentBtn";
import Comment from "./input-fields/comment/Comment";
import styles from "../comment-section/CommentSection.module.scss";
import { getComments } from "../../api/comment";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteBtn from "./buttons/delete-btn/DeleteBtn";

type Item = {
  username: string;
  dateCreated: string;
  likesCount: number;
  isLike: boolean;
  isAuthor: boolean; // set to true proceed with showing delete button in the component;
  commentId: string; // comment id is present then do not fetch the api from the server database
  commentText: string;
};

const CommentSection = () => {
  const router = useRouter();
  const { id } = router.query;
  const [commentError, setCommentError] = useState(false);
  const [getCommentsError, setGetCommentsError] = useState(false);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  }: any = useInfiniteQuery({
    queryKey: ["getComments", id],
    queryFn: getComments, //  array containing the page params used to fetch the pages (query parameters)
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) {
        return;
      }
      return pages.length;
    },
    onError: () => {
      // create component that shows error; const [error, setError] = useState('');
      setGetCommentsError(true);
    },
  });
  // get 10 comments on initial load of the post.
  const [comment, setComment] = useState<Item[]>([]);
  return (
    // dynamically show 10 comments on request
    <div className={styles["post-comments"]}>
      <Comment
        setCommentError={setCommentError}
        setComment={setComment}
        comment={comment}
        id={id}
      />
      {commentError ? (
        <div className={styles["post-comments__error-con"]}>
          <span className={styles["post-comments__error"]}>
            Couldn't comment. Please retry
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className={styles["post-comments__comment-section"]}>
        {comment ? (
          comment.map((values, index) => (
            <div
              className={styles["post-comments__comment-section-body"]}
              key={values.commentId}
            >
              {/*post request data that will be showed immediately after onSuccess useMutation*/}
              <div className={styles["post-comments__comment-top"]}>
                <div className={styles["post-comments__comment-name"]}>
                  <FromLabel />
                  <CommenterLink username={values.username} />
                </div>
                <CommentDate dateCreated={values.dateCreated} />
              </div>
              <div className={styles["post-comments__comment-mid"]}>
                <CommentText comment={values.commentText} />
              </div>
              {/* <div className={styles["post-comments__comment-readmore"]}>
              <ReadMoreBtn />
            </div> */}
              <div className={styles["post-comments__comment-bot"]}>
                <div className={styles["post-comments__comment-likes"]}>
                  <LikeBtn
                    isLike={values.isLike}
                    commentId={values.commentId}
                    isAuthor={values.isAuthor}
                  />
                  <CommentLikes likesCount={values.likesCount} />
                </div>
                {values.isAuthor ? (
                  <DeleteBtn
                    commentId={values.commentId}
                    isAuthor={values.isAuthor}
                    comment={comment}
                    setComment={setComment}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
        {status === "loading" ? (
          <div className={styles["loading-container"]}>
            <CircularProgress
              className={styles["loading-container__loading"]}
              sx={{ color: "var(--meta-data)" }}
              size={30}
            />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.pages.length}
            next={() => fetchNextPage()}
            hasMore={hasNextPage} // ctr + right click the hasMore property and change the type accepted from boolean to boolean | undefined
            loader={<></>}
          >
            {data.pages[0] === undefined ? (
              <div className={styles["post-comments__comment-available"]}>
                <span
                  className={styles["post-comments__comment-available-text"]}
                >
                  No comments available.
                </span>
              </div>
            ) : (
              data?.pages.map((page: any) => {
                return page?.map((values: any) => {
                  // use some method when you have objects inside an array
                  // use includes method if you dont have objects.
                  const checkIfAlreadyExist = comment.some(
                    (object) => object.commentId === values.commentId
                  );
                  if (checkIfAlreadyExist) {
                    return <></>;
                  }
                  const fetchedData = {
                    username: values.username,
                    dateCreated: values.dateCreated,
                    likesCount: values.likesCount,
                    isLike: values.isLike,
                    isAuthor: values.isAuthor,
                    commentId: values.commentId,
                    commentText: values.commentText,
                  };
                  return setComment([...comment, fetchedData]); // appending the newly upload comments to the fetched data from server.
                });
              })
            )}
          </InfiniteScroll>
        )}
        {status !== "loading" && isFetching && data.pages !== undefined ? (
          <div className={styles["loading-container"]}>
            <CircularProgress
              className={styles["loading-container__loading"]}
              sx={{ color: "var(--meta-data)" }}
              size={30}
            />
          </div>
        ) : (
          <></>
        )}
        {getCommentsError ? (
          <div className={styles["error"]}>
            <span className={styles["error__text"]}>
              Sorry, there was a problem with your request.
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
