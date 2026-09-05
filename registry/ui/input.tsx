"use client";
import * as React from "react";
import { cn } from "./utils";
export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "block h-10 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-sm leading-normal shadow-[0_1px_2px_#00000004] transition-[border-color,box-shadow] placeholder:text-muted-foreground/75 hover:border-foreground/25 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/10 aria-invalid:border-danger aria-invalid:ring-danger/10 disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
