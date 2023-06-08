import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../../../api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "../delete-btn/DeleteBtn.module.scss";
import { Button } from "@mui/material";

type Item = {
  username: string;
  dateCreated: string;
  likesCount: number;
  isLike: boolean;
  isAuthor: boolean; // set to true proceed with showing delete button in the component;
  commentId: string; // comment id is present then do not fetch the api from the server database
  commentText: string;
};

type DeleteBtn = {
  commentId: string;
  isAuthor: boolean;
  setComment: React.Dispatch<React.SetStateAction<Item[]>>;
  comment: Item[];
};

const DeleteBtn = ({ commentId, isAuthor, setComment, comment }: DeleteBtn) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id }: any = router.query;
  const { data, isLoading, isError, mutate }: any = useMutation({
    mutationFn: (data) => {
      const commentId = {
        commentId: data,
      };
      return deleteComment(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComment", commentId] });
      // delete the comment post immediately
      const newComment = comment.filter((item) => item.commentId !== commentId);
      setComment(newComment);
    },
    // onError: () => {
    //   router.push("/404");
    // },
  });

  const onDelete = async () => {
    if (isAuthor) {
      mutate(commentId);
    }
    isError === true
  };

  return (
    // disabled={isLoading}
    <div>
      {isLoading ? (
        <Button disabled={isLoading}>
          <DeleteIcon
            sx={{
              color: "var(--gray)",
              cursor: "pointer",
              fontSize: "1.3rem",
            }}
            onClick={onDelete}
          />
        </Button> ? (
          isError
        ) : (
          <Button>
            <DeleteIcon
              sx={{
                color: "var(--meta-data)",
                cursor: "pointer",
                fontSize: "1.3rem",
              }}
              onClick={onDelete}
            />
          </Button>
        )
      ) : (
        <Button>
          <DeleteIcon
            sx={{
              color: "var(--meta-data)",
              cursor: "pointer",
              fontSize: "1.3rem",
            }}
            onClick={onDelete}
          />
        </Button>
      )}
    </div>
  );
};

export default DeleteBtn;
