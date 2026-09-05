"use client";
import * as React from "react";
import { cn } from "./utils";
export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"span"> & {
  tone?: "neutral" | "accent" | "positive" | "warning";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        {
          "bg-muted text-foreground": tone === "neutral",
          "bg-primary/10 text-primary": tone === "accent",
          "bg-accent text-[#293620]": tone === "positive",
          "bg-[#f6e5c1] text-[#704517]": tone === "warning",
        },
        className,
      )}
      {...props}
    />
  );
}
