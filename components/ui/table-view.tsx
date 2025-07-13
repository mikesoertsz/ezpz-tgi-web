import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  onSort?: () => void;
  sortIcon?: React.ReactNode;
  className?: string;
};

export default function TableView<T>({
  columns,
  data,
  renderRow,
}: {
  columns: TableColumn<T>[];
  data: T[];
  renderRow: (row: T) => React.ReactNode;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key as string}
              onClick={col.onSort}
              className={col.className}
              style={{ cursor: col.onSort ? "pointer" : undefined }}
            >
              {col.label}
              {col.sortIcon && <span className="ml-1">{col.sortIcon}</span>}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{data.map((row, idx) => renderRow(row))}</TableBody>
    </Table>
  );
}
