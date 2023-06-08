import React from "react";
import { deletePost } from "../../../../api/deletepost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import styles from "../delete-btn/DeleteBtn.module.scss";

const DeleteBtn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id }: any = router.query;
  const { data, isLoading, isError, mutate } = useMutation({
    mutationFn: (data) => {
      const postId = {
        postId: data,
      };
      return deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPost", id] });
      router.push("/");
    },
    onError: () => {
      router.push("/404");
    },
  });

  const onDelete = async () => {
    mutate(id);
  };
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (isError) {
    <div>Error...</div>;
  }
  return (
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
