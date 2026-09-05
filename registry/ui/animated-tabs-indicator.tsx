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
  listProps,
  triggerProps,
  contentProps,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  listProps?: React.ComponentProps<typeof P.List>;
  triggerProps?: Omit<React.ComponentProps<typeof P.Trigger>, "value">;
  contentProps?: Omit<React.ComponentProps<typeof P.Content>, "value">;
  items: { value: string; label: React.ReactNode; content: React.ReactNode }[];
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
      {...props}
      value={selected}
      onValueChange={setSelected}
      className={cn("", className)}
    >
      <P.List
        {...listProps}
        className={cn(
          "flex gap-1 rounded-xl bg-muted p-1",
          listProps?.className,
        )}
      >
        {items.map((i) => (
          <P.Trigger
            {...triggerProps}
            key={i.value}
            value={i.value}
            className={cn(
              "relative flex-1 rounded-lg px-3 py-2 text-sm",
              triggerProps?.className,
            )}
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
        <P.Content
          {...contentProps}
          key={i.value}
          value={i.value}
          className={cn("py-5", contentProps?.className)}
        >
          {i.content}
        </P.Content>
      ))}
    </P.Root>
  );
}
