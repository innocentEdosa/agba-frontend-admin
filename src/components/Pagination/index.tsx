import { useCallback, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.css";
import { PaginationProps } from "@/types";

const Pagination = ({
  currentPage = 1,
  totalItems,
  offset,
  onChange,
  maxVisiblePages,
  nextLabel = "Next",
  previousLabel = "Previous",
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);
  const handlePageClick = useCallback((data: { selected: number }) => {
    onChange(data.selected + 1);
    setPage(data.selected + 1);
  }, []);
  const totalPages = Math.ceil(totalItems / offset);

  return (
    <div className={styles.wrapper}>
      <p className={styles.paginationInfo}>
        {`Showing ${offset * (page - 1) + 1} - ${
          offset * page > totalItems ? totalItems : offset * page
        } of ${totalItems} results`}
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
