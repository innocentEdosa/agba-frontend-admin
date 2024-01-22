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
import DropdownMenu from "../DropdownMenu";
import { Button } from "@/atoms";
import ConfirmationModal from "../ConfirmationModal";
import EditCourseModal from "../Forms/CourseActionModal/EditCourseModal";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import AvatarGroup from "../AvatarGroup";
import {
  useArchiveCourse,
  useDeleteCourse,
} from "@/api/hooks/mutations/courses";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper<Course>();
const CourseListTable = ({ courses = [] }: { courses: Course[] }) => {
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [courseToDeleteId, setCourseToDeleteId] = useState<string | null>(null);
  const [courseToArchiveId, setCourseToArchiveId] = useState<string | null>(
    null
  );
  const router = useRouter();
  const deleteCourseMutation = useDeleteCourse();
  const archiveCourseMutation = useArchiveCourse();

  const handleDeleteCourse = async (id: string) => {
    await deleteCourseMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Course deleted successfully");
        setCourseToDeleteId(null);
      },
      onError: () => {
        toast.error("An error occured while deleting course");
      },
    });
  };

  const handleArchiveCourse = async (id: string) => {
    await archiveCourseMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Course has been moved to archive");
        setCourseToArchiveId(null);
      },
      onError: () => {
        toast.error("An error occured while archiving course");
      },
    });
  };

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: "Course Title",
        cell: (info) => (
          <Link
            href={`/courses/${info.row.original.slug}`}
            className={styles.courseTitleWrapper}>
            <p className={styles.tableRowBoldText}>{info.getValue()}</p>
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
            avatars={info.getValue()?.map((author) => author?.avatar)}
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
        cell: (info) => <span>{info?.getValue()?.title || "No category"}</span>,
      }),
      columnHelper.accessor("sub_category", {
        header: "Sub category",
        cell: (info) => (
          <span>{info?.getValue()?.title || "No sub category"}</span>
        ),
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
              className={styles.actionBtn}
              onClick={(e) => {
                setCourseToArchiveId(info.row.original.id);
              }}>
              <DirectBoxReceiptIcon size={12} />
              <span>Archive</span>
            </Button>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Danger}
              className={styles.actionBtn}
              onClick={() => {
                setCourseToDeleteId(info.row.original.id);
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
      <ConfirmationModal
        show={!!courseToDeleteId}
        title="Delete Course"
        message="Are you sure you want to delete this Course? This action can not be reversed. If you don't want the course to be visible to users, you can archive it instead"
        cancelAction={() => setCourseToDeleteId(null)}
        confirmationAction={() => handleDeleteCourse(courseToDeleteId!)}
        isActionProcessing={deleteCourseMutation.isPending}
      />
      <ConfirmationModal
        show={!!courseToArchiveId}
        title="Archive Course"
        message="Are you sure you want to archive this Course? Once archived, this course will no longer be available to the public unless this action is reversed"
        cancelAction={() => setCourseToArchiveId(null)}
        confirmationAction={() => handleArchiveCourse(courseToArchiveId!)}
        confirmationText="Yes, i want to archive it"
        actionBtnVariant={ButtonVariant.Secondary}
        isActionProcessing={archiveCourseMutation.isPending}
        showIcon={false}
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
