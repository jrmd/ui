"use client";
import * as React from "react";
import { cn } from "./utils";
export function GrainOverlay({
  children,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    children?: React.ReactNode;
    className?: string;
  }
> & {
  children?: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const d = ctx.createImageData(160, 160);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = (i * 73) % 251;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = 22;
    }
    ctx.putImageData(d, 0, 0);
  }, []);
  return (
    <div
      {...rootProps}
      className={cn(
        "relative min-h-60 overflow-hidden rounded-xl bg-muted",
        className,
      )}
    >
      <canvas
        ref={ref}
        width={160}
        height={160}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      />
      <div className="relative p-8">{children}</div>
    </div>
  );
}
