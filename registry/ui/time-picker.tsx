"use client";
import * as React from "react";
import { cn } from "./utils";
import { Input } from "./input";
export function TimePicker({
  label = "Time",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "type"> & { label?: string }) {
  return (
    <label className={cn("grid gap-2 text-sm", className)}>
      {label}
      <Input type="time" {...props} />
    </label>
  );
}
