import React, { useContext } from "react";
import styles from "./Topbar.module.scss";
// import MenuBtn from './buttons/menu/MenuBtn';
import LoginLink from "./links/login-link/LoginLink";
import SideBar from "../side-bar/SideBar";
import { AuthContext } from "../../hooks/hooks";
import Logout from "./buttons/menu/logout/LogoutBtn";

// type Index<
//   T extends [],
//   S extends number[] = []
// > = T["length"] extends S["length"] ? S : Index<T, [S["length"], ...S]>;
export const Topbar = () => {
  // remove optional chaining
  const authData: any = useContext(AuthContext);
  const isVerified = authData?.auth?.verified;
  const userName = authData?.user?.username;

  //  const values = {
  //    auth: {
  //      verified: data.auth.verified,
  //      type: data.auth.type,
  //    },
  //    user: {
  //      id: data.user.id,
  //      username: data.user.username,
  //      guest: data.user.guest,
  //      timezone: data.user.timezone,
  //    },
  //  } as const;
  return (
    <div className={styles["top-bar"]}>
      <div className={styles["top-bar__left"]}>
        <SideBar />
        {isVerified ? (
          <span className={styles["top-bar__left-verified"]}>@{userName}</span>
        ) : null}
      </div>
      <div className={styles["top-bar__right"]}>
        {isVerified ? <Logout /> : <LoginLink />}
      </div>
    </div>
  );
};

export default Topbar;
