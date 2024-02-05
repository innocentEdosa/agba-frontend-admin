"use client";

import CourseListTable from "@/components/CourseListTable";
import DashboardOverview from "@/components/DashboardOverview";
import Link from "next/link";
import React from "react";
import styles from "./dashboard.module.css";
import clsx from "clsx";
import { useGetCourses } from "@/api/hooks/queries/course";
import { CourseStatus } from "@/constants/course";
import { filterOptions } from "@/constants/filterMappers";
import qs from "qs";
import { useGetUsersCount } from "@/api/hooks/queries/user";
import { useGetAuthorsCount } from "@/api/hooks/queries/authors";

const initialFilter = [
  {
    key: "status",
    value: CourseStatus.PUBLISHED,
    condition: filterOptions.EQUAL,
  },
];

const DashboardContainer = () => {
  const { data: coursesData, isLoading } = useGetCourses({
    limit: 5,
    page: 1,
    filter: qs.stringify([...initialFilter]),
  });
  const { data: usersCount } = useGetUsersCount();
  const { data: authorsCount } = useGetAuthorsCount();
  const courses = React.useMemo(() => {
    if (!coursesData) return [];
    return coursesData.data;
  }, [coursesData]);

  return (
    <div className={styles.wrapper}>
      <DashboardOverview
        usersCount={usersCount?.count || 0}
        authorsCount={authorsCount?.count || 0}
        dailyVisitors={0}
        onlineLearners={0}
      />
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
