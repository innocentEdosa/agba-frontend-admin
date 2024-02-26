"use client";

import React, { useEffect, useState } from "react";
import CourseDetails from "./CourseDetails";
import CourseVideos from "./CourseVideos";
import { CreateVideoModal, Tabs } from "@/components";
import styles from "./courseDescription.module.css";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { Button } from "@/atoms";
import { AddIcon } from "@/Vectors";
import { useGetCourseBySlug } from "@/api/hooks/queries/course";
import useQueryParams from "@/hooks/useQueryParams";

const queryKey = "tab";
const CourseDescription = () => {
  const [showCreateVideoModal, setShowCreateVideoModal] = useState(false);
  const { addQueryParam, getQueryParam } = useQueryParams();
  const params = useParams();
  const { data: course, isLoading } = useGetCourseBySlug(
    params?.slug as string
  );
  
  const tabs = [
    {
      title: "Course Details",
      component: <CourseDetails course={course} isCourseLoading={isLoading} />,
    },
    {
      title: "Course Videos",
      component: <CourseVideos courseId={course?.id} />,
    },
  ];
  const [defaultTabIndex, _] = React.useState(() => {
    if (!getQueryParam(queryKey)) return 0;
    return (
      tabs.findIndex((tab) => tab.title.includes(getQueryParam(queryKey)!)) || 0
    );
  });
  const [selectedTab, setSelectedTab] = React.useState(defaultTabIndex);

  const handleTabChange = (index: number) => {
    addQueryParam(queryKey, tabs[index].title);
    setSelectedTab(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.header, "container")}>
        <h1 className="heading_sm4">Course Description</h1>
        {tabs[selectedTab]?.title === "Course Videos" && (
          <Button onClick={() => setShowCreateVideoModal(true)}>
            <AddIcon />
            <span>Add Video</span>
          </Button>
        )}
      </div>
      <Tabs
        tabs={tabs}
        onChange={handleTabChange}
        defaultTab={defaultTabIndex}
      />
      <CreateVideoModal
        courseId={course?.id!}
        show={showCreateVideoModal}
        onDismiss={() => setShowCreateVideoModal(false)}
      />
    </div>
  );
};

export default CourseDescription;
