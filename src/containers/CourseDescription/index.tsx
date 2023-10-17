"use client";

import React from "react";
import CourseDetails from "./CourseDetails";
import CourseVideos from "./CourseVideos";
import { Tabs } from "@/components";
import styles from "./courseDescription.module.css";
import clsx from "clsx";

const CourseDescription = () => {
  const tabs = [
    { title: "Course Details", component: <CourseDetails /> },
    { title: "Course Videos", component: <CourseVideos /> },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={clsx("heading_sm4 container", styles.title)}>
        Course Description
      </h1>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default CourseDescription;
