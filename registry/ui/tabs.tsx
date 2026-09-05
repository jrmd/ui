"use client";
import * as React from "react";
import { Tabs as P } from "radix-ui";
import { cn } from "./utils";
export function Tabs({
  items,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  items?: { value: string; label: React.ReactNode; content: React.ReactNode }[];
}) {
  return (
    <P.Root
      defaultValue={items?.[0]?.value}
      className={cn("w-full", className)}
      {...props}
    >
      {items ? (
        <>
          <TabsList>
            {items.map((i) => (
              <TabsTrigger key={i.value} value={i.value}>
                {i.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((i) => (
            <TabsContent key={i.value} value={i.value}>
              {i.content}
            </TabsContent>
          ))}
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof P.List>) {
  return (
    <P.List
      className={cn("flex flex-wrap gap-1 border-b border-border", className)}
      {...props}
    />
  );
}
export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof P.Trigger>) {
  return (
    <P.Trigger
      className={cn(
        "border-b-2 border-transparent px-4 py-3 text-sm outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 data-[state=active]:border-primary data-[state=active]:text-primary",
        className,
      )}
      {...props}
    />
  );
}
export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Content
      className={cn(
        "py-5 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      {...props}
    />
  );
}
