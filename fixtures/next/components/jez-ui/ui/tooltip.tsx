"use client";
import * as React from "react";
import { cn } from "./utils";
import { Tooltip as Primitive } from "radix-ui";
export function Tooltip({
  children,
  content,
  className,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <Primitive.Provider delayDuration={250}>
      <Primitive.Root>
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>
        <Primitive.Portal>
          <Primitive.Content
            sideOffset={6}
            className={cn(
              "z-50 rounded-lg bg-foreground px-3 py-2 text-xs text-background",
              className,
            )}
          >
            {content}
            <Primitive.Arrow className="fill-foreground" />
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </Primitive.Provider>
  );
}
