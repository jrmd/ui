"use client";
import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";
import { useControllable } from "./use-controllable";
export function Pagination({
  children,
  page,
  defaultPage = 1,
  onPageChange,
  totalPages = 1,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"nav">,
  keyof {
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    children?: React.ReactNode;
    totalPages?: number;
    className?: string;
  }
> & {
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  children?: React.ReactNode;
  totalPages?: number;
  className?: string;
}) {
  const [current, setPage] = useControllable(page, defaultPage, onPageChange);
  return (
    <nav
      {...rootProps}
      aria-label="Pagination"
      className={cn("flex items-center gap-3", className)}
    >
      {children ?? (
        <>
          <Button
            variant="outline"
            disabled={current <= 1}
            onClick={() => setPage(current - 1)}
          >
            Previous
          </Button>
          <span aria-live="polite" className="text-sm">
            {current} / {Math.max(1, totalPages)}
          </span>
          <Button
            variant="outline"
            disabled={current >= totalPages}
            onClick={() => setPage(current + 1)}
          >
            Next
          </Button>
        </>
      )}
    </nav>
  );
}
export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex list-none items-center gap-1 p-0", className)}
      {...props}
    />
  );
}
export function PaginationItem(props: React.ComponentProps<"li">) {
  return <li {...props} />;
}
export function PaginationLink({
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { isActive?: boolean }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-transparent px-3 text-sm hover:bg-muted",
        isActive && "border-border bg-muted font-medium",
        className,
      )}
      {...props}
    />
  );
}
export function PaginationPrevious({
  children = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Previous page" {...props}>
      {children}
    </PaginationLink>
  );
}
export function PaginationNext({
  children = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink aria-label="Next page" {...props}>
      {children}
    </PaginationLink>
  );
}
export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-10 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      …
    </span>
  );
}
