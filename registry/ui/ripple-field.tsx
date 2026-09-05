"use client";
import * as React from "react";
import { cn } from "./utils";
export function RippleField({
  className,
  children = "Click anywhere. Make a little wave.",
  label = "Create a ripple",
}: {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}) {
  const [ripples, setRipples] = React.useState<
    { id: number; x: number; y: number }[]
  >([]);
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative block h-64 w-full overflow-hidden rounded-xl bg-muted",
        className,
      )}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setRipples((v) => [
          ...v.slice(-8),
          {
            id: performance.now(),
            x: e.detail ? e.clientX - r.left : r.width / 2,
            y: e.detail ? e.clientY - r.top : r.height / 2,
          },
        ]);
      }}
    >
      <span className="relative z-10 text-sm">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          onAnimationEnd={() =>
            setRipples((v) => v.filter((x) => x.id !== r.id))
          }
          aria-hidden="true"
          className="pointer-events-none absolute size-24 rounded-full border border-primary"
          style={{
            left: r.x - 48,
            top: r.y - 48,
            animation: "jez-ripple 1.2s ease-out forwards",
          }}
        />
      ))}
    </button>
  );
}
