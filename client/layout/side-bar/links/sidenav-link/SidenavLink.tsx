import React, { FC, useContext } from "react";
import { ListItemButton } from "@mui/material";
import { AuthContext } from "../../../../hooks/hooks";
import HomeIcon from "@mui/icons-material/Home";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styles from "./SidenavLink.module.scss";

const SidenavLink: FC = () => {
  const authData: any = useContext(AuthContext);
  const isVerified = authData?.auth?.verified;
  const userId = authData?.user?.id;

  const navLinks = [
    {
      id: 0,
      name: "Home",
      queryname: "/",

      svg: <HomeIcon />,
    },
    {
      id: 1,
      name: "Upload",
      queryname: "upload",
      svg: <AddAPhotoOutlinedIcon />,
    },
    {
      id: 2,
      name: "Profile",
      queryname: `login`,

      svg: <AccountBoxIcon />,
    },
  ];

  return (
    <>
      {navLinks.map(({ id, name, queryname, svg }) => {
        return (
          <ListItemButton key={id}>
            {svg}
            <div className={styles["nav-link"]}>
              {name === "Profile" && isVerified ? (
                <a
                  href={`https://productaffair.com/profile/${userId}`}
                  className={styles["nav-link__link"]}
                >
                  {name}
                </a>
              ) : name === "Profile" && !isVerified ? (
                <a
                  href={`https://productaffair.com/login`}
                  className={styles["nav-link__link"]}
                >
                  {name}
                </a>
              ) : name === "Upload" && isVerified ? (
                <a
                  href={`https://productaffair.com/${queryname}`}
                  className={styles["nav-link__link"]}
                >
                  {name}
                </a>
              ) : name === "Upload" && !isVerified ? (
                <a
                  href={`https://productaffair.com/login`}
                  className={styles["nav-link__link"]}
                >
                  {name}
                </a>
              ) : (name === "Home" && isVerified) || !isVerified ? (
                <a
                  href={`https://productaffair.com`}
                  className={styles["nav-link__link"]}
                >
                  {name}
                </a>
              ) : (
                <a
                  href={`https://productaffair.com`}
                  className={styles["nav-link__link"]}
                >
                  {name}
                </a>
              )}
            </div>
          </ListItemButton>
        );
      })}
    </>
  );
};

export default SidenavLink;
