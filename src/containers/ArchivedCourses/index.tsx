"use client";

import React from "react";
import styles from "./archivedCourses.module.css";
import clsx from "clsx";
import { Pagination, CourseCard } from "@/components";

const ArchivedCourses = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={clsx("container", styles.title)}>Archived Courses</h1>
      <div className={styles.courses}>
        {Array.from({ length: 12 }).map((_, i) => (
          <CourseCard key={i} />
        ))}
      </div>
      <div className="container">
        <Pagination
          currentPage={1}
          totalItems={10}
          offset={3}
          onChange={(page) => console.log(page)}
        />
      </div>
    </div>
  );
};

export default ArchivedCourses;
