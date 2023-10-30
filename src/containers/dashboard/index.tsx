"use client";

import CourseListTable from "@/components/CourseListTable";
import DashboardOverview from "@/components/DashboardOverview";
import Link from "next/link";
import React from "react";
import styles from "./dashboard.module.css";
import clsx from "clsx";
import { useGetCourses } from "@/api/hooks/queries/course";

const DashboardContainer = () => {
  const { data: coursesData, isLoading } = useGetCourses({
    limit: 5,
    page: 1,
  });
  const courses = React.useMemo(() => {
    if (!coursesData) return [];
    return coursesData.data;
  }, [coursesData]);

  return (
    <div className={styles.wrapper}>
      <DashboardOverview />
      <div className={styles.courseListWrapper}>
        <div className={clsx("container", styles.headingWrapper)}>
          <h2 className="heading_sm4">Course List</h2>
          <Link href="/courses" className={styles.link}>
            View All
          </Link>
        </div>
        <CourseListTable courses={courses} />
      </div>
    </div>
  );
};

export default DashboardContainer;
