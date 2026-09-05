"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { TextReveal } from "../ui/text-reveal";
export function EditorialHero({
  title = "Make room for your next big idea.",
  description = "A thoughtful place to turn the things you imagine into the things you make.",
  href = "#start",
  className,
}: {
  title?: string;
  description?: string;
  href?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grid gap-8 py-16 md:grid-cols-[2fr_1fr] md:items-end",
        className,
      )}
    >
      <h1 className="max-w-4xl text-5xl leading-[1.02] md:text-7xl">
        <TextReveal>{title}</TextReveal>
      </h1>
      <div className="grid justify-items-start gap-6">
        <p className="max-w-sm text-muted-foreground">{description}</p>
        <Button asChild>
          <a href={href}>Explore the possibilities →</a>
        </Button>
      </div>
    </section>
  );
}
