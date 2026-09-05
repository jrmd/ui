"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, LayoutGroup, useReducedMotion } from "motion/react";
export function SharedLayoutTransition({
  items,
  className,
}: {
  items: { id: string; title: string; description: string }[];
  className?: string;
}) {
  const [active, setActive] = React.useState<string | null>(null);
  const id = React.useId();
  const reduce = useReducedMotion();
  return (
    <LayoutGroup id={id}>
      <div className={cn("grid gap-3", className)}>
        {items.map((i) => (
          <motion.button
            key={i.id}
            layout
            transition={{ duration: reduce ? 0 : 0.3 }}
            onClick={() => setActive(active === i.id ? null : i.id)}
            aria-expanded={active === i.id}
            className="rounded-xl border border-border p-5 text-left"
          >
            <motion.span layout="position" className="block font-medium">
              {i.title}
            </motion.span>
            {active === i.id && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 block text-sm text-muted-foreground"
              >
                {i.description}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </LayoutGroup>
  );
}
