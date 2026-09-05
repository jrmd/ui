"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, useReducedMotion } from "motion/react";
export function TextReveal({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
