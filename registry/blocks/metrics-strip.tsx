"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type MetricsStripOptions = {
  items?: { label: string; value: string }[];
  className?: string;
};
export type MetricsStripProps = Omit<
  React.ComponentProps<"dl">,
  keyof MetricsStripOptions
> &
  MetricsStripOptions;
export function MetricsStrip({
  items = [
    { label: "Projects in this demo", value: "12" },
    { label: "Open tasks", value: "38" },
    { label: "Teammates", value: "6" },
  ],
  className,
  children,
  ...rootProps
}: MetricsStripProps) {
  return (
    <dl
      {...rootProps}
      className={cn(
        "grid gap-6 border-y border-border py-7 sm:grid-cols-3",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          {items.map((i) => (
            <div key={i.label}>
              <dt className="text-sm text-muted-foreground">{i.label}</dt>
              <dd className="mt-2 font-display text-3xl tabular-nums">
                {i.value}
              </dd>
            </div>
          ))}
        </>
      )}
    </dl>
  );
}
