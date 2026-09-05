"use client";
import * as React from "react";
import { ToggleGroup as P } from "radix-ui";
import { cn } from "./utils";
export function ToggleGroup({
  options,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  options?: { label: React.ReactNode; value: string; disabled?: boolean }[];
}) {
  return (
    <P.Root
      className={cn(
        "inline-flex flex-wrap gap-1 rounded-xl border border-border p-1",
        className,
      )}
      {...props}
    >
      {options
        ? options.map((o) => (
            <ToggleGroupItem
              key={o.value}
              value={o.value}
              disabled={o.disabled}
            >
              {o.label}
            </ToggleGroupItem>
          ))
        : children}
    </P.Root>
  );
}
export function ToggleGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof P.Item>) {
  return (
    <P.Item
      className={cn(
        "rounded-lg px-3 py-2 text-sm outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 data-[state=on]:bg-muted data-[state=on]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
