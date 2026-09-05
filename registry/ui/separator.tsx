"use client";
import * as React from "react";
import { cn } from "./utils";
export function Separator({
  vertical = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { vertical?: boolean }) {
  return (
    <div
      role="separator"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      className={cn(
        "bg-border",
        vertical ? "w-px self-stretch" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}
