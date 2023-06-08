import React from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategoryPosts } from "../../../api/category";
import CategoryThumbnail from "../../category-thumbnail/CategoryThumbnail";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../category-template/CategoryTemplate.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import Script from "next/script";

const CategoriesTemplate = () => {
  const router = useRouter();
  const { category } = router.query;
  const {
    data, // data.pages.map = array that contains the fetched data
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: any = useInfiniteQuery({
    queryKey: ["getCategoryPosts", category],
    queryFn: getCategoryPosts, //  array containing the page params used to fetch the pages (query parameters)
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
    <>
      {process.env.NODE_ENV === "production" ? (
        <>
          <Head>
            <title>Productaffair - {category}</title>
            <meta name="robots" content="noindex, follow"></meta>
            <meta
              content="width=device-width,maximum-scale=1.0,initial-scale=1.0,minimum-scale=0.9,user-scalable=no"
              name="viewport"
            ></meta>
            <meta
              property="description"
              name="description"
              content="Discover the best products on the market. Share
          your product experiences, upload images and make a review."
              data-app="true"
            ></meta>
            <meta
              property="og:description"
              name="og:description"
              content="Discover the best products on the market. Share
          your product experiences, upload images and make a review."
              data-app="true"
            ></meta>
            <meta
              property="og:type"
              name="og:type"
              content="website"
              data-app="true"
            ></meta>
            <meta name="google" content="notranslate"></meta>
            <meta name="application-name" content="Productaffair"></meta>
            <meta property="og:site_name" content="Productaffair"></meta>
            <meta
              property="og:url"
              content="https://wwww.productaffair.com"
            ></meta>
            <meta property="og:locale" content="en_US"></meta>
          </Head>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2FJZ116LFW"
            strategy="afterInteractive"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2FJZ116LFW');`}
          </Script>
        </>
      ) : (
        <></>
      )}
      <main className={styles["categories-main"]}>
        <InfiniteScroll
          className={styles["categories-main__section"]}
          dataLength={data?.pages.length}
          next={() => fetchNextPage()}
          hasMore={hasNextPage} // ctr + right click the hasMore property and change the type accepted from boolean to boolean | undefined
          loader={<></>}
        >
          {data.pages[0] === "No posts are available" ? (
            <div>No Posts are available</div>
          ) : (
            data?.pages.map((page: any, idx: any) => {
              return page?.map((value: any, i: any) => {
                return <CategoryThumbnail values={value} key={value.id} />;
              });
            })
          )}
        </InfiniteScroll>
      </main>
    </>
  );
};

export default CategoriesTemplate;
