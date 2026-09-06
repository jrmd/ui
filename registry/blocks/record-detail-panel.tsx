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
function useRecordDetailPanelModel({
  items = RecordDetailPanelDefaultItems,
  description = "Illustrative customer record.",
  name = "Alex Morgan",
  className,
  children,
  ...rootProps
}: RecordDetailPanelProps) {
  return { items, description, name, className, children, rootProps };
}
const RecordDetailPanelCompositionContext = React.createContext<ReturnType<
  typeof useRecordDetailPanelModel
> | null>(null);
function useRecordDetailPanelComposition() {
  const context = React.useContext(RecordDetailPanelCompositionContext);
  if (!context)
    throw new Error(
      "RecordDetailPanel parts must be inside RecordDetailPanel.",
    );
  return context;
}
export function RecordDetailPanel(props: RecordDetailPanelProps) {
  const model = useRecordDetailPanelModel(props);
  const { className, rootProps, children } = model;
  return (
    <RecordDetailPanelCompositionContext.Provider value={model}>
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
            <RecordDetailPanelHeading />
            <RecordDetailPanelDetails />
            <RecordDetailPanelNote />
          </>
        )}
      </section>
    </RecordDetailPanelCompositionContext.Provider>
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

export function RecordDetailPanelHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof RecordDetailPanelHeader>> & {
  children?: React.ReactNode;
}) {
  const { name } = useRecordDetailPanelComposition();
  return (
    <RecordDetailPanelHeader {...props}>
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </RecordDetailPanelHeader>
  );
}
export function RecordDetailPanelDetails({
  children,
  ...props
}: Partial<React.ComponentProps<typeof RecordDetailPanelList>> & {
  children?: React.ReactNode;
}) {
  const { items } = useRecordDetailPanelComposition();
  return (
    <RecordDetailPanelList {...props}>
      {children === undefined
        ? items.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="break-words font-medium">{v}</dd>
            </React.Fragment>
          ))
        : children}
    </RecordDetailPanelList>
  );
}
export function RecordDetailPanelNote({
  children,
  ...props
}: Partial<React.ComponentProps<typeof RecordDetailPanelDescription>> & {
  children?: React.ReactNode;
}) {
  const { description } = useRecordDetailPanelComposition();
  return (
    <RecordDetailPanelDescription {...props}>
      {children === undefined ? description : children}
    </RecordDetailPanelDescription>
  );
}
