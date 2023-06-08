import React from "react";
import styles from "./Layout.module.scss";
import Topbar from "./top-bar/Topbar";
import Navbar from "./nav-bar/Navbar";
import CategoriesTitle from "../layout/side-bar/titles/categories-title/CategoriesTitle";
// import Settings from './links/settings-link/SettingsLink';
// import Suggest from "../layout/side-bar/links/suggest-link/SuggestLink";
// import HelpLink from './links/help-link/HelpLink';
import Copyright from "../layout/side-bar/titles/copyright-title/CopyrightTitle";
// import SidenavLink from './links/sidenav-link/SidenavLink';
import CategoryLink from "../layout/side-bar/links/category-link/CategoryLink";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box, List, Divider } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import SidebarLogoLink from "../layout/side-bar/links/sidebar-logo-link/SideBarLogoLink";
import SidenavLink from "../layout/side-bar/links/sidenav-link/SidenavLink";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["layout__con"]}>
        <Topbar />
        <Navbar />
      </div>
      <div className={styles["layout__sidebar-nav"]}>
        {/* Insert updated layout here */}
        <div id="pages">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

//   <Box
//     role="presentation"
//     sx={{ padding: "1rem" }}
//     className={styles["sidebar"]}
//   >
//     <List>
//       <SidenavLink />
//     </List>
//     <Divider />
//     <div className={styles["cat-list-con"]}>
//       <CategoriesTitle />
//       <CategoryLink />
//     </div>
//     <Divider />
//     {/* <div className={styles["settings-con"]}>
//   <Suggest />
// </div> */}
//     <div className={styles["copyright-con"]}>
//       <Copyright />
//     </div>
//   </Box>;
