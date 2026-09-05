"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";
export function RecordDetailPanel({
  name = "Alex Morgan",
  className,
}: {
  name?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grid max-w-xl gap-6 rounded-xl border border-border p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-lg text-primary">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Customer since August 2026
            </p>
          </div>
        </div>
        <Badge>Active</Badge>
      </div>
      <dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-y-5 border-t border-border pt-6 text-sm">
        {[
          ["Email", "alex@example.com"],
          ["Plan", "Team"],
          ["Joined", "12 August 2026"],
          ["Projects", "4"],
          ["Last active", "Today"],
          ["Demo revenue", "£240"],
        ].map(([k, v]) => (
          <React.Fragment key={k}>
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="break-words font-medium">{v}</dd>
          </React.Fragment>
        ))}
      </dl>
      <p className="text-xs text-muted-foreground">
        Illustrative customer record.
      </p>
    </section>
  );
}
