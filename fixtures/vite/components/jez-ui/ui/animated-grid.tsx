"use client";
import * as React from "react";
import { cn } from "./utils";
export function AnimatedGrid({
  children,
  className,
  paused = false,
}: {
  children?: React.ReactNode;
  className?: string;
  paused?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative min-h-60 overflow-hidden rounded-xl bg-background",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "jez-grid 8s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      />
      <div className="relative p-8">{children}</div>
    </div>
  );
}
