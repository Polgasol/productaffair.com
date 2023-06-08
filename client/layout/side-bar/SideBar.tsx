import React, { useState } from "react";
// import styles from './SideBar.module.scss';
// import SideBarLogoLink from './links/sidebar-logo-link/SideBarLogoLink';
import CategoriesTitle from "./titles/categories-title/CategoriesTitle";
// import Settings from './links/settings-link/SettingsLink';
import Suggest from "./links/suggest-link/SuggestLink";
// import HelpLink from './links/help-link/HelpLink';
import Copyright from "./titles/copyright-title/CopyrightTitle";
// import SidenavLink from './links/sidenav-link/SidenavLink';
import CategoryLink from "./links/category-link/CategoryLink";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Box, List, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarLogoLink from "./links/sidebar-logo-link/SideBarLogoLink";
import styles from "./SideBar.module.scss";
import SidenavLink from "./links/sidenav-link/SidenavLink";
// import ShowSidebarContext from '../layout/contexts/ShowSidebarContext';

// export const SideBar: FC = () => {
//   // const { setSidebar } = useContext(ShowSidebarContext);
//   // const closeMenu = (): void => {
//   //   setSidebar(false);
//   // };
//   // onClick={closeMenu} role="button" onKeyPress={closeMenu}
//   return (
//     <div className={styles['backg-con']}>
//       <div className={styles['sidebar-con']}>
//         <div className={styles['side-head-con']}>
//           <SideBarLogoLink />
//           <CloseSideBar />
//         </div>
//         <div className={styles['side-list-div']}>
//           <SidenavLink />
//         </div>
//         <div className={styles['cat-list-con']}>
//           <CategoriesTitle />
//           <div className={styles['cat-links-con']}>
//             <CategoryLink />
//           </div>
//         </div>
//         <div className={styles['settings-con']}>
//           <Settings />
//           <Suggest />
//           <HelpLink />
//         </div>
//         <Copyright />
//       </div>
//     </div>
//   );
// };
interface SideBarState {
  left: boolean;
}
type Anchor = "left";
const SideBar = () => {
  const [sideState, setSideState] = useState<SideBarState>({
    left: false,
  });

  const toggleSideBar =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setSideState({ ...sideState, [anchor]: open });
    };
  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleSideBar(anchor, false)}
      onKeyDown={toggleSideBar(anchor, false)}
      sx={{ padding: "1rem" }}
      className={styles["sidebar"]}
    >
      <div className={styles["side-head-con"]}>
        <SidebarLogoLink />
      </div>
      <Divider />
      <List>
        <SidenavLink />
      </List>
      <Divider />
      <div className={styles["cat-list-con"]}>
        <CategoriesTitle />
        <CategoryLink />
      </div>
      <Divider />
      {/* <div className={styles["settings-con"]}>
        <Suggest />
      </div> */}
      <div className={styles["copyright-con"]}>
        <Copyright />
      </div>
    </Box>
  );
  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={styles["menu-btn"]}>
            <button
              className={styles["menu-btn__btn"]}
              onClick={toggleSideBar(anchor, true)}
            >
              <MenuIcon sx={{ color: "white", fontSize: "1.5rem" }} />
            </button>
          </div>

          <SwipeableDrawer
            anchor={anchor}
            swipeAreaWidth={15}
            open={sideState[anchor]}
            onClose={toggleSideBar(anchor, false)}
            onOpen={toggleSideBar(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};
export default SideBar;
