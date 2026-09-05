"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type MarketingFooterOptions = {
  brand?: string;
  items?: { label: string; href: string }[];
  className?: string;
};
export type MarketingFooterProps = Omit<
  React.ComponentProps<"footer">,
  keyof MarketingFooterOptions
> &
  MarketingFooterOptions;
export function MarketingFooter({
  brand = "Forma",
  items = [
    { label: "Contact", href: "#contact" },
    { label: "About", href: "#about" },
  ],
  className,
  children,
  ...rootProps
}: MarketingFooterProps) {
  return (
    <footer
      {...rootProps}
      className={cn(
        "mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border py-8 text-sm",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <span className="font-display text-xl font-medium">{brand}</span>
          <MarketingFooterNavigation aria-label="Footer">
            {items.map((i) => (
              <a key={i.href} href={i.href}>
                {i.label}
              </a>
            ))}
          </MarketingFooterNavigation>
          <span className="text-xs text-muted-foreground">
            A Jez UI demo template.
          </span>
        </>
      )}
    </footer>
  );
}

export function MarketingFooterNavigation({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="marketing-footer-navigation"
      className={cn("flex gap-5", className)}
      {...props}
    />
  );
}
