"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { Button, type ButtonProps } from "./button";
export function MagneticButton({ children, className, ...props }: ButtonProps) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 20 });
  const y = useSpring(0, { stiffness: 260, damping: 20 });
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  React.useEffect(() => {
    if (reduce || props.disabled || props.loading) {
      x.jump(0);
      y.jump(0);
    }
  }, [reduce, props.disabled, props.loading, x, y]);
  return (
    <span
      className={cn("inline-block p-3", className)}
      onPointerMove={(e) => {
        if (
          reduce ||
          props.disabled ||
          props.loading ||
          e.pointerType !== "mouse"
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(
          Math.max(
            -10,
            Math.min(10, (e.clientX - r.left - r.width / 2) * 0.18),
          ),
        );
        y.set(
          Math.max(-8, Math.min(8, (e.clientY - r.top - r.height / 2) * 0.18)),
        );
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      <motion.span className="inline-block" style={{ x, y }}>
        <Button {...props}>{children}</Button>
      </motion.span>
    </span>
  );
}
