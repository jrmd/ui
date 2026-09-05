"use client";
import * as React from "react";
import { cn } from "./utils";
import { RadioGroup as Primitive } from "radix-ui";
export function RadioGroup({
  options,
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & {
  options: { label: string; value: string; disabled?: boolean }[];
}) {
  return (
    <Primitive.Root className={cn("grid gap-3", className)} {...props}>
      {options.map((o) => (
        <label key={o.value} className="flex items-center gap-3 text-sm">
          <Primitive.Item
            value={o.value}
            disabled={o.disabled}
            className="size-5 rounded-full border border-border flex items-center justify-center"
          >
            <Primitive.Indicator className="size-2.5 rounded-full bg-primary" />
          </Primitive.Item>
          {o.label}
        </label>
      ))}
    </Primitive.Root>
  );
}
