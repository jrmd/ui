"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "./utils";
export function Breadcrumb({
  items,
  children,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items?: { label: React.ReactNode; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm", className)}
      {...props}
    >
      {items ? (
        <BreadcrumbList>
          {items.map((i, n) => (
            <React.Fragment key={n}>
              {n > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {i.href ? (
                  <BreadcrumbLink href={i.href}>{i.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{i.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      ) : (
        children
      )}
    </nav>
  );
}
export function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex list-none flex-wrap items-center gap-2 p-0",
        className,
      )}
      {...props}
    />
  );
}
export function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    />
  );
}
export function BreadcrumbLink({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      className={cn("text-muted-foreground hover:text-foreground", className)}
      {...props}
    />
  );
}
export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("text-foreground", className)}
      {...props}
    />
  );
}
export function BreadcrumbSeparator({
  children = "/",
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children}
    </li>
  );
}
