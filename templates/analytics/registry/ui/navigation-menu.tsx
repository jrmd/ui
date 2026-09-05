"use client";
import * as React from "react";
import { cn } from "./utils";
import { NavigationMenu as Primitive } from "radix-ui";
export function NavigationMenu({
  items,
  className,
}: {
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <Primitive.Root className={cn("", className)}>
      <Primitive.List className="flex flex-wrap gap-1">
        {items.map((i) => (
          <Primitive.Item key={i.href}>
            <Primitive.Link
              href={i.href}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
            >
              {i.label}
            </Primitive.Link>
          </Primitive.Item>
        ))}
      </Primitive.List>
    </Primitive.Root>
  );
}
