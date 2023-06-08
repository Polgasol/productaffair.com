import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";
import { logout } from "../../../../../api/logout";
import styles from "../logout/LogoutBtn.module.scss";

const Logout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, mutate, isLoading, isError } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const onClick = async () => {
    mutate();
  };
  if (isLoading) {
    <div>Loading...</div>;
  }
  if (isError) {
    <div>Error...</div>;
  }
  if (data === "Logged out") {
    router.push("/login");
  }
  return (
    <div className={styles["logout"]}>
      <button onClick={onClick} className={styles["logout__btn"]}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
