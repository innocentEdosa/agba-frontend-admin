"use client";

import React from "react";
import styles from "./courseReview.module.css";
import clsx from "clsx";
import { Pagination, Review } from "@/components";

const reviews = Array.from({ length: 8 }).map((_, index) => ({
  user: { email: "user@example.com", fullName: "Jack Robbinson" },
  content: `“Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est”`,
  rating: 0,
}));

const CourseReview = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={clsx("container", styles.title)}>Course Reviews</h1>
      <div className={styles.reviews}>
        {reviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </div>
      <div className="container">
        <Pagination
          totalCount={12}
          pageSize={1}
          currentPage={1}
          siblingCount={2}
          onPageChange={(page) => console.log(page)}
        />
      </div>
    </div>
  );
};

export default CourseReview;
