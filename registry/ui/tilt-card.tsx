"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, useReducedMotion, useSpring } from "motion/react";
export function TiltCard({
  children,
  className,
  maxTilt = 8,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
  }
> & {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 210, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 210, damping: 25 });
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  React.useEffect(() => {
    if (reduce) {
      rotateX.jump(0);
      rotateY.jump(0);
    }
  }, [reduce, rotateX, rotateY]);
  return (
    <div
      {...rootProps}
      style={{ perspective: 1000, ...rootProps.style }}
      onPointerMove={(e) => {
        rootProps.onPointerMove?.(e);
        if (e.defaultPrevented) return;

        if (reduce || e.pointerType !== "mouse") return;
        // Measure the stationary wrapper, not the surface being transformed.
        const r = e.currentTarget.getBoundingClientRect();
        rotateX.set(
          -Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)) *
            maxTilt,
        );
        rotateY.set(
          Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)) *
            maxTilt,
        );
      }}
      onPointerLeave={(event) => {
        rootProps.onPointerLeave?.(event);
        if (!event.defaultPrevented) reset();
      }}
      onPointerCancel={(event) => {
        rootProps.onPointerCancel?.(event);
        if (!event.defaultPrevented) reset();
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "rounded-xl border border-border bg-background p-8",
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
