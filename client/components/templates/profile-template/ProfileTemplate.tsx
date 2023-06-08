import React, { FC } from "react";
import { useRouter } from "next/router";
import ProfileInfo from "../../profile-info/ProfileInfo";
import ProfileThumbnail from "../../profile-thumbnail/ProfileThumbnail";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProfilePosts } from "../../../api/profile";
import styles from "../profile-template/ProfileTemplate.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileTemplate = React.memo(() => {
  const router = useRouter();
  const { user } = router.query;

  const {
    data, // data.pages.map = array that contains the fetched data
    fetchNextPage,
    hasNextPage,
    status,
  }: any = useInfiniteQuery({
    queryKey: ["getProfilePosts", user],
    queryFn: getProfilePosts, //  array containing the page params used to fetch the pages (query parameters)
    getNextPageParam: (lastPage, pages) => {
      // getNextPageParam = the value you return is the pageParam in Axios api get request
      // lastPage = [{ id: 1}] the array of page 1
      // pages [ [{ id: 1 }], [{ id: 2 }] ] all of the page contents that has been fetched
      if (!lastPage) {
        return;
      }
      return pages.length;
    },
  });
  if (status === "error") {
    router.push("/404");
  }
  return status === "loading" ? (
    <div className={styles["loading-container"]}>
      <CircularProgress />
    </div>
  ) : (
    <main className={styles["profile-main"]}>
      <section className={styles["profile-main__section"]}>
        <ProfileInfo user={user} />
        <InfiniteScroll
          className={styles["profile-main__posts"]}
          dataLength={data?.pages.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage} // ctr + right click the hasMore property and change the type accepted from boolean to boolean | undefined
          loader={<></>}
        >
          {data.pages[0] === "No posts are available" ? (
            <div className={styles['no-posts']}>No Posts are available</div>
          ) : (
            data?.pages.map((page: any) => {
              return page?.map((value: any) => {
                return <ProfileThumbnail values={value} key={value.id} />;
              });
            })
          )}
        </InfiniteScroll>
      </section>
    </main>
  );
});

export default ProfileTemplate;
