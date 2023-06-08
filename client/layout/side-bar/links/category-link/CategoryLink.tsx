import React, { FC } from "react";
import { ListItemButton } from "@mui/material";
import styles from "./CategoryLink.module.scss";

const CategoryLink: FC = () => {
  const categoryList = [
    "Technology",
    "Health and Wellness",
    "Men's Clothing",
    "Women's Clothing",
    "Travel",
    "Unique Items",
    "Food and Drinks",
    "Kitchen",
    "Home Improvement",
    "Sports and Outdoors",
    "Nature",
    "Skin Care",
    "Baby",
    "Toys and Gaming",
    "Art and Design",
    "Pets",
    "Vehicle and Motors",
    "Books",
  ];


  return (
    <div className={styles["categories"]}>
      {categoryList.map((data) => {
        return (
          <ListItemButton key={data}>
            <a
              href={`https://www.productaffair.com/category?category=${data}`}
              className={styles["categories__link"]}
            >
              {data}
            </a>
          </ListItemButton>
        );
      })}
    </div>
  );
};

export default CategoryLink;
