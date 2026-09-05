"use client";
import * as React from "react";
import { cn } from "./utils";
export function Sparkline({
  children,
  values = [4, 7, 5, 12, 9, 15, 13, 20],
  label = "Trend",
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"svg">,
  keyof {
    values?: number[];
    label?: string;
    className?: string;
  }
> & {
  values?: number[];
  label?: string;
  className?: string;
}) {
  const min = Math.min(...values),
    max = Math.max(...values),
    range = max - min || 1;
  const points = values
    .map(
      (v, i) =>
        `${(i / (values.length - 1 || 1)) * 200},${55 - ((v - min) / range) * 50}`,
    )
    .join(" ");
  return (
    <svg
      {...rootProps}
      viewBox="0 0 200 60"
      role="img"
      aria-label={`${label}: ${values.join(", ")}`}
      className={cn("h-16 w-48", className)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <polyline
            points={points}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}
