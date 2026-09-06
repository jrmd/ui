"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { NewsletterSignup } from "./newsletter-signup";
import { FooterLinks, type FooterLinkGroup } from "./footer-links";
export type NewsletterFooterOptions = {
  className?: string;
  brand?: string;
  groups?: FooterLinkGroup[];
  onSubmit?: (email: string) => Promise<void>;
};
export type NewsletterFooterProps = Omit<
  React.ComponentProps<"footer">,
  keyof NewsletterFooterOptions
> &
  NewsletterFooterOptions;
function useNewsletterFooterModel({
  className,
  brand = "Fieldnotes",
  groups,
  onSubmit,
  children,
  ...rootProps
}: NewsletterFooterProps) {
  return { className, brand, groups, onSubmit, children, rootProps };
}
const NewsletterFooterCompositionContext = React.createContext<ReturnType<
  typeof useNewsletterFooterModel
> | null>(null);
function useNewsletterFooterComposition() {
  const context = React.useContext(NewsletterFooterCompositionContext);
  if (!context)
    throw new Error("NewsletterFooter parts must be inside NewsletterFooter.");
  return context;
}
export function NewsletterFooter(props: NewsletterFooterProps) {
  const model = useNewsletterFooterModel(props);
  const { className, rootProps, children } = model;
  return (
    <NewsletterFooterCompositionContext.Provider value={model}>
      <footer
        {...rootProps}
        className={cn("border-t border-border py-8", className)}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <NewsletterFooterColumns />
            <NewsletterFooterBranding />
          </>
        )}
      </footer>
    </NewsletterFooterCompositionContext.Provider>
  );
}

export function NewsletterFooterContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="newsletter-footer-content"
      className={cn(
        "grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]",
        className,
      )}
      {...props}
    />
  );
}
export function NewsletterFooterHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="newsletter-footer-header"
      className={cn(
        "mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6",
        className,
      )}
      {...props}
    />
  );
}

export function NewsletterFooterColumns({
  children,
  ...props
}: Partial<React.ComponentProps<typeof NewsletterFooterContent>> & {
  children?: React.ReactNode;
}) {
  const { groups, onSubmit } = useNewsletterFooterComposition();
  return (
    <NewsletterFooterContent {...props}>
      {children === undefined ? (
        <>
          <NewsletterSignup onSubmit={onSubmit} />
          <FooterLinks groups={groups} />
        </>
      ) : (
        children
      )}
    </NewsletterFooterContent>
  );
}
export function NewsletterFooterBranding({
  children,
  ...props
}: Partial<React.ComponentProps<typeof NewsletterFooterHeader>> & {
  children?: React.ReactNode;
}) {
  const { brand } = useNewsletterFooterComposition();
  return (
    <NewsletterFooterHeader {...props}>
      {children === undefined ? (
        <>
          <span className="text-2xl font-medium">{brand}</span>
          <span className="text-xs text-muted-foreground">
            A Jez UI demo publication.
          </span>
        </>
      ) : (
        children
      )}
    </NewsletterFooterHeader>
  );
}
