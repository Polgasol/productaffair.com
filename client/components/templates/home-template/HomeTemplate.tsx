import React, { useContext } from "react";
import styles from "./HomeTemplate.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import HomeThumbnail from "../../home-thumbnail/HomeThumbnail";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { homePosts } from "../../../api/home";
import { useRouter } from "next/router";

// use useContext
export const HomeTemplate = () => {
  const router = useRouter();
  const {
    data, // data.pages.map = array that contains the fetched data
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: any = useInfiniteQuery(
    ["homePosts"],
    homePosts, //  array containing the page params used to fetch the pages (query parameters)
    {
      getNextPageParam: (lastPage, pages) => {
        // getNextPageParam = the value you return is the pageParam in Axios api get request
        // lastPage = [{ id: 1}] the array of page 1
        // pages [ [{ id: 1 }], [{ id: 2 }] ] all of the page contents that has been fetched
        if (!lastPage) {
          return;
        }
        return pages.length;
      },
    }
  );
  if (status === "error") {
    router.push("/404");
  }
  return status === "loading" ? (
    <div className={styles["loading-container"]}>
      <CircularProgress />
    </div>
  ) : (
    <main className={styles["home-main"]}>
      <InfiniteScroll
        className={styles["home-main__section"]}
        dataLength={data?.pages.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage} // ctr + right click the hasMore property and change the type accepted from boolean to boolean | undefined
        loader={<></>}
      >
        {data.pages[0] === "No posts are available" ? (
          <div>No Posts are available</div>
        ) : (
          data?.pages.map((page: any) => {
            return page?.map((value: any) => {
              return <HomeThumbnail values={value} key={value.id} />;
            });
          })
        )}
      </InfiniteScroll>
    </main>
  );
};

export default HomeTemplate;
