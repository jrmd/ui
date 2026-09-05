"use client";
import * as React from "react";
import { cn } from "./utils";
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-5 w-full rounded bg-muted motion-safe:animate-pulse",
        className,
      )}
      {...props}
    />
  );
}
