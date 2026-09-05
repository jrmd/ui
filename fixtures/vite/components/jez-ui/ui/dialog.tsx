"use client";
import * as React from "react";
import { cn } from "./utils";
import { Dialog as Primitive } from "radix-ui";
import { Button } from "./button";
export function Dialog({
  trigger,
  title,
  description,
  children,
  className,
  onConfirm: _onConfirm,
  ...props
}: React.ComponentProps<typeof Primitive.Root> & {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  onConfirm?: () => void;
}) {
  return (
    <Primitive.Root {...props}>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Overlay className="fixed inset-0 z-50 bg-black/45" />
        <Primitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(92vw,460px)] max-h-[85dvh] overflow-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background p-7 text-foreground shadow-xl",
            className,
          )}
        >
          <Primitive.Title className="text-xl font-semibold">
            {title}
          </Primitive.Title>
          <Primitive.Description className="mt-2 mb-5 text-sm text-muted-foreground">
            {description}
          </Primitive.Description>
          {children}
          <Primitive.Close asChild>
            <Button variant="outline" className="mt-6">
              Close
            </Button>
          </Primitive.Close>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
