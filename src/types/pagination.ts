export type PaginationProps = {
  currentPage?: number;
  totalItems: number;
  offset: number;
  onChange: (page: number) => void;
  maxVisiblePages?: number;
  nextLabel?: React.ReactNode;
  previousLabel?: React.ReactNode;
};
