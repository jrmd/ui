"use client";
import * as React from "react";
import { cn } from "./utils";
export function Alert({
  title,
  children,
  variant = "info",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode;
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
      {title !== undefined ? (
        <>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{children}</AlertDescription>
        </>
      ) : (
        children
      )}
    </div>
  );
}
export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return <h4 className={cn("text-sm font-medium", className)} {...props} />;
}
export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mt-1 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function AlertAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 flex flex-wrap gap-2", className)} {...props} />
  );
}
