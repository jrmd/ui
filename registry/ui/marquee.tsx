"use client";
import * as React from "react";
import { cn } from "./utils";
export function Marquee({
  children,
  duration = 24,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    children: React.ReactNode;
    duration?: number;
    className?: string;
  }
> & {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  const [paused, setPaused] = React.useState(false);
  return (
    <div {...rootProps} className={cn("overflow-hidden", className)}>
      <div
        className="flex w-max gap-10"
        style={{
          animation: `jez-marquee ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="flex shrink-0 gap-10">{children}</div>
        <div aria-hidden="true" inert className="flex shrink-0 gap-10">
          {children}
        </div>
      </div>
      <button
        onClick={() => setPaused((v) => !v)}
        className="mt-4 text-xs underline"
      >
        {paused ? "Resume" : "Pause"} animation
      </button>
    </div>
  );
}
