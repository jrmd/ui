"use client";
import * as React from "react";
import { cn } from "./utils";
export function DotGrid({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("min-h-60 rounded-xl bg-background p-8", className)}
      style={{
        backgroundImage: "radial-gradient(var(--border) 1px,transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {children}
    </div>
  );
}
