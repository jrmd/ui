"use client";
import * as React from "react";
import { cn } from "./utils";
import { Checkbox as Primitive } from "radix-ui";
export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root
      className={cn(
        "size-5 rounded border border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <Primitive.Indicator className="flex items-center justify-center">
        <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
          <path
            d="m3 8 3 3 7-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </Primitive.Indicator>
    </Primitive.Root>
  );
}
