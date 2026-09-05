"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function MarketingFooter({
  brand = "Forma",
  items = [
    { label: "Contact", href: "#contact" },
    { label: "About", href: "#about" },
  ],
  className,
}: {
  brand?: string;
  items?: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border py-8 text-sm",
        className,
      )}
    >
      <span className="font-display text-xl font-medium">{brand}</span>
      <nav aria-label="Footer" className="flex gap-5">
        {items.map((i) => (
          <a key={i.href} href={i.href}>
            {i.label}
          </a>
        ))}
      </nav>
      <span className="text-xs text-muted-foreground">
        A Jez UI demo template.
      </span>
    </footer>
  );
}
