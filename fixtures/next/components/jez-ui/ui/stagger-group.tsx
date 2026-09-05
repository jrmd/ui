"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, useReducedMotion } from "motion/react";
export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true }}
      transition={{ staggerChildren: reduce ? 0 : 0.1 }}
      className={cn("grid gap-3", className)}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: reduce ? 1 : 0.3, y: reduce ? 0 : 16 },
            shown: { opacity: 1, y: 0 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
