import React, { useContext } from "react";
import { AuthContext } from "../../../../hooks/hooks";
import { ListItemButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styles from "../nav-btn/NavBtn.module.scss";

const NavBtn = () => {
  const authData: any = useContext(AuthContext);
  const isVerified = authData?.auth?.verified;
  const userId = authData?.user?.id;

  const navLinks = [
    {
      id: 0,
      name: "Home",
      queryname: "/",

      svg: <HomeIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      id: 1,
      name: "Upload",
      queryname: "upload",
      svg: <AddAPhotoOutlinedIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
    {
      id: 2,
      name: "Profile",
      queryname: `login`,

      svg: <AccountBoxIcon sx={{ width: "2rem", height: "2rem" }} />,
    },
  ];

  return (
    <>
      <div className={styles["nav-buttons"]}>
        {navLinks.map(({ id, name, queryname, svg }) => {
          return (
            <ListItemButton key={id}>
              <div className={styles["nav-buttons__nav-link"]}>
                {name === "Profile" && isVerified ? (
                  <a
                    href={`https://productaffair.com/profile/${userId}`}
                    className={styles["nav-buttons__link"]}
                  >
                    {svg}
                  </a>
                ) : name === "Profile" && !isVerified ? (
                  <a
                    href={`https://productaffair.com/login`}
                    className={styles["nav-buttons__link"]}
                  >
                    {svg}
                  </a>
                ) : name === "Upload" && isVerified ? (
                  <a
                    href={`https://productaffair.com/${queryname}`}
                    className={styles["nav-buttons__link"]}
                  >
                    {svg}
                  </a>
                ) : name === "Upload" && !isVerified ? (
                  <a
                    href={`https://productaffair.com/login`}
                    className={styles["nav-buttons__link"]}
                  >
                    {svg}
                  </a>
                ) : (name === "Home" && isVerified) || !isVerified ? (
                  <a
                    href={`https://productaffair.com/`}
                    className={styles["nav-buttons__link"]}
                  >
                    {svg}
                  </a>
                ) : (
                  <a
                    href={`https://productaffair.com/`}
                    className={styles["nav-buttons__link"]}
                  >
                    {svg}
                  </a>
                )}
              </div>
            </ListItemButton>
          );
        })}
      </div>
    </>
  );
};

export default NavBtn;
