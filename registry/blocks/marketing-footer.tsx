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
function useMarketingFooterModel({
  brand = "Forma",
  items = [
    { label: "Contact", href: "#contact" },
    { label: "About", href: "#about" },
  ],
  className,
  children,
  ...rootProps
}: MarketingFooterProps) {
  return { brand, items, className, children, rootProps };
}
const MarketingFooterCompositionContext = React.createContext<ReturnType<
  typeof useMarketingFooterModel
> | null>(null);
function useMarketingFooterComposition() {
  const context = React.useContext(MarketingFooterCompositionContext);
  if (!context)
    throw new Error("MarketingFooter parts must be inside MarketingFooter.");
  return context;
}
export function MarketingFooter(props: MarketingFooterProps) {
  const model = useMarketingFooterModel(props);
  const { className, rootProps, children } = model;
  return (
    <MarketingFooterCompositionContext.Provider value={model}>
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
            <MarketingFooterBrand />
            <MarketingFooterLinks />
            <MarketingFooterNote />
          </>
        )}
      </footer>
    </MarketingFooterCompositionContext.Provider>
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

export function MarketingFooterBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { brand } = useMarketingFooterComposition();
  return (
    <span
      {...props}
      className={cn("font-display text-xl font-medium", props.className)}
    >
      {children === undefined ? brand : children}
    </span>
  );
}
export function MarketingFooterLinks({
  children,
  ...props
}: Partial<React.ComponentProps<typeof MarketingFooterNavigation>> & {
  children?: React.ReactNode;
}) {
  const { items } = useMarketingFooterComposition();
  return (
    <MarketingFooterNavigation aria-label="Footer" {...props}>
      {children === undefined
        ? items.map((i) => (
            <a key={i.href} href={i.href}>
              {i.label}
            </a>
          ))
        : children}
    </MarketingFooterNavigation>
  );
}
export function MarketingFooterNote({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  return (
    <span
      {...props}
      className={cn("text-xs text-muted-foreground", props.className)}
    >
      {children === undefined ? "A Jez UI demo template." : children}
    </span>
  );
}
