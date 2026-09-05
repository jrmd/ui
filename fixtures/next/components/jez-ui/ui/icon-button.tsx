"use client";
import * as React from "react";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";
export function IconButton({
  label,
  children,
  size = "md",
  className,
  ...props
}: Omit<ButtonProps, "asChild"> & { label: string }) {
  return (
    <Button
      aria-label={label}
      size={size}
      className={cn(
        size === "sm"
          ? "size-8 p-0"
          : size === "lg"
            ? "size-12 p-0"
            : "size-10 p-0",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
