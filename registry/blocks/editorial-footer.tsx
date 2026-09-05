"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { FooterLinks, type FooterLinkGroup } from "./footer-links";
export function EditorialFooter({
  className,
  brand = "The Sunday Edit.",
  description = "Notes on design, culture, and paying closer attention.",
  groups,
}: {
  className?: string;
  brand?: string;
  description?: string;
  groups?: FooterLinkGroup[];
}) {
  return (
    <footer className={cn("border-t border-border py-10", className)}>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="max-w-sm font-serif text-5xl leading-tight">
            {brand}
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <FooterLinks groups={groups} />
      </div>
      <p className="mt-12 border-t border-border pt-5 text-xs text-muted-foreground">
        An illustrative publication · Made with Jez UI
      </p>
    </footer>
  );
}
