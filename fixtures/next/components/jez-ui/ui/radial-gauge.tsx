"use client";
import * as React from "react";
import { cn } from "./utils";
export function RadialGauge({
  value = 72,
  label = "Capacity",
  className,
}: {
  value?: number;
  label?: string;
  className?: string;
}) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <figure className={cn("m-0 grid justify-items-center gap-3", className)}>
      <svg
        viewBox="0 0 180 180"
        className="size-52"
        role="img"
        aria-label={`${label}: ${v}%`}
      >
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="var(--muted)"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="var(--primary)"
          strokeWidth="12"
          fill="none"
          pathLength="100"
          strokeDasharray={`${v} 100`}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />
        <text
          x="90"
          y="100"
          textAnchor="middle"
          fill="var(--foreground)"
          fontSize="32"
        >
          {v}%
        </text>
      </svg>
      <figcaption className="text-sm">{label}</figcaption>
    </figure>
  );
}
