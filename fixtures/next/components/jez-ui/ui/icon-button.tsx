"use client";
import * as React from "react";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";
export function IconButton({
  label,
  children,
  className,
  ...props
}: Omit<ButtonProps, "asChild"> & { label: string }) {
  return (
    <Button
      aria-label={label}
      className={cn("size-10 p-0", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
