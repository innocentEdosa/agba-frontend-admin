"use client";

import React, { useState } from "react";
import CourseDetails from "./CourseDetails";
import CourseVideos from "./CourseVideos";
import { CreateVideoModal, Tabs } from "@/components";
import styles from "./courseDescription.module.css";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { Button } from "@/atoms";
import { AddIcon } from "@/Vectors";

const CourseDescription = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showCreateVideoModal, setShowCreateVideoModal] = useState(false);
  const tabs = [
    { title: "Course Details", component: <CourseDetails /> },
    { title: "Course Videos", component: <CourseVideos /> },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={clsx(styles.header, "container")}>
        <h1 className="heading_sm4">Course Description</h1>
        {tabs[selectedTab].title === "Course Videos" && (
          <Button onClick={() => setShowCreateVideoModal(true)}>
            <AddIcon />
            <span>Add Video</span>
          </Button>
        )}
      </div>
      <Tabs tabs={tabs} onChange={(index) => setSelectedTab(index)} />
      <CreateVideoModal
        show={showCreateVideoModal}
        onDismiss={() => setShowCreateVideoModal(false)}
      />
    </div>
  );
};

export default CourseDescription;
