"use client";
import * as React from "react";
import { cn } from "./utils";
import { Tabs as Primitive } from "radix-ui";
export function Tabs({
  items,
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & {
  items: { value: string; label: string; content: React.ReactNode }[];
}) {
  return (
    <Primitive.Root
      defaultValue={items[0]?.value}
      className={cn("w-full", className)}
      {...props}
    >
      <Primitive.List className="flex gap-1 border-b border-border">
        {items.map((i) => (
          <Primitive.Trigger
            key={i.value}
            value={i.value}
            className="border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            {i.label}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      {items.map((i) => (
        <Primitive.Content key={i.value} value={i.value} className="py-5">
          {i.content}
        </Primitive.Content>
      ))}
    </Primitive.Root>
  );
}
