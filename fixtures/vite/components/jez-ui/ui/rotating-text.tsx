"use client";
import * as React from "react";
import { cn } from "./utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
export function RotatingText({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const reduce = useReducedMotion();
  React.useEffect(() => {
    if (reduce || words.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [reduce, words.length, interval]);
  return (
    <span
      className={cn("inline-grid overflow-hidden align-bottom", className)}
      aria-label={words.join(", ")}
    >
      <AnimatePresence mode="wait">
        <motion.span
          aria-hidden="true"
          key={index}
          initial={{ y: reduce ? 0 : 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduce ? 0 : -24, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
