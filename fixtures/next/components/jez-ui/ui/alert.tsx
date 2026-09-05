"use client";
import * as React from "react";
import { cn } from "./utils";
export function Alert({
  title,
  children,
  variant = "info",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  variant?: "info" | "error" | "success";
}) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl border border-border p-4",
        variant === "error" && "border-danger text-danger",
        className,
      )}
      {...props}
    >
      <p className="text-sm font-medium">{title}</p>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}
