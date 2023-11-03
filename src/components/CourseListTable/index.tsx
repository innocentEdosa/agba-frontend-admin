import { Row, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import Table from "../Table";
import styles from "./courselist.module.css";
import {
  DirectBoxReceiptIcon,
  Edit2Icon,
  OptionsIcon,
  TrashIcon,
} from "@/Vectors";
import { useRouter } from "next/navigation";
import { ButtonGenre, ButtonVariant, Course } from "@/types";
import ThumbnailsGroup from "../ThumbnailsGroup";
import DropdownMenu from "../DropdownMenu";
import { Button } from "@/atoms";
import DeleteModal from "../DeleteModal";
import EditCourseModal from "../Forms/CourseActionModal/EditCourseModal";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import AvatarGroup from "../AvatarGroup";

const columnHelper = createColumnHelper<Course>();
const CourseListTable = ({ courses = [] }: { courses: Course[] }) => {
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const router = useRouter();
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: "Course Title",
        cell: (info) => (
          <Link
            href={`/courses/${info.row.original.slug}`}
            className={styles.courseTitleWrapper}>
            <p className={styles.tableRowBoldText}>{info.getValue()}</p>
            {/* <ThumbnailsGroup
              thumbnails={info.cell.row.original.thumbnails}
              displayedThumbnails={4}
            /> */}
          </Link>
        ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("authors", {
        header: "Author",
        cell: (info) => (
          <AvatarGroup
            avatars={info.getValue().map((author) => author.avatar)}
            maxDisplay={3}
          />
        ),
      }),
      columnHelper.accessor("price_value", {
        header: "Price",
        cell: (info) => (
          <span>{formatCurrency(info.getValue()!) || "N/A"}</span>
        ),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("subCategory", {
        header: "Sub category",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("rating", {
        header: "Rating",
        cell: (info) => (
          <span className={styles.rating}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={styles.status}
            data-status={info.getValue()?.toLowerCase()}>
            {info.getValue() || "N/A"}
          </span>
        ),
      }),
      columnHelper.display({
        id: "action",
        header: "",
        cell: (info) => (
          <DropdownMenu
            toggler={
              <button className={styles.optionBtn}>
                <OptionsIcon />
              </button>
            }>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Neutral}
              className={styles.actionBtn}
              onClick={() => setCourseToEdit(info.row.original)}>
              <Edit2Icon size={12} />
              <span>Edit</span>
            </Button>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Secondary}
              className={styles.actionBtn}>
              <DirectBoxReceiptIcon size={12} />
              <span>Archive</span>
            </Button>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Danger}
              className={styles.actionBtn}
              onClick={(e) => {
                // e.stopPropagation();
                setShowDeleteCourseModal(true);
              }}>
              <TrashIcon size={12} />
              <span>Delete</span>
            </Button>
          </DropdownMenu>
        ),
      }),
    ];
  }, []);

  const handleRowClick = (row: Row<Course>) => {
    router.push(`/courses/${row.original.slug}`);
  };
  return (
    <div>
      <Table
        defaultData={courses}
        defaultColumns={columns}
        // onRowClick={handleRowClick}
      />
      <DeleteModal
        show={showDeleteCourseModal}
        title="Delete Course"
        message="Are you sure you want to delete this video? This action can not be reversed."
        cancelAction={() => setShowDeleteCourseModal(false)}
        confirmationAction={() => {}}
      />
      <EditCourseModal
        show={!!courseToEdit}
        onDismiss={() => setCourseToEdit(null)}
        initialData={courseToEdit}
      />
    </div>
  );
};

export default CourseListTable;
