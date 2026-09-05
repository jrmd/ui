"use client";
import * as React from "react";
import { cn } from "./utils";
import { animate, useReducedMotion } from "motion/react";
export function NumberTicker({
  children,
  value,
  decimals = 0,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"span">,
  keyof {
    value: number;
    decimals?: number;
    className?: string;
  }
> & {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const [display, setDisplay] = React.useState(value);
  const previous = React.useRef(value);
  const reduce = useReducedMotion();
  React.useEffect(() => {
    const controls = animate(previous.current, value, {
      duration: reduce ? 0 : 0.6,
      onUpdate: setDisplay,
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reduce]);
  return (
    <span
      {...rootProps}
      className={cn("tabular-nums", className)}
      aria-label={value.toFixed(decimals)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <span aria-hidden="true">{display.toFixed(decimals)}</span>
        </>
      )}
    </span>
  );
}
