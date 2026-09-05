"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";
import { DataTable } from "../ui/data-table";
export const demoRecords = [
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
export function SearchableRecordsScreen({ className }: { className?: string }) {
  return (
    <section className={cn("", className)}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Customer directory</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          People and businesses using your product.
        </p>
      </div>
      <DataTable
        data={demoRecords}
        columns={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          {
            accessorKey: "status",
            header: "Status",
            cell: (c) => (
              <Badge tone={c.getValue() === "Active" ? "positive" : "neutral"}>
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
    </section>
  );
}
