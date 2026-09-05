"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, useScroll } from "motion/react";
export function ScrollProgress({
  className,
  style,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      {...props}
      aria-hidden="true"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary",
        className,
      )}
      style={{ scaleX: scrollYProgress, ...style }}
    />
  );
}
