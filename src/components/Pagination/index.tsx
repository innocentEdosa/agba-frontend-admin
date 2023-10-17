import { useCallback } from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.css";
import { PaginationProps } from "@/types";

const Pagination = ({
  currentPage,
  totalPages,
  offset,
  onChange,
  maxVisiblePages,
  nextLabel = "Next",
  previousLabel = "Previous",
}: PaginationProps) => {
  const handlePageClick = useCallback((data: { selected: number }) => {
    onChange(data.selected + 1);
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.paginationInfo}>
        {`Showing ${currentPage * offset - offset + 1} - ${
          currentPage * offset
        } of ${totalPages * offset}`}
      </p>
      <ReactPaginate
        containerClassName={styles.paginationContainer}
        pageLinkClassName={styles.paginationLink}
        activeLinkClassName={styles.paginationActiveLink}
        breakLabel="..."
        nextLabel={nextLabel}
        previousLabel={previousLabel}
        onPageChange={handlePageClick}
        pageRangeDisplayed={maxVisiblePages || 3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
