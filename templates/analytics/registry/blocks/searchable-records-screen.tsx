"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";
import { DataTable } from "../ui/data-table";
export const defaultDemoRecords = [
  {
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Active",
    revenue: 240,
  },
  {
    name: "Sam Patel",
    email: "sam@example.com",
    status: "Active",
    revenue: 180,
  },
  {
    name: "Robin Lee",
    email: "robin@example.com",
    status: "Invited",
    revenue: 0,
  },
  {
    name: "Casey Bell",
    email: "casey@example.com",
    status: "Active",
    revenue: 360,
  },
  {
    name: "Jamie Chen",
    email: "jamie@example.com",
    status: "Paused",
    revenue: 90,
  },
  {
    name: "Taylor Green",
    email: "taylor@example.com",
    status: "Active",
    revenue: 120,
  },
  {
    name: "Drew Ellis",
    email: "drew@example.com",
    status: "Invited",
    revenue: 0,
  },
];
export type SearchableRecordsScreenOptions = {
  className?: string;
  records?: typeof defaultDemoRecords;
  heading?: React.ReactNode;
};
export type SearchableRecordsScreenProps = Omit<
  React.ComponentProps<"section">,
  keyof SearchableRecordsScreenOptions
> &
  SearchableRecordsScreenOptions;
export const demoRecords = defaultDemoRecords;
export function SearchableRecordsScreen({
  records = defaultDemoRecords,
  heading = <>Customer directory</>,
  className,
  children,
  ...rootProps
}: SearchableRecordsScreenProps) {
  return (
    <section {...rootProps} className={cn("", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <SearchableRecordsScreenContent>
            <SearchableRecordsScreenTitle>
              {heading}
            </SearchableRecordsScreenTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              People and businesses using your product.
            </p>
          </SearchableRecordsScreenContent>
          <DataTable
            data={records}
            columns={[
              { accessorKey: "name", header: "Name" },
              { accessorKey: "email", header: "Email" },
              {
                accessorKey: "status",
                header: "Status",
                cell: (c) => (
                  <Badge
                    tone={c.getValue() === "Active" ? "positive" : "neutral"}
                  >
                    {String(c.getValue())}
                  </Badge>
                ),
              },
              {
                accessorKey: "revenue",
                header: "Revenue",
                cell: (c) => "£" + c.getValue(),
              },
            ]}
          />
        </>
      )}
    </section>
  );
}

export function SearchableRecordsScreenContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="searchable-records-screen-content"
      className={cn("mb-6", className)}
      {...props}
    />
  );
}
export function SearchableRecordsScreenTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="searchable-records-screen-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
