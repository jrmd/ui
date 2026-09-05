"use client";
import * as React from "react";
import { cn } from "./utils";
export function DotGrid({
  children,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    children?: React.ReactNode;
    className?: string;
  }
> & {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      {...rootProps}
      className={cn("min-h-60 rounded-xl bg-background p-8", className)}
      style={{
        backgroundImage: "radial-gradient(var(--border) 1px,transparent 1px)",
        backgroundSize: "18px 18px",
        ...rootProps.style,
      }}
    >
      {children}
    </div>
  );
}
