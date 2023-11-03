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
          totalCount={12}
          pageSize={1}
          currentPage={1}
          siblingCount={1}
          onPageChange={(page) => console.log(page)}
        />
      </div>
    </div>
  );
};

export default ArchivedCourses;
