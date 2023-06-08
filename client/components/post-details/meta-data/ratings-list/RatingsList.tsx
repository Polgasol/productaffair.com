import React, { FC } from "react";
import styles from "./RatingsList.module.scss";
import StarIcon from "../../icons/star/StarIcon";

interface IRatings {
  id: number;
  label: string;
  rating: number | string;
}
interface RatingsList {
  ratingsList: {
    quality: string;
    price: string;
    customer_service: string;
  }
}
export const RatingsList = ({ ratingsList }: RatingsList) => {
  // fake data
  const quality = parseFloat(ratingsList.quality).toFixed(1);
  const price = parseFloat(ratingsList.price).toFixed(1);
  const customerService = parseFloat(ratingsList.customer_service).toFixed(1);;

  const ratings: IRatings[] = [
    { id: 0, label: "Quality", rating: quality },
    { id: 1, label: "Price", rating: price },
    { id: 2, label: "Customer Service", rating: customerService },
  ];

  return (
    <div className={styles["ratings-list"]}>
      {ratings.map((data) => {
        return (
          <div className={styles["ratings-list__row"]} key={data.id}>
            <div className={styles["ratings-list__title"]}>
              <span className={styles["ratings-list__label"]}>
                {data.label}
              </span>
            </div>
            <div className={styles["ratings-list__score"]}>
              <span className={styles["ratings-list__text"]}>
                {data.rating}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingsList;
