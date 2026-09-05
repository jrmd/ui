"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { NewsletterSignup } from "./newsletter-signup";
import { FooterLinks, type FooterLinkGroup } from "./footer-links";
export function NewsletterFooter({
  className,
  brand = "Fieldnotes",
  groups,
  onSubmit,
}: {
  className?: string;
  brand?: string;
  groups?: FooterLinkGroup[];
  onSubmit?: (email: string) => Promise<void>;
}) {
  return (
    <footer className={cn("border-t border-border py-8", className)}>
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <NewsletterSignup onSubmit={onSubmit} />
        <FooterLinks groups={groups} />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <span className="text-2xl font-medium">{brand}</span>
        <span className="text-xs text-muted-foreground">
          A Jez UI demo publication.
        </span>
      </div>
    </footer>
  );
}
