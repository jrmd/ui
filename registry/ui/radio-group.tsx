"use client";
import * as React from "react";
import { RadioGroup as P } from "radix-ui";
import { cn } from "./utils";
export function RadioGroup({
  options,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  options?: { label: React.ReactNode; value: string; disabled?: boolean }[];
}) {
  return (
    <P.Root className={cn("grid gap-3", className)} {...props}>
      {options
        ? options.map((o) => (
            <label key={o.value} className="flex items-center gap-3 text-sm">
              <RadioGroupItem value={o.value} disabled={o.disabled} />
              {o.label}
            </label>
          ))
        : children}
    </P.Root>
  );
}
export function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof P.Item>) {
  return (
    <P.Item
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <P.Indicator className="size-2.5 rounded-full bg-primary" />
    </P.Item>
  );
}
