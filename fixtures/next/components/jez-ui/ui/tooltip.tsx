"use client";
import * as React from "react";
import { Tooltip as P } from "radix-ui";
import { cn } from "./utils";
export const TooltipProvider = P.Provider;
export const TooltipTrigger = P.Trigger;
export function Tooltip({
  children,
  content,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  content?: React.ReactNode;
  className?: string;
}) {
  if (content === undefined) return <P.Root {...props}>{children}</P.Root>;
  return (
    <P.Provider delayDuration={250}>
      <P.Root {...props}>
        {content !== undefined ? (
          <>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent className={className}>{content}</TooltipContent>
          </>
        ) : (
          children
        )}
      </P.Root>
    </P.Provider>
  );
}
export function TooltipContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <P.Content
        sideOffset={6}
        collisionPadding={8}
        className={cn(
          "jez-popover z-50 max-w-xs rounded-lg bg-foreground px-3 py-2 text-xs leading-relaxed text-background",
          className,
        )}
        {...props}
      >
        {children}
        <P.Arrow className="fill-foreground" />
      </P.Content>
    </P.Portal>
  );
}
