import { useQuery, useIsFetching } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styles from "./NewCodeBtn.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { getNewCode } from "../../../../api/verify";

const NewCodeBtn = () => {
  const [time, setTime] = useState<number | null>(0);
  const { data, isLoading, isError, refetch } = useQuery(
    ["resendCode"],
    getNewCode,
    {
      onSuccess: (data) => {
        setTime(data);
      },
    }
  );
const isFetching = useIsFetching();
  useEffect(() => {
    if (time === 0) {
      setTime(null);
    }

    // exit early when we reach 0
    if (!time) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [time]);

  const setTimeLeft = async () => {
    await refetch();
    setTime(data);
  };
  return (
    <div className={styles["new-code-div"]}>
      <button className={styles["resend-code-link"]} onClick={setTimeLeft}>
        Resend code
      </button>
      {isError ? (
        <div className={styles["resend-timeLeft"]}>*resend error</div>
      ) : (
        <></>
      )}
      {time ? (
        <div className={styles["resend-timeLeft"]}>*resend after {time}s</div>
      ) : (
        <></>
      )}
      {isFetching ? (
        <CircularProgress
          size="16px"
          sx={{ color: "var(--meta-data)", marginLeft: "8px" }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NewCodeBtn;
