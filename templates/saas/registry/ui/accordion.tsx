"use client";
import * as React from "react";
import { Accordion as P } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";
export function Accordion({
  items,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  items?: { value: string; title: React.ReactNode; content: React.ReactNode }[];
}) {
  return (
    <P.Root className={cn("w-full", className)} {...props}>
      {items
        ? items.map((i) => (
            <AccordionItem key={i.value} value={i.value}>
              <AccordionTrigger>{i.title}</AccordionTrigger>
              <AccordionContent>{i.content}</AccordionContent>
            </AccordionItem>
          ))
        : children}
    </P.Root>
  );
}
export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof P.Item>) {
  return (
    <P.Item className={cn("border-b border-border", className)} {...props} />
  );
}
export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Trigger>) {
  return (
    <P.Header>
      <P.Trigger
        className={cn(
          "group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          size={16}
          aria-hidden
          className="shrink-0 transition-transform group-data-[state=open]:rotate-180 motion-reduce:transition-none"
        />
      </P.Trigger>
    </P.Header>
  );
}
export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Content
      style={
        {
          "--radix-collapsible-content-height":
            "var(--radix-accordion-content-height)",
        } as React.CSSProperties
      }
      className="jez-collapse overflow-hidden"
      {...props}
    >
      <div
        className={cn(
          "pb-4 text-sm leading-relaxed text-muted-foreground",
          className,
        )}
      >
        {children}
      </div>
    </P.Content>
  );
}
