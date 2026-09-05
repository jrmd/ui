"use client";
import * as React from "react";
import { cn } from "./utils";
export function AuroraBackground({
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
        "relative min-h-64 overflow-hidden rounded-xl bg-[#131d2c] text-white",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-20 opacity-60 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg,transparent,#3366cb,transparent,#80e7b4,transparent)",
          animation: "jez-aurora 12s ease-in-out infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      />
      <div className="relative p-8">{children}</div>
    </div>
  );
}
