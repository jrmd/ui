"use client";
import * as React from "react";
import { cn } from "./utils";
export function Progress({
  children,
  value,
  label = "Progress",
  className,
  showLabel = true,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    value: number;
    label?: string;
    className?: string;
    showLabel?: boolean;
  }
> & {
  value: number;
  label?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const v = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return (
    <div {...rootProps} className={cn("grid w-full min-w-0 gap-2", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          {showLabel && (
            <div className="flex justify-between text-sm">
              <span>{label}</span>
              <span className="tabular-nums">{Math.round(v)}%</span>
            </div>
          )}
          <div
            role="progressbar"
            aria-label={label}
            aria-valuenow={v}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full origin-left rounded-full bg-primary transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `scaleX(${v / 100})` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
