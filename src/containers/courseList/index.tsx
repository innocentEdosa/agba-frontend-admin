"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import styles from "./courseList.module.css";
import { Button } from "@/atoms";
import {
  AddIcon,
  DirectBoxReceiptIcon,
  OptionsIcon,
  StoryIcon,
} from "@/Vectors";
import CourseListTable from "@/components/CourseListTable";
import CategoryModal from "@/components/CategoryModal";
import clsx from "clsx";
import qs from "qs";

import {
  CreateCourseModal,
  CreateCategoryModal,
  DropdownMenu,
  EditCategoryModal,
  Pagination,
} from "@/components";
import {
  ButtonVariant,
  CategoryType,
} from "@/types";
import { useGetCourses } from "@/api/hooks/queries/course";
import { filterOptions } from "@/constants/filterMappers";
import { CourseStatus } from "@/constants/course";

const initialFilter = [
  {
    key: "status",
    value: CourseStatus.PUBLISHED,
    condition: filterOptions.EQUAL,
  },
];

const CourseList = () => {
  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 20,
  });
  const [showCategoriesModal, setShowCategoriesModal] = React.useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] =
    React.useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] =
    React.useState(false);
  const [editCategory, setEditCategory] = React.useState<CategoryType | null>(
    null
  );
  const { data: coursesData, isLoading } = useGetCourses({
    ...paginationState,
    filter: qs.stringify([...initialFilter]),
  });

  const handleSetEditCategoryId = useCallback((category: CategoryType) => {
    setEditCategory(category);
    setShowCategoriesModal(false);
  }, []);

  const totalPages = coursesData?.meta?.total || 0;

  const courses = useMemo(() => {
    if (!coursesData) return [];
    return coursesData.data;
  }, [coursesData]);

  return (
    <div className={styles.wrapper}>
      <header className={clsx("container", styles.topSection)}>
        <h2 className={styles.heading}>Course List</h2>
        <DropdownMenu
          clasName={styles.actionBtnsMobile}
          toggler={
            <button className={styles.dropdownToggler}>
              <OptionsIcon />
            </button>
          }>
          <Button
            variant={ButtonVariant.Secondary}
            className={styles.dropdownItem}>
            <DirectBoxReceiptIcon />
            <span>Archived Courses</span>
          </Button>
          <Button
            className={styles.dropdownItem}
            variant={ButtonVariant.Neutral}
            onClick={() => setShowCategoriesModal(true)}>
            <StoryIcon />
            <span>Course Categories</span>
          </Button>
          <Button
            className={styles.dropdownItem}
            variant={ButtonVariant.Primary}
            onClick={() => setShowCreateCourseModal(true)}>
            <AddIcon />
            <span>Add Courses</span>
          </Button>
        </DropdownMenu>
        <div className={styles.actionBtnsDesktop}>
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
      </header>
      <section className={styles.courseListWrapper}>
        <CourseListTable courses={courses} />
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
      </section>

      <CategoryModal
        show={showCategoriesModal}
        onDismiss={() => setShowCategoriesModal(false)}
        showCreateCategory={() => setShowCreateCategoryModal(true)}
        onEditCategory={handleSetEditCategoryId}
      />
      <CreateCategoryModal
        show={showCreateCategoryModal}
        onDismiss={() => setShowCreateCategoryModal(false)}
      />
      <EditCategoryModal
        show={!!editCategory}
        onDismiss={() => setEditCategory(null)}
        initialData={editCategory}
      />
      <CreateCourseModal
        show={showCreateCourseModal}
        onDismiss={() => setShowCreateCourseModal(false)}
      />
    </div>
  );
};

export default CourseList;
