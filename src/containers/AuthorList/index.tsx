"use client";

import AuthorListTable from "@/components/AuthorListTable";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./authorList.module.css";
import { CreateAuthorModal, Pagination } from "@/components";
import clsx from "clsx";
import { Button } from "@/atoms";
import { ButtonVariant } from "@/types";
import { AddIcon } from "@/Vectors";
import { useGetAuthors } from "@/api/hooks/queries/authors";
import { AuthorStatus } from "@/constants/author";
import { filterOptions } from "@/constants/filterMappers";
import qs from "qs";

const initialFilter = [
  {
    key: "status",
    value: AuthorStatus.ACTIVE,
    condition: filterOptions.EQUAL,
  },
];

const AuthorList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 20,
  });
  const { data, isLoading } = useGetAuthors({
    ...paginationState,
    filter: qs.stringify([...initialFilter]),
  });
  const totalPages = data?.meta?.total || 0;

  const authorList = useMemo(() => {
    return data?.data || [];
  }, [data]);

  return (
    <div>
      <header className={clsx(styles.topSection, "container")}>
        <h2 className={styles.heading}>Author List</h2>
        <Button
          variant={ButtonVariant.Primary}
          onClick={() => setShowCreateModal(true)}>
          <AddIcon />
          <span>Add New Author</span>
        </Button>
      </header>
      <section className={styles.authorListWrapper}>
        <AuthorListTable authorList={authorList} />
        <div className="container">
          {!!authorList.length && (
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
      <CreateAuthorModal
        show={showCreateModal}
        onDismiss={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default AuthorList;
