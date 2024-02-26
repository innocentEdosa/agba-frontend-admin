import { createColumnHelper } from "@tanstack/react-table";
import React, { useMemo } from "react";
import Table from "../Table";
import styles from "./user-list-style.module.css";
import { UserType } from "@/types";
import moment from "moment";

export type AuthorListTableProps = {
  userList: UserType[];
  isLoading?: boolean;
  ref?: React.RefObject<HTMLTableElement>;
};

const columnHelper = createColumnHelper<UserType>();
const UserListTable = ({ userList = [], isLoading }: AuthorListTableProps) => {
  const columns = useMemo(() => {
    return [
      columnHelper.display({
        id: "fullName",
        header: "Full Name",
        cell: (info) => (
          <div className={styles.courseTitleWrapper}>
            <p className={styles.tableRowBoldText}>{`${
              info.row.original?.firstName + " " + info.row.original?.lastName
            }`}</p>
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("phone_number", {
        header: "Phone number",
        cell: (info) => <span>{info?.getValue() || "Not provided"}</span>,
      }),
      columnHelper.accessor("whatsapp_number", {
        header: "Whatsapp Number",
        cell: (info) => <span>{info?.getValue() || "Not provided"}</span>,
      }),
      columnHelper.accessor("account_status", {
        header: "Account Status",
        cell: (info) => (
          <span data-status={info.getValue()} className={styles.status}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("verified_status", {
        header: "Verification Status",
        cell: (info) => (
          <span
            data-status={info.getValue()}
            className={styles.verified_status}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "Date Joined",
        cell: (info) => (
          <span>{moment(info.getValue()).format("dddd, MMM Do YYYY")}</span>
        ),
      }),
    ];
  }, []);

  return (
    <div>
      <Table
        defaultData={userList}
        defaultColumns={columns}
        loading={isLoading}
        // onRowClick={handleRowClick}
      />
    </div>
  );
};

export default UserListTable;
