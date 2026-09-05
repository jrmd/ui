"use client";
import * as React from "react";
import { cn } from "./utils";
export function Stepper({
  steps,
  current,
  className,
}: {
  steps: string[];
  current: number;
  className?: string;
}) {
  return (
    <ol className={cn("flex flex-wrap gap-5", className)}>
      {steps.map((s, i) => (
        <li
          key={s}
          aria-current={i === current ? "step" : undefined}
          className="flex items-center gap-2 text-sm"
        >
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-full text-xs",
              i <= current ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {i + 1}
          </span>
          <span
            className={i === current ? "font-medium" : "text-muted-foreground"}
          >
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}
