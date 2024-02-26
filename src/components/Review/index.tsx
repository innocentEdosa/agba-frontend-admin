import React from "react";
import styles from "./review.module.css";
import { ReviewType } from "@/types/reviews";

const Review = ({ user, content, rating, is_anonymous }: ReviewType) => {
  return (
    <article className={styles.wrapper}>
      <h3 className={styles.user__name}>
        {is_anonymous ? "Anonymous" : `${user.firstName} ${user.lastName}`}
      </h3>
      <p className={styles.user__email}>{user.email}</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.rating}>{rating}</p>
    </article>
  );
};

export default Review;
