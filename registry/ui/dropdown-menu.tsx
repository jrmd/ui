"use client";
import * as React from "react";
import { cn } from "./utils";
import { DropdownMenu as Primitive } from "radix-ui";
export function DropdownMenu({
  trigger,
  items,
  className,
}: {
  trigger: React.ReactNode;
  items: { label: string; onSelect: () => void; disabled?: boolean }[];
  className?: string;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          className={cn(
            "z-50 min-w-44 rounded-xl border border-border bg-background p-1 text-foreground shadow-lg",
            className,
          )}
        >
          {items.map((i, n) => (
            <Primitive.Item
              key={n}
              disabled={i.disabled}
              onSelect={i.onSelect}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:opacity-40"
            >
              {i.label}
            </Primitive.Item>
          ))}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
