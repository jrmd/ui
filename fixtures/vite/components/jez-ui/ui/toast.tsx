"use client";
import * as React from "react";
import { cn } from "./utils";
import { Toast as Primitive } from "radix-ui";
import { Button } from "./button";
export function Toast({
  title,
  description,
  trigger = "Show notification",
  className,
}: {
  title: string;
  description: string;
  trigger?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Primitive.Provider swipeDirection="right">
      <Button variant="outline" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <Primitive.Root
        open={open}
        onOpenChange={setOpen}
        className={cn(
          "rounded-xl border border-border bg-background p-5 text-foreground shadow-lg",
          className,
        )}
      >
        <Primitive.Title className="font-medium">{title}</Primitive.Title>
        <Primitive.Description className="mt-1 text-sm text-muted-foreground">
          {description}
        </Primitive.Description>
        <Primitive.Close
          aria-label="Dismiss notification"
          className="mt-3 text-sm underline"
        >
          Dismiss
        </Primitive.Close>
      </Primitive.Root>
      <Primitive.Viewport className="fixed bottom-5 right-5 z-[100] w-[min(90vw,360px)]" />
    </Primitive.Provider>
  );
}
