"use client";
import * as React from "react";
import { cn } from "./utils";
import { Accordion as Primitive } from "radix-ui";
export function Accordion({
  items,
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & {
  items: { value: string; title: string; content: React.ReactNode }[];
}) {
  return (
    <Primitive.Root className={cn("w-full", className)} {...props}>
      {items.map((i) => (
        <Primitive.Item
          key={i.value}
          value={i.value}
          className="border-b border-border"
        >
          <Primitive.Header>
            <Primitive.Trigger className="flex w-full justify-between gap-4 py-4 text-left font-medium">
              {i.title}
              <span aria-hidden="true">+</span>
            </Primitive.Trigger>
          </Primitive.Header>
          <Primitive.Content className="pb-4 text-sm text-muted-foreground">
            {i.content}
          </Primitive.Content>
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
