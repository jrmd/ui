"use client";
import * as React from "react";
import { cn } from "./utils";
export function BorderBeam({
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
      className={cn("rounded-xl p-px", className)}
      style={{
        background:
          "linear-gradient(110deg,var(--border) 20%,var(--primary) 40%,var(--accent) 50%,var(--border) 70%)",
        backgroundSize: "200% 100%",
        animation: "jez-shift 4s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      <div className="rounded-[11px] bg-background p-8">{children}</div>
    </div>
  );
}
