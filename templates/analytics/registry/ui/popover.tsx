"use client";
import * as React from "react";
import { Popover as P } from "radix-ui";
import { cn } from "./utils";
export function Popover({
  trigger,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  trigger?: React.ReactNode;
  className?: string;
}) {
  return (
    <P.Root {...props}>
      {trigger !== undefined ? (
        <>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent className={className}>{children}</PopoverContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const PopoverTrigger = P.Trigger;
export const PopoverAnchor = P.Anchor;
export const PopoverClose = P.Close;
export function PopoverContent({
  className,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <P.Content
        sideOffset={8}
        align="start"
        collisionPadding={16}
        className={cn(
          "jez-popover z-50 w-72 max-w-[calc(100vw-32px)] rounded-xl border border-border bg-background p-5 text-sm leading-relaxed text-foreground shadow-lg",
          className,
        )}
        {...props}
      />
    </P.Portal>
  );
}
export function PopoverHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mb-4 grid gap-1.5", className)} {...props} />;
}
export function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("font-medium leading-tight", className)} {...props} />
  );
}
export function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}
