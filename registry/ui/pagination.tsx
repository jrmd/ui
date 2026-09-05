"use client";
import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";
import { useControllable } from "./use-controllable";
export function Pagination({
  page,
  defaultPage = 1,
  onPageChange,
  totalPages,
  className,
}: {
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  totalPages: number;
  className?: string;
}) {
  const [current, setPage] = useControllable(page, defaultPage, onPageChange);
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-3", className)}
    >
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
    </nav>
  );
}
