import { Row, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import Table from "../Table";
import styles from "./authorlist.module.css";
import { Edit2Icon, OptionsIcon, TrashIcon } from "@/Vectors";
import { useRouter } from "next/navigation";
import { Author, ButtonGenre, ButtonVariant } from "@/types";
import ThumbnailsGroup from "../ThumbnailsGroup";
import { Button } from "@/atoms";
import DropdownMenu from "../DropdownMenu";
import DeleteModal from "../DeleteModal";
import EditAuthorModal from "../Forms/AuthorActionModal/EditAuthorModal";

export type AuthorListTableProps = {
  authorList: Author[];
};

const columnHelper = createColumnHelper<Author>();
const AuthorListTable = ({ authorList = [] }: AuthorListTableProps) => {
  const [showDeleteAuthorModal, setShowDeleteAuthorModal] = useState(false);
  const [authorToEdit, setAuthorToEdit] = useState<Author | null>(null);
  const router = useRouter();

  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: "fullName",
        header: "Full Name",
        cell: (info) => (
          <div className={styles.courseTitleWrapper}>
            <p className={styles.tableRowBoldText}>{`${
              info.row.original.first_name + " " + info.row.original.last_name
            }`}</p>
            {/* <ThumbnailsGroup
              thumbnails={info.cell.row.original?.thumbnails!}
              displayedThumbnails={2}
            /> */}
          </div>
        ),
      }),
      columnHelper.accessor("details", {
        header: "Short Bio",
        cell: (info) => (
          <span className={styles.bio}>{info.getValue() ?? "No Bio yet"}</span>
        ),
      }),
      columnHelper.accessor("work_history", {
        header: "Author",
        cell: (info) => (
          <span className={styles.tableRowBoldText}>{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("email", {
        header: "email",
        cell: (info) => (
          <a href={`mailto:${info.getValue()}`} className={styles.link}>
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("website", {
        header: "Website",
        cell: (info) =>
          info.getValue() ? (
            <a href={info.getValue()} className={styles.link}>
              {info.getValue()}
            </a>
          ) : (
            <span>None provided</span>
          ),
      }),
      columnHelper.accessor("linkedIn", {
        header: "LinkedIn",
        cell: (info) =>
          info.getValue() ? (
            <a href={info.getValue()} className={styles.link}>
              {info.getValue()}
            </a>
          ) : (
            <span>None provided</span>
          ),
      }),
      columnHelper.accessor("is_featured", {
        header: "Featured",
        cell: (info) => (
          <span className={styles.featured} data-featured={info.getValue()}>
            {!!info.getValue() ? "Yes" : "No"}
          </span>
        ),
      }),
      columnHelper.accessor("rating", {
        header: "Rating",
        cell: (info) => (
          <span className={styles.rating}>{info.getValue()}</span>
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
              onClick={() => setAuthorToEdit(info.row.original)}>
              <Edit2Icon size={12} />
              <span>Edit</span>
            </Button>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Danger}
              className={styles.actionBtn}
              onClick={() => setShowDeleteAuthorModal(true)}>
              <TrashIcon size={12} />
              <span>Delete</span>
            </Button>
          </DropdownMenu>
        ),
      }),
    ];
  }, []);

  const handleRowClick = (row: Row<Author>) => {
    router.push(`/authors/${row.original.first_name}/courses`);
  };
  return (
    <div>
      <Table
        defaultData={authorList}
        defaultColumns={columns}
        // onRowClick={handleRowClick}
      />
      <DeleteModal
        show={showDeleteAuthorModal}
        title="Delete Course"
        message="Are you sure you want to delete this video? This action can not be reversed."
        cancelAction={() => setShowDeleteAuthorModal(false)}
        confirmationAction={() => {}}
      />
      <EditAuthorModal
        show={!!authorToEdit}
        onDismiss={() => setAuthorToEdit(null)}
        initialData={authorToEdit}
      />
    </div>
  );
};

export default AuthorListTable;
