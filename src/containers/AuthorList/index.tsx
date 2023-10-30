"use client";

import AuthorListTable from "@/components/AuthorListTable";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./authorList.module.css";
import { Pagination } from "@/components";
import clsx from "clsx";
import { Button } from "@/atoms";
import { ButtonVariant } from "@/types";
import { AddIcon } from "@/Vectors";
import CreateAuthorModal from "@/components/Forms/CreateAuthorModal";
import { useGetAuthors } from "@/api/hooks/queries/authors";

const AuthorList = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 2,
  });
  const { data, isLoading } = useGetAuthors({ ...paginationState });
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
          <Pagination
            offset={paginationState.limit || 0}
            currentPage={paginationState.page || 0}
            totalItems={totalPages}
            onChange={(page) =>
              setPaginationState({ ...paginationState, page })
            }
            maxVisiblePages={3}
          />
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
