"use client";
import * as React from "react";
import { cn } from "./utils";
export function AuroraBackground({
  children,
  className,
  paused = false,
  colors = ["#3366cb", "#80e7b4"],
  duration = 12,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    children?: React.ReactNode;
    className?: string;
    paused?: boolean;
    colors?: [string, string];
    duration?: number;
  }
> & {
  children?: React.ReactNode;
  className?: string;
  paused?: boolean;
  colors?: [string, string];
  duration?: number;
}) {
  return (
    <div
      {...rootProps}
      className={cn(
        "relative min-h-64 overflow-hidden rounded-xl bg-[#131d2c] text-white",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-20 opacity-60 blur-3xl"
        style={{
          background: `conic-gradient(from 90deg,transparent,${colors[0]},transparent,${colors[1]},transparent)`,
          animation: `jez-aurora ${duration}s ease-in-out infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
      <div className="relative p-8">{children}</div>
    </div>
  );
}
