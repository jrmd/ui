"use client";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export function CtaSection({
  className,
  href = "#start",
  title = "Bring your next project into focus.",
  action = "Talk to the team",
}: {
  className?: string;
  href?: string;
  title?: string;
  action?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-wrap items-end justify-between gap-8 border-t border-border py-12 md:py-16",
        className,
      )}
    >
      <div>
        <h2 className="max-w-xl text-4xl leading-tight md:text-5xl">{title}</h2>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Tell us how your team works. We’ll help you find a useful starting
          point.
        </p>
      </div>
      <Button asChild size="lg">
        <a href={href}>
          {action}
          <ArrowUpRight size={17} />
        </a>
      </Button>
    </section>
  );
}
