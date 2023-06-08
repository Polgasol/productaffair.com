import React, { FC } from "react";
import styles from "./Navbar.module.scss";
import Logo from "./links/logo-link/LogoLink";
import SearchField from "./inputfields/search-field/SearchField";
import { useMediaQuery } from "@mui/material";
import NavBtn from "./buttons/nav-btn/NavBtn";

export const Navbar = () => {
  const matches = useMediaQuery("(min-width:48rem)");
  return (
    <div className={styles["nav-bar"]}>
      {matches ? (
        <div className={styles["nav-bar__logo"]}>
          <Logo />
        </div>
      ) : undefined}
      <SearchField />
      {matches ? <NavBtn /> : undefined}
    </div>
  );
};

export default Navbar;
// <div className={styles["nav-bar__link-con"]}>
//   {/* {link.map((links) => {
//     return <NavLinks list={links.className} name={links.name} key={links.key} />;
//   })} */}
//   <NavLinks />
// </div>;
