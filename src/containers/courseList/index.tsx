"use client";

import React from "react";
import styles from "./courseList.module.css";
import { Button } from "@/atoms";
import { AddIcon, DirectBoxReceiptIcon, StoryIcon } from "@/Vectors";
import CourseListTable from "@/components/CourseListTable";
import Pagination from "@/components/Pagination";
import CategoryModal from "@/components/CategoryModal";
import clsx from "clsx";
import { CreateCategoryModal, CreateCourseModal } from "@/components";
import { ButtonVariant } from "@/types";

const CourseList = () => {
  const [showCategoriesModal, setShowCategoriesModal] = React.useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] =
    React.useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] =
    React.useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={clsx("container", styles.topSection)}>
        <h2 className={styles.heading}>Course List</h2>
        <div className={styles.btnWrapper}>
          <Button variant={ButtonVariant.Secondary}>
            <DirectBoxReceiptIcon />
            <span>Archived Courses</span>
          </Button>
          <Button
            variant={ButtonVariant.Neutral}
            onClick={() => setShowCategoriesModal(true)}>
            <StoryIcon />
            <span>Course Categories</span>
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            onClick={() => setShowCreateCourseModal(true)}>
            <AddIcon />
            <span>Add Courses</span>
          </Button>
        </div>
      </div>
      <div className={styles.courseListWrapper}>
        <CourseListTable />
        <Pagination
          offset={2}
          currentPage={1}
          totalPages={10}
          onChange={(page) => console.log(page)}
          maxVisiblePages={3}
        />
      </div>
      <CategoryModal
        show={showCategoriesModal}
        onDismiss={() => setShowCategoriesModal(false)}
        showCreateCategory={() => setShowCreateCategoryModal(true)}
      />
      <CreateCategoryModal
        show={showCreateCategoryModal}
        onDismiss={() => setShowCreateCategoryModal(false)}
      />
      <CreateCourseModal
        show={showCreateCourseModal}
        onDismiss={() => setShowCreateCourseModal(false)}
      />
    </div>
  );
};

export default CourseList;
