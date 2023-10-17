"use client";

import CourseListTable from "@/components/CourseListTable";
import DashboardOverview from "@/components/DashboardOverview";
import Link from "next/link";
import React from "react";
import styles from "./dashboard.module.css";
import clsx from "clsx";

const DashboardContainer = () => {
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
        <CourseListTable />
      </div>
    </div>
  );
};

export default DashboardContainer;
