"use client";
import * as React from "react";
import { cn } from "./utils";
export function ResizablePanels({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}) {
  const [width, setWidth] = React.useState(40);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-48 overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      <div style={{ width: width + "%" }} className="min-w-0 overflow-auto p-4">
        {left}
      </div>
      <div
        role="separator"
        tabIndex={0}
        aria-label="Resize panels"
        aria-orientation="vertical"
        aria-valuenow={width}
        aria-valuemin={20}
        aria-valuemax={80}
        className="relative w-px shrink-0 cursor-col-resize touch-none bg-border after:absolute after:inset-y-0 after:-left-2 after:w-4 hover:bg-primary focus-visible:bg-primary"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            setWidth((w) =>
              Math.max(20, Math.min(80, w + (e.key === "ArrowLeft" ? -5 : 5))),
            );
          }
        }}
        onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId) && ref.current) {
            const r = ref.current.getBoundingClientRect();
            setWidth(
              Math.max(
                20,
                Math.min(80, ((e.clientX - r.left) / r.width) * 100),
              ),
            );
          }
        }}
        onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
      />
      <div className="min-w-0 flex-1 overflow-auto p-4">{right}</div>
    </div>
  );
}
