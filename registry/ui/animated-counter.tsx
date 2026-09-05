"use client";
import * as React from "react";
import { cn } from "./utils";
import { animate, useInView, useReducedMotion } from "motion/react";
export function AnimatedCounter({
  ref: forwardedRef,
  children,
  target,
  duration = 1.4,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"span">,
  keyof {
    target: number;
    duration?: number;
    className?: string;
  }
> & {
  target: number;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!visible) return;
    const animation = animate(0, target, {
      duration: reduce ? 0 : duration,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => animation.stop();
  }, [visible, target, duration, reduce]);
  React.useImperativeHandle(forwardedRef, () => ref.current!, []);
  return (
    <span
      {...rootProps}
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={String(target)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <span aria-hidden="true">{value.toLocaleString()}</span>
        </>
      )}
    </span>
  );
}
