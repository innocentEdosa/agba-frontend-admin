import React from "react";
import Link from "next/link";
import styles from "./movieCard.module.css";
import { Course } from "@/types";

const CourseCard = ({ course }: { course: Course }) => {
  const authorName = `${course.authors[0].first_name} ${course.authors[0].last_name}`;
  return (
    <Link href={`/courses/${course.slug}`} className={styles.wrapper}>
      <img
        className={styles.image}
        src={course?.avatar?.cloudinary_url}
        alt=""
      />
      <div>
        <div>
          <span className={styles.text}>46m</span>
          <span className={styles.text}>3,890 Students</span>
        </div>
        <h3 className={styles.title}>{course.title}</h3>
        <span className={styles.text}>{authorName}</span>
      </div>
    </Link>
  );
};

export default CourseCard;
