import React, { FC } from "react";
import styles from "./UploadTemplate.module.scss";
import Upload from "../../upload/Upload";
import { getUpload } from "../../../api/upload";
import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";

const UploadTemplate = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["getUpload"], getUpload); // invalidate if logout
  const isVerified = data?.auth?.verified;
  if (isLoading) {
    return (
      <div className={styles["loading-container"]}>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    router.push("/404");
  }
  if (isVerified === false) {
    router.push("/");
  }
  return (
    <main className={styles["upload-main"]}>
      <div className={styles["upload-section-con"]}>
        <Upload />
      </div>
    </main>
  );
};

export default UploadTemplate;
