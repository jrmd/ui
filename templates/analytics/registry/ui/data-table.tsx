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
  type TableOptions,
  type Table as TableInstance,
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
export type DataTableOptions<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  label?: string;
  className?: string;
  selectable?: boolean;
  options?: Partial<
    Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">
  >;
  toolbar?: React.ReactNode | ((table: TableInstance<T>) => React.ReactNode);
  footer?: React.ReactNode | ((table: TableInstance<T>) => React.ReactNode);
  emptyState?: React.ReactNode;
  loading?: boolean;
  onSelectionChange?: (rows: T[]) => void;

  children?: React.ReactNode | ((table: TableInstance<T>) => React.ReactNode);
};
export type DataTableProps<T> = Omit<
  React.ComponentProps<"div">,
  keyof DataTableOptions<T>
> &
  DataTableOptions<T>;
export function DataTable<T>({
  children,
  data,
  columns,
  label = "Records",
  className,
  selectable = false,
  onSelectionChange,
  options,
  toolbar,
  footer,
  emptyState = "No matching records. Try another search.",
  loading = false,
  ...rootProps
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const table = useReactTable({
    data,
    columns,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: selectable,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...options,
    state: {
      sorting,
      globalFilter: filter,
      columnVisibility,
      rowSelection,
      ...options?.state,
    },
    initialState: { pagination: { pageSize: 6 }, ...options?.initialState },
  });
  const selection = table.getState().rowSelection;
  const selectionCallback = React.useRef(onSelectionChange);
  selectionCallback.current = onSelectionChange;
  React.useEffect(() => {
    selectionCallback.current?.(
      table.getSelectedRowModel().rows.map((row) => row.original),
    );
  }, [table, selection, data]);
  return (
    <div
      {...rootProps}
      aria-busy={loading || undefined}
      className={cn("grid gap-4", className)}
    >
      {children !== undefined ? (
        typeof children === "function" ? (
          children(table)
        ) : (
          children
        )
      ) : (
        <>
          {toolbar !== undefined ? (
            typeof toolbar === "function" ? (
              toolbar(table)
            ) : (
              toolbar
            )
          ) : (
            <DataTableToolbar>
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
            </DataTableToolbar>
          )}
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
                            {flexRender(
                              h.column.columnDef.header,
                              h.getContext(),
                            )}
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
                        table.getVisibleLeafColumns().length +
                        (selectable ? 1 : 0)
                      }
                      className="p-6 text-center text-muted-foreground"
                    >
                      {loading ? "Loading records…" : emptyState}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {footer !== undefined ? (
            typeof footer === "function" ? (
              footer(table)
            ) : (
              footer
            )
          ) : (
            <DataTablePagination>
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
            </DataTablePagination>
          )}
        </>
      )}
    </div>
  );
}
export function Table({
  className,
  containerProps,
  ...props
}: React.ComponentProps<"table"> & {
  containerProps?: React.ComponentProps<"div">;
}) {
  return (
    <div
      {...containerProps}
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-border",
        containerProps?.className,
      )}
    >
      <table className={cn("w-full text-left text-sm", className)} {...props} />
    </div>
  );
}
export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      className={cn("border-b border-border bg-muted/40", className)}
      {...props}
    />
  );
}
export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody className={cn("divide-y divide-border", className)} {...props} />
  );
}
export function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-t border-border bg-muted/40 font-medium",
        className,
      )}
      {...props}
    />
  );
}
export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-muted/40 data-[state=selected]:bg-primary/5",
        className,
      )}
      {...props}
    />
  );
}
export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "h-11 px-4 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}
export function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn(
        "caption-bottom px-4 py-3 text-left text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function DataTableToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    />
  );
}
export function DataTablePagination({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
