"use client";
import * as React from "react";
import { cn } from "./utils";
import { ToggleGroup as Primitive } from "radix-ui";
export function ToggleGroup({
  options,
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & {
  options: { label: string; value: string }[];
}) {
  return (
    <Primitive.Root
      className={cn(
        "inline-flex rounded-xl border border-border p-1",
        className,
      )}
      {...props}
    >
      {options.map((o) => (
        <Primitive.Item
          key={o.value}
          value={o.value}
          className="rounded-lg px-3 py-2 text-sm data-[state=on]:bg-muted"
        >
          {o.label}
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
