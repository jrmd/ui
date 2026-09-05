"use client";
import * as React from "react";
import { cn } from "./utils";
export function EmptyState({
  title = "Nothing here yet",
  description = "Create your first item to get started.",
  action,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid justify-items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <EmptyStateTitle>{title}</EmptyStateTitle>
          <EmptyStateDescription>{description}</EmptyStateDescription>
          {action && <EmptyStateActions>{action}</EmptyStateActions>}
        </>
      )}
    </div>
  );
}
export function EmptyStateIcon({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-2 grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground [&_svg]:size-6",
        className,
      )}
      {...props}
    />
  );
}
export function EmptyStateTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-display text-xl font-medium", className)}
      {...props}
    />
  );
}
export function EmptyStateDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-sm text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function EmptyStateActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-3 flex flex-wrap justify-center gap-3", className)}
      {...props}
    />
  );
}
