"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";
export type RecordDetailPanelOptions = {
  name?: string;
  className?: string;
  items?: typeof RecordDetailPanelDefaultItems;
  description?: React.ReactNode;
};
export type RecordDetailPanelProps = Omit<
  React.ComponentProps<"section">,
  keyof RecordDetailPanelOptions
> &
  RecordDetailPanelOptions;
const RecordDetailPanelDefaultItems = [
  ["Email", "alex@example.com"],
  ["Plan", "Team"],
  ["Joined", "12 August 2026"],
  ["Projects", "4"],
  ["Last active", "Today"],
  ["Demo revenue", "£240"],
];
export function RecordDetailPanel({
  items = RecordDetailPanelDefaultItems,
  description = <>Illustrative customer record.</>,
  name = "Alex Morgan",
  className,
  children,
  ...rootProps
}: RecordDetailPanelProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "grid max-w-xl gap-6 rounded-xl border border-border p-6",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <RecordDetailPanelHeader>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-lg text-primary">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <RecordDetailPanelTitle>{name}</RecordDetailPanelTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Customer since August 2026
                </p>
              </div>
            </div>
            <Badge>Active</Badge>
          </RecordDetailPanelHeader>
          <RecordDetailPanelList>
            {items.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="break-words font-medium">{v}</dd>
              </React.Fragment>
            ))}
          </RecordDetailPanelList>
          <RecordDetailPanelDescription>
            {description}
          </RecordDetailPanelDescription>
        </>
      )}
    </section>
  );
}

export function RecordDetailPanelHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="record-detail-panel-header"
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    />
  );
}
export function RecordDetailPanelTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="record-detail-panel-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
export function RecordDetailPanelList({
  className,
  ...props
}: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="record-detail-panel-list"
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-y-5 border-t border-border pt-6 text-sm",
        className,
      )}
      {...props}
    />
  );
}
export function RecordDetailPanelDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="record-detail-panel-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
