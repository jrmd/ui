"use client";
import * as React from "react";
import { cn } from "./utils";
export function Heatmap({
  values = Array.from({ length: 84 }, (_, i) => (i * 7 + (i % 3)) % 5),
  label = "Activity over 12 weeks",
  className,
}: {
  values?: number[];
  label?: string;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <figcaption className="mb-5 text-sm font-medium">{label}</figcaption>
      <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto">
        {values.map((v, i) => (
          <div
            key={i}
            title={`Day ${i + 1}: ${v} contributions`}
            role="img"
            aria-label={`Day ${i + 1}: ${v} contributions`}
            className="size-4 rounded-sm"
            style={{
              background: `color-mix(in srgb,var(--primary) ${Math.max(0, Math.min(v, 4)) * 23 + 8}%,var(--background))`,
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Lighter: less activity · Darker: more activity
      </p>
    </figure>
  );
}
