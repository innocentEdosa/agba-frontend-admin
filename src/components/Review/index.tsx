import React from "react";
import styles from "./review.module.css";

export type ReviewProps = {
  user: { email: string; fullName: string };
  content: string;
  rating: number;
};

const Review = ({ user, content, rating }: ReviewProps) => {
  return (
    <article className={styles.wrapper}>
      <h3 className={styles.user__name}>{user.fullName}</h3>
      <p className={styles.user__email}>{user.email}</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.rating}>{rating}</p>
    </article>
  );
};

export default Review;
