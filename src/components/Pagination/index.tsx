import React, { useCallback } from "react";
import clsx from "clsx";
import { usePagination } from "@/hooks/usePagination";
import styles from "./pagination.module.css";
import getPlural from "@/utils/getPlural";

type PaginationType = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className?: string;
  nextLabel?: React.ReactNode;
  previousLabel?: React.ReactNode;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = "",
  nextLabel = "Next",
  previousLabel = "Previous",
}: PaginationType) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  //   if (currentPage === 0 || paginationRange?.length < 2) {
  //     return null;
  //   }
  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage <= 1) return;
    onPageChange(currentPage - 1);
  };

  const info = useCallback(() => {
    {
      const startIndex = pageSize * (currentPage - 1) + 1;
      const endIndex =
        pageSize * currentPage > totalCount
          ? totalCount
          : pageSize * currentPage;
      let range =
        startIndex === endIndex ? startIndex : `${startIndex} - ${endIndex}`;
      return `Showing ${range} of ${totalCount} ${getPlural(
        totalCount,
        "result"
      )}`;
    }
  }, [totalCount, pageSize, currentPage]);

  return (
    <div className={styles.wrapper}>
      {" "}
      <p className={styles.paginationInfo}>{info()}</p>
      <nav aria-label="pagination">
        <ul
          className={clsx(styles.paginationContainer, {
            [className]: className,
          })}>
          {/* Left navigation arrow */}
          <li
            className={clsx(styles.paginationItem, {
              [styles.pageDisabled]: currentPage === 1,
            })}
            onClick={onPrevious}>
            <a role="button" aria-label="previous page">
              {previousLabel}
            </a>
          </li>
          {paginationRange.map((pageNumber, index) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === "DOTS") {
              return (
                <li key={"page" + index} className="pagination-item dots">
                  <a role="button" aria-label="page break">
                    &#8230;
                  </a>
                </li>
              );
            }

            // Render our Page Pills
            return (
              <li
                key={"page" + index}
                className={clsx(styles.paginationLink, {
                  [styles.paginationActiveLink]: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber as number)}>
                <a
                  role="button"
                  aria-label={`page ${pageNumber}`}
                  tabIndex={-1}>
                  {pageNumber}
                </a>
              </li>
            );
          })}
          {/*  Right Navigation arrow */}
          <li
            className={clsx("pagination-item", {
              [styles.pageDisabled]: currentPage === lastPage,
            })}
            onClick={onNext}>
            <a role="button" aria-label="next page" tabIndex={-1}>
              {nextLabel}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
