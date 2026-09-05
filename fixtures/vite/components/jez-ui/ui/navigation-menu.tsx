"use client";
import * as React from "react";
import { NavigationMenu as P } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";
export function NavigationMenu({
  items,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  items?: { label: React.ReactNode; href: string }[];
}) {
  return (
    <P.Root className={cn("relative", className)} {...props}>
      {items ? (
        <NavigationMenuList>
          {items.map((i) => (
            <NavigationMenuItem key={i.href}>
              <NavigationMenuLink href={i.href}>{i.label}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      ) : (
        children
      )}
    </P.Root>
  );
}
export function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof P.List>) {
  return (
    <P.List className={cn("flex flex-wrap gap-1", className)} {...props} />
  );
}
export const NavigationMenuItem = P.Item;
export function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof P.Link>) {
  return (
    <P.Link
      className={cn(
        "block rounded-lg px-3 py-2 text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary data-[active]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Trigger>) {
  return (
    <P.Trigger
      className={cn(
        "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        size={14}
        className="transition-transform group-data-[state=open]:rotate-180"
      />
    </P.Trigger>
  );
}
export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Content
      className={cn(
        "jez-popover absolute left-0 top-full z-30 grid w-72 max-w-[calc(100vw-32px)] gap-1 rounded-xl border border-border bg-background p-3 text-foreground shadow-xl",
        className,
      )}
      {...props}
    />
  );
}
