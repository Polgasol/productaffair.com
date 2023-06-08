import "../styles/globals.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/muiTheme";
import React, { FC } from "react";
import type { AppProps } from "next/app";
import Layout from "../layout/Layout";
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "../hooks/hooks";
// import Head from "next/head";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient()); // queryClient instance is inside useSstate per docs;

  if (pageProps.error) {
    return <div>Error...</div>;
  }
  //   {/*  */}
  //   {/* Hydrate data we already fetched */}
  //   { /*<Hydrate state={pageProps.dehydratedState}> */}

  //    {/*</Hydrate> */}
  // {/**/}

  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
                {/* etong Component nato mapapasa sa Layout as children */}
              </Layout>/
            </ThemeProvider>
          </Hydrate>
        </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default MyApp;
