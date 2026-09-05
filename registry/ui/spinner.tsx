"use client";
import * as React from "react";
import { cn } from "./utils";
export function Spinner({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="status"
      className={cn("inline-flex items-center gap-2 text-sm", className)}
      {...props}
    >
      <span className="size-4 rounded-full border-2 border-border border-t-primary motion-safe:animate-spin" />
      <span className="sr-only">Loading</span>
    </span>
  );
}
