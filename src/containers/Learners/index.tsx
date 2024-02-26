"use client";

import React, { useMemo } from "react";
import styles from "./userlist.module.css";
import clsx from "clsx";
import qs from "qs";
import * as xlsx from "xlsx";

import { Pagination } from "@/components";
import { filterOptions } from "@/constants/filterMappers";
import { UserRoles } from "@/constants/user";
import { useGetUsers } from "@/api/hooks/queries/user";
import UserListTable from "@/components/UserListTable";
import { Button, TextField } from "@/atoms";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";
import { ExportIcon } from "@/Vectors";

const initialFilter = [
  {
    key: "role",
    value: UserRoles.Akeko,
    condition: filterOptions.EQUAL,
  },
];

const UserList = () => {
  const tableWrapperRef = React.useRef<HTMLElement>(null);
  const [paginationState, setPaginationState] = React.useState({
    page: 1,
    limit: 20,
  });
  const { data: usersData, isLoading } = useGetUsers({
    ...paginationState,
    filter: qs.stringify([...initialFilter]),
  });

  const totalPages = usersData?.meta?.total || 0;

  const users = useMemo(() => {
    if (!usersData) return [];
    return usersData.data;
  }, [usersData]);

  const handleLimitChange = useDebouncedCallback((val: string) => {
    if (!!val) {
      setPaginationState({
        page: 1,
        limit: Number(val),
      });
    }
  }, 300);

  const exportToExcelDoc = async () => {
    const workbook = xlsx.utils.table_to_book(tableWrapperRef.current);
    xlsx.writeFile(
      workbook,
      `LifeBeyondClass-Learners-List-${moment().format("YYYY-MM-DD")}.xlsx`
    );
  };

  return (
    <div className={styles.wrapper}>
      <header className={clsx("container", styles.topSection)}>
        <h2 className={styles.heading}>Learners List</h2>
        <div className={styles.actionBtns}>
          <TextField
            type="number"
            onChange={(e) => handleLimitChange(e.target.value)}
            defaultValue={paginationState.limit}
            placeholder="Users per page"
          />
          <Button onClick={exportToExcelDoc}>
            <ExportIcon />
            <span>Export to excel</span>
          </Button>
        </div>
        {/* <DropdownMenu
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
        </DropdownMenu> */}
        {/* <div className={styles.actionBtnsDesktop}></div> */}
      </header>
      <section ref={tableWrapperRef} className={styles.courseListWrapper}>
        <UserListTable userList={users} isLoading={isLoading} />
        <div className="container">
          {!!users?.length && (
            <Pagination
              totalCount={totalPages}
              pageSize={paginationState.limit}
              currentPage={paginationState.page}
              siblingCount={2}
              onPageChange={(page) => {
                setPaginationState((prev) => ({ ...prev, page }));
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default UserList;
