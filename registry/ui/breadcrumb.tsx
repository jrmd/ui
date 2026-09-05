"use client";
import * as React from "react";
import { cn } from "./utils";
export function Breadcrumb({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap gap-2">
        {items.map((i, n) => (
          <li key={n} className="flex gap-2">
            {n > 0 && (
              <span aria-hidden="true" className="text-muted-foreground">
                /
              </span>
            )}
            {i.href ? (
              <a
                href={i.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {i.label}
              </a>
            ) : (
              <span aria-current="page">{i.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
