"use client";
import * as React from "react";
import { Collapsible as P } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";
export function Collapsible({
  title,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof P.Root>, "title"> & {
  title?: React.ReactNode;
}) {
  return (
    <P.Root
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border",
        className,
      )}
      {...props}
    >
      {title !== undefined ? (
        <>
          <CollapsibleTrigger>{title}</CollapsibleTrigger>
          <CollapsibleContent>{children}</CollapsibleContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export function CollapsibleTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Trigger>) {
  return (
    <P.Trigger
      className={cn(
        "group flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium outline-none hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        size={16}
        className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none"
      />
    </P.Trigger>
  );
}
export function CollapsibleContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Content className="jez-collapse overflow-hidden" {...props}>
      <div
        className={cn(
          "border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground",
          className,
        )}
      >
        {children}
      </div>
    </P.Content>
  );
}
