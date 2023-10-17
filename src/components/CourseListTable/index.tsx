import { Row, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";
import Table from "../Table";
import CourseThumbnails from "./CourseThumbnails";
import styles from "./courselist.module.css";
import { OptionsIcon } from "@/Vectors";
import { useRouter } from "next/navigation";
import { Course } from "@/types";

// generate an array of five dummy data for the course type above
const dummyData: Course[] = Array.from({ length: 5 }).map((_, index) => ({
  id: `${index}`,
  title: `Course ${index}`,
  description: `Course ${index} description`,
  author: `Author ${index}`,
  category: `Category ${index}`,
  subCategory: `Sub Category ${index}`,
  rating: index,
  status: index % 2 === 0 ? "Active" : "Inactive",
  price: `Price ${index}`,
  createdAt: `Created At ${index}`,
  updatedAt: `Updated At ${index}`,
  thumbnails: [
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
    "https://picsum.photos/50",
  ],
}));

const columnHelper = createColumnHelper<Course>();
const CourseListTable = () => {
  const router = useRouter();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: "Course Title",
        cell: (info) => (
          <div className={styles.courseTitleWrapper}>
            <p className={styles.tableRowBoldText}>{info.getValue()}</p>
            <CourseThumbnails
              thumbnails={info.cell.row.original.thumbnails}
              displayedThumbnails={4}
            />
          </div>
        ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("author", {
        header: "Author",
        cell: (info) => (
          <span className={styles.tableRowBoldText}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => <span>{info.getValue()}</span>,
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
            data-status={info.getValue().toLowerCase()}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: "action",
        header: "",
        cell: (info) => (
          <button className={styles.optionBtn}>
            <OptionsIcon />
          </button>
        ),
      }),
    ];
  }, []);

  const handleRowClick = (row: Row<Course>) => {
    router.push(`/courses/${row.original.title}`);
  };
  return (
    <div>
      <Table
        defaultData={dummyData}
        defaultColumns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default CourseListTable;
