"use client";
import * as React from "react";
import { cn } from "./utils";
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-6",
        className,
      )}
      {...props}
    />
  );
}
