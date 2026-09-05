"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { NavigationMenu } from "../ui/navigation-menu";
export type MarketingNavigationOptions = {
  brand?: string;
  items?: { label: string; href: string }[];
  home?: string;
  className?: string;
};
export type MarketingNavigationProps = Omit<
  React.ComponentProps<"header">,
  keyof MarketingNavigationOptions
> &
  MarketingNavigationOptions;
export function MarketingNavigation({
  brand = "Forma",
  items = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  home = "/",
  className,
  children,
  ...rootProps
}: MarketingNavigationProps) {
  return (
    <header
      {...rootProps}
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-b border-border py-5",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <a
            href={home}
            className="font-display text-2xl font-bold no-underline"
          >
            {brand}
          </a>
          <NavigationMenu items={items} />
        </>
      )}
    </header>
  );
}
