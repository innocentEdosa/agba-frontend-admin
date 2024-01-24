import { Row, createColumnHelper } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import Table from "../Table";
import styles from "./authorlist.module.css";
import {
  DirectBoxReceiptIcon,
  Edit2Icon,
  OptionsIcon,
  TrashIcon,
} from "@/Vectors";
import { useRouter } from "next/navigation";
import { Author, ButtonGenre, ButtonVariant } from "@/types";
import ThumbnailsGroup from "../ThumbnailsGroup";
import { Button } from "@/atoms";
import DropdownMenu from "../DropdownMenu";
import ConfirmationModal from "../ConfirmationModal";
import EditAuthorModal from "../Forms/AuthorActionModal/EditAuthorModal";
import {
  useArchiveAuthor,
  useDeleteAuthor,
} from "@/api/hooks/mutations/author";
import { toast } from "react-toastify";
import Description from "../DescriptiveText";

export type AuthorListTableProps = {
  authorList: Author[];
};

const columnHelper = createColumnHelper<Author>();
const AuthorListTable = ({ authorList = [] }: AuthorListTableProps) => {
  const [authorToEdit, setAuthorToEdit] = useState<Author | null>(null);
  const [authorToDeleteId, setAuthorToDeleteId] = useState<string | null>(null);
  const [authorToArchiveId, setAuthorToArchiveId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const deleteAuthorMutation = useDeleteAuthor();
  const archiveAuthorMutation = useArchiveAuthor();

  const handleDeleteCourse = async (id: string) => {
    await deleteAuthorMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Author deleted successfully");
        setAuthorToDeleteId(null);
      },
      onError: () => {
        toast.error("An error occured while deleting this author");
      },
    });
  };

  const handleArchiveCourse = async (id: string) => {
    await archiveAuthorMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Author was deactivated successfully");
        setAuthorToArchiveId(null);
      },
      onError: () => {
        toast.error("An error occured while deactivating this author");
      },
    });
  };

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
          <Description
            text={info.getValue() ?? "No Bio yet"}
            maxWordCount={20}
          />
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
              variant={ButtonVariant.Secondary}
              className={styles.actionBtn}
              onClick={(e) => {
                setAuthorToArchiveId(info.row.original.id);
              }}>
              <DirectBoxReceiptIcon size={12} />
              <span>Deactivate</span>
            </Button>
            <Button
              genre={ButtonGenre.Text}
              variant={ButtonVariant.Danger}
              className={styles.actionBtn}
              onClick={() => setAuthorToDeleteId(info.row.original.id)}>
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
      <ConfirmationModal
        show={!!authorToDeleteId}
        title="Delete Author"
        message="Are you sure you want to delete this Author? This action can not be reversed, If you don't want this author to be visible to users, then deactivate the author instead"
        cancelAction={() => setAuthorToDeleteId(null)}
        isActionProcessing={deleteAuthorMutation.isPending}
        confirmationAction={() => handleDeleteCourse(authorToDeleteId!)}
      />
      <ConfirmationModal
        show={!!authorToArchiveId}
        title="Deactivate Author"
        message="Are you sure you want to deactivate this Author? Once deactivated, this author will no longer be available to the public unless this action is reversed"
        cancelAction={() => setAuthorToArchiveId(null)}
        confirmationAction={() => handleArchiveCourse(authorToArchiveId!)}
        confirmationText="Yes, i want to deactivate"
        actionBtnVariant={ButtonVariant.Secondary}
        isActionProcessing={archiveAuthorMutation.isPending}
        showIcon={false}
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
