import React from "react";
import { useQuery } from "@tanstack/react-query";
// import { homePosts } from "../api/home";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { createContext } from "react";
import { userAuth } from "../api/auth";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../hooks/hooks.module.scss";
// const FingerPrintContext = createContext({});
// const FingerPrintProvider = ({ children }: any) => {
//   const fingerprint = async () => {
//     const fp = await FingerprintJS.load();
//     const getData = await fp.get();
//     const data = getData.visitorId;
//     return data;
//   };
//   const { data, isLoading, isError } = useQuery(["fingerprint"], () =>
//     fingerprint()
//   );
//   const guest = data;
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (isError) {
//     return <div>Error...</div>;
//   }
//   const values = {
//     guest,
//   } as const;

//   return (
//     <FingerPrintContext.Provider value={values}>
//       {children}
//     </FingerPrintContext.Provider>
//   );
// };

const AuthContext = createContext({});
const AuthProvider = ({ children }: any) => {
  const { data, isLoading, isError } = useQuery(["auth"], userAuth); // invalidate if logout
  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  const values = {
    state: {
      loading: isLoading,
      error: isError,
    },
    auth: {
      verified: data.auth.verified,
      type: data.auth.type,
    },
    user: {
      id: data.user.id,
      username: data.user.username,
      guest: data.user.guest,
      timezone: data.user.timezone,
    },
  } as const;
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
