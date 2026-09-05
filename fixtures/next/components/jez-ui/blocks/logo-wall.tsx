"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function LogoWall({
  names = ["Forma", "Circa", "Outline", "Common", "Mode"],
  className,
}: {
  names?: string[];
  className?: string;
}) {
  return (
    <section className={cn("border-y border-border py-7", className)}>
      <p className="mb-5 text-xs text-muted-foreground">
        Illustrative brand collection
      </p>
      <div className="flex flex-wrap items-center justify-between gap-8">
        {names.map((n) => (
          <span key={n} className="font-display text-2xl font-semibold">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}
