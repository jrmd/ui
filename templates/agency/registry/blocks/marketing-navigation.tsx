"use client";
import * as React from "react";
import { Slot } from "radix-ui";
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
function useMarketingNavigationModel({
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
  return { brand, items, home, className, children, rootProps };
}
const MarketingNavigationCompositionContext = React.createContext<ReturnType<
  typeof useMarketingNavigationModel
> | null>(null);
function useMarketingNavigationComposition() {
  const context = React.useContext(MarketingNavigationCompositionContext);
  if (!context)
    throw new Error(
      "MarketingNavigation parts must be inside MarketingNavigation.",
    );
  return context;
}
export function MarketingNavigation(props: MarketingNavigationProps) {
  const model = useMarketingNavigationModel(props);
  const { className, rootProps, children } = model;
  return (
    <MarketingNavigationCompositionContext.Provider value={model}>
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
            <MarketingNavigationBrand />
            <MarketingNavigationLinks />
          </>
        )}
      </header>
    </MarketingNavigationCompositionContext.Provider>
  );
}

export function MarketingNavigationBrand({
  children,
  asChild,
  ...props
}: Partial<React.ComponentProps<"a">> & { children?: React.ReactNode } & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";
  const { brand, home } = useMarketingNavigationComposition();
  return (
    <Comp
      href={home}
      {...props}
      className={cn(
        "font-display text-2xl font-bold no-underline",
        props.className,
      )}
    >
      {children === undefined ? brand : children}
    </Comp>
  );
}
export function MarketingNavigationLinks({
  children,
  ...props
}: Partial<React.ComponentProps<typeof NavigationMenu>> & {
  children?: React.ReactNode;
}) {
  const { items } = useMarketingNavigationComposition();
  return (
    <NavigationMenu
      {...props}
      items={children === undefined ? (props.items ?? items) : undefined}
    >
      {children}
    </NavigationMenu>
  );
}
