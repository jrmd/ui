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
export function NewsletterFooter({
  className,
  brand = "Fieldnotes",
  groups,
  onSubmit,
  children,
  ...rootProps
}: NewsletterFooterProps) {
  return (
    <footer
      {...rootProps}
      className={cn("border-t border-border py-8", className)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <NewsletterFooterContent>
            <NewsletterSignup onSubmit={onSubmit} />
            <FooterLinks groups={groups} />
          </NewsletterFooterContent>
          <NewsletterFooterHeader>
            <span className="text-2xl font-medium">{brand}</span>
            <span className="text-xs text-muted-foreground">
              A Jez UI demo publication.
            </span>
          </NewsletterFooterHeader>
        </>
      )}
    </footer>
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
