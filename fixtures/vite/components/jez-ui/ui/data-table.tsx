"use client";
import * as React from "react";
import { cn } from "./utils";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { SearchInput } from "./search-input";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Columns3 } from "lucide-react";
import { Checkbox } from "./checkbox";
import { Popover } from "./popover";
import { Button } from "./button";
export function DataTable<T>({
  data,
  columns,
  label = "Records",
  className,
  selectable = false,
  onSelectionChange,
}: {
  data: T[];
  columns: ColumnDef<T, any>[];
  label?: string;
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (rows: T[]) => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  React.useEffect(() => {
    onSelectionChange?.(data.filter((_, i) => rowSelection[String(i)]));
  }, [data, rowSelection, onSelectionChange]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: filter, columnVisibility, rowSelection },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <SearchInput
          aria-label={`Search ${label}`}
          placeholder={`Search ${label.toLowerCase()}…`}
          value={filter}
          onValueChange={setFilter}
          className="max-w-xs"
        />
        <Popover
          trigger={
            <Button
              variant="outline"
              size="sm"
              aria-label="Choose visible columns"
            >
              <Columns3 size={14} />
              <span className="hidden sm:inline">Columns</span>
            </Button>
          }
        >
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            Visible columns
          </p>
          <div className="grid gap-3">
            {table.getAllLeafColumns().map((column) => (
              <label
                key={column.id}
                className="flex items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                  disabled={
                    column.getIsVisible() &&
                    table.getVisibleLeafColumns().length === 1
                  }
                />
                {typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id}
              </label>
            ))}
          </div>
        </Popover>
      </div>
      <p className="text-xs text-muted-foreground sm:hidden">
        Scroll horizontally to see all columns.
      </p>
      <div
        tabIndex={0}
        aria-label={`${label} table, scroll horizontally for more columns`}
        className="overflow-x-auto border-y border-border"
      >
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{label}</caption>
          <thead className="bg-muted/30 text-xs text-muted-foreground">
            {table.getHeaderGroups().map((g) => (
              <tr key={g.id}>
                {selectable && (
                  <th className="w-10 pl-4">
                    <Checkbox
                      aria-label="Select all rows on this page"
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected()
                          ? "indeterminate"
                          : false)
                      }
                      onCheckedChange={(v) =>
                        table.toggleAllPageRowsSelected(!!v)
                      }
                    />
                  </th>
                )}
                {g.headers.map((h) => (
                  <th
                    key={h.id}
                    aria-sort={
                      h.column.getIsSorted() === "asc"
                        ? "ascending"
                        : h.column.getIsSorted() === "desc"
                          ? "descending"
                          : undefined
                    }
                    className="whitespace-nowrap px-4 py-3 font-medium"
                  >
                    {h.column.getCanSort() ? (
                      <button
                        className="flex items-center gap-2 transition-colors hover:text-foreground"
                        onClick={h.column.getToggleSortingHandler()}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        <span aria-hidden="true">
                          {h.column.getIsSorted() === "asc" ? (
                            <ArrowUp size={13} />
                          ) : h.column.getIsSorted() === "desc" ? (
                            <ArrowDown size={13} />
                          ) : (
                            <ArrowUpDown size={13} className="opacity-40" />
                          )}
                        </span>
                      </button>
                    ) : (
                      flexRender(h.column.columnDef.header, h.getContext())
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((r) => (
              <tr
                key={r.id}
                className={cn(
                  "border-t border-border/60 transition-colors hover:bg-muted/40",
                  r.getIsSelected() && "bg-primary/4",
                )}
              >
                {selectable && (
                  <td className="w-10 pl-4">
                    <Checkbox
                      aria-label={`Select row ${r.index + 1}`}
                      checked={r.getIsSelected()}
                      onCheckedChange={(v) => r.toggleSelected(!!v)}
                    />
                  </td>
                )}
                {r.getVisibleCells().map((c) => (
                  <td
                    key={c.id}
                    className="whitespace-nowrap px-4 py-4 first:font-medium"
                  >
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {!table.getRowModel().rows.length && (
              <tr>
                <td
                  colSpan={
                    table.getVisibleLeafColumns().length + (selectable ? 1 : 0)
                  }
                  className="p-6 text-center text-muted-foreground"
                >
                  No matching records. Try another search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-xs text-muted-foreground">
          {Object.keys(rowSelection).length > 0
            ? `${Object.keys(rowSelection).length} selected · `
            : ""}
          {table.getFilteredRowModel().rows.length} records · Page{" "}
          {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(1, table.getPageCount())}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft size={14} /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
