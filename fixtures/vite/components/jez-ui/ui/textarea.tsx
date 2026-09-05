"use client";
import * as React from "react";
import { cn } from "./utils";
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "block min-h-32 w-full min-w-0 resize-y rounded-lg border border-border bg-background px-3.5 py-3 text-sm leading-relaxed shadow-[0_1px_2px_#00000004] transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-foreground/25 focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/10 aria-invalid:border-danger disabled:bg-muted/50 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
