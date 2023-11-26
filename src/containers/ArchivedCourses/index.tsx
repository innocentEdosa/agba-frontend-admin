"use client";

import React, { useMemo } from "react";
import styles from "./archivedCourses.module.css";
import clsx from "clsx";
import { Pagination, CourseCard } from "@/components";
import qs from "qs";
import { useGetCourses } from "@/api/hooks/queries/course";
import { filterOptions } from "@/constants/filterMappers";
import { CourseStatus } from "@/constants/course";

const initialFilter = [
  {
    key: "status",
    value: CourseStatus.ARCHIVED,
    condition: filterOptions.EQUAL,
  },
];

const ArchivedCourses = () => {
  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 20,
  });

  const { data: coursesData, isLoading } = useGetCourses({
    ...paginationState,
    filter: qs.stringify([...initialFilter]),
  });
  const totalPages = coursesData?.meta?.total || 0;

  const courses = useMemo(() => {
    if (!coursesData) return [];
    return coursesData.data;
  }, [coursesData]);

  return (
    <div className={styles.wrapper}>
      <h1 className={clsx("container", styles.title)}>Archived Courses</h1>
      <div className={styles.courses}>
        {!!courses.length &&
          courses.map((course, i) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
      <div className="container">
        <Pagination
          totalCount={totalPages}
          pageSize={paginationState.limit}
          currentPage={paginationState.page}
          siblingCount={2}
          onPageChange={(page) => {
            setPaginationState((prev) => ({ ...prev, page }));
          }}
        />
      </div>
    </div>
  );
};

export default ArchivedCourses;
