"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import styles from "./courseList.module.css";
import { Button } from "@/atoms";
import {
  AddIcon,
  DirectBoxReceiptIcon,
  HamburgerIcon,
  OptionsIcon,
  StoryIcon,
} from "@/Vectors";
import CourseListTable from "@/components/CourseListTable";
import Pagination from "@/components/Pagination";
import CategoryModal from "@/components/CategoryModal";
import clsx from "clsx";
import {
  CreateCategoryModal,
  CreateCourseModal,
  CreateVideoModal,
  DropdownMenu,
} from "@/components";
import { ButtonVariant, CreateCategoryParam } from "@/types";
import { useGetCategories } from "@/api/hooks/queries/categories";
import { useGetCourses } from "@/api/hooks/queries/course";
import { useCreateCategory } from "@/api/hooks/mutations/categories";
import { toast } from "react-toastify";

const CourseList = () => {
  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 2,
  });
  const { data: coursesData, isLoading } = useGetCourses({
    ...paginationState,
  });
  const [showCategoriesModal, setShowCategoriesModal] = React.useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] =
    React.useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] =
    React.useState(false);
  const { mutate: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategory();

  const handleCreateCategory = useCallback(
    (params: CreateCategoryParam, cb?: () => void) => {
      createCategory(params, {
        onSuccess: () => {
          toast.success("Category created successfully");
          cb?.();
          setShowCreateCategoryModal(false);
        },
      });
    },
    []
  );

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
            offset={paginationState.limit}
            currentPage={paginationState.page}
            totalItems={totalPages}
            onChange={(page) => console.log(page)}
            maxVisiblePages={3}
          />
        </div>
      </section>

      <CategoryModal
        show={showCategoriesModal}
        onDismiss={() => setShowCategoriesModal(false)}
        showCreateCategory={() => setShowCreateCategoryModal(true)}
      />
      <CreateCategoryModal
        type="Create"
        show={showCreateCategoryModal}
        onDismiss={() => setShowCreateCategoryModal(false)}
        action={handleCreateCategory}
        isPending={isCreateCategoryPending}
      />
      <CreateCourseModal
        show={showCreateCourseModal}
        onDismiss={() => setShowCreateCourseModal(false)}
      />
    </div>
  );
};

export default CourseList;
