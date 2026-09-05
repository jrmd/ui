"use client";
import * as React from "react";
import { cn } from "./utils";
import { Popover as Primitive } from "radix-ui";
export function Popover({
  trigger,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Primitive.Root {...props}>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          sideOffset={8}
          align="start"
          collisionPadding={16}
          className={cn(
            "jez-popover z-50 max-w-[calc(100vw-32px)] w-72 rounded-xl border border-border bg-background p-5 text-foreground shadow-lg",
            className,
          )}
        >
          {children}
          <Primitive.Arrow className="fill-background" />
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
