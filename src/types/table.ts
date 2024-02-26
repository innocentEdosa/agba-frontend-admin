import { Row } from "@tanstack/react-table";

export type TablePropsType<T extends Record<string, any>> = {
  onMouseEnter?: (row: Row<T>) => void;
  onMouseLeave?: (row: Row<T>) => void;
  onRowClick?: (row: Row<T>) => void;
  defaultData: T[];
  defaultColumns: any[];
  enableRowSelection?: boolean;
  canSort?: boolean;
  canExpand?: boolean;
  onSelectRowHandler?: (row: T[]) => void;
  loading?: boolean;
};
