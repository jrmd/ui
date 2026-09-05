"use client";
import * as React from "react";
import { cn } from "./utils";
import { motion, useReducedMotion } from "motion/react";
import { Tabs as P } from "radix-ui";
import { useControllable } from "./use-controllable";
export function AnimatedTabsIndicator({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
}: {
  items: { value: string; label: string; content: React.ReactNode }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}) {
  const [selected, setSelected] = useControllable(
    value,
    defaultValue ?? items[0]?.value,
    onValueChange,
  );
  const id = React.useId();
  const reduce = useReducedMotion();
  return (
    <P.Root
      value={selected}
      onValueChange={setSelected}
      className={cn("", className)}
    >
      <P.List className="flex gap-1 rounded-xl bg-muted p-1">
        {items.map((i) => (
          <P.Trigger
            key={i.value}
            value={i.value}
            className="relative flex-1 rounded-lg px-3 py-2 text-sm"
          >
            {selected === i.value && (
              <motion.span
                layoutId={id}
                transition={{ duration: reduce ? 0 : 0.25 }}
                className="absolute inset-0 rounded-lg bg-background"
              />
            )}
            <span className="relative">{i.label}</span>
          </P.Trigger>
        ))}
      </P.List>
      {items.map((i) => (
        <P.Content key={i.value} value={i.value} className="py-5">
          {i.content}
        </P.Content>
      ))}
    </P.Root>
  );
}
