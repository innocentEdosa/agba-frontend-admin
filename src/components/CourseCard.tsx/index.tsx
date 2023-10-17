import React from "react";
import Link from "next/link";
import styles from "./movieCard.module.css";

const CourseCard = () => {
  return (
    <Link href={`/courses/hello-world`} className={styles.wrapper}>
      <img
        className={styles.image}
        src="https://via.placeholder.com/150"
        alt="movie"
      />
      <div>
        <div>
          <span className={styles.text}>46m</span>
          <span className={styles.text}>3,890 Students</span>
        </div>
        <h3 className={styles.title}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          nobis!
        </h3>
        <span className={styles.text}>Declan Ojo</span>
      </div>
    </Link>
  );
};

export default CourseCard;
