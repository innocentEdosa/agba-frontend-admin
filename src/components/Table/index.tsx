import React, { useEffect, useMemo, useState } from "react";
import {
  Header,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import { TablePropsType } from "@/types";

const Table = <T extends Record<string, any>>({
  defaultColumns,
  defaultData,
  enableRowSelection,
  onRowClick,
  canSort,
}: TablePropsType<T>) => {
  const [data, setData] = useState<Row<T>[]>(
    () => [...defaultData] as unknown as Row<T>[]
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData([...defaultData] as unknown as Row<T>[]);
  }, [defaultData]);

  const columns = useMemo(() => {
    return [...(defaultColumns || [])];
  }, [defaultColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...(canSort ? { sorting } : {}),
      ...(enableRowSelection ? { rowSelection } : {}),
    },
    ...(canSort
      ? {
          getSortedRowModel: getSortedRowModel(),
          onSortingChange: setSorting,
        }
      : {}),
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
  });

  const conditionalHeaderProps = (header: Header<any, unknown>) => ({
    ...(canSort
      ? {
          onClick: header.column.getToggleSortingHandler(),
        }
      : {}),
  });

  const onRowClickHandler = (row: Row<T>) => (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    onRowClick?.(row);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        data-sorted={header?.id === sorting?.[0]?.id}
                        className="table-headerWrapper"
                        {...conditionalHeaderProps(header)}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row: any) => (
            <tr data-checked={row.getIsSelected()} key={row.id}>
              {row.getVisibleCells().map((cell: any) => {
                return (
                  <td onClick={onRowClickHandler(row)} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
