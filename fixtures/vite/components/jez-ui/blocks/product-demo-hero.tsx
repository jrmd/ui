"use client";
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { ProjectPreview } from "./project-preview";
export const ProductDemoHeroCopy = {
  footerNote:
    "Try the project: switch views, open a task, or mark something done.",
};
export function ProductDemoHero({
  title,
  description,
  actionLabel,
  copy = {},
  children,
  preview,
  className,
  href = "#features",
}: HeroProps & { children?: React.ReactNode }) {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="mb-10 grid gap-7 md:mb-14 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-12">
        <h1 className="max-w-2xl text-5xl leading-[1.04] tracking-[-.035em] md:text-7xl">
          {title ?? (
            <>
              A clear view.
              <br />
              <span className="text-muted-foreground">
                A shared finish line.
              </span>
            </>
          )}
        </h1>
        <div className="max-w-sm md:justify-self-end">
          <p className="text-base leading-relaxed text-muted-foreground">
            {description ?? (
              <>
                Projects, decisions, and the work in between. Bring your team
                into one workspace where everyone can see what happens next.
              </>
            )}
          </p>
          <Button asChild className="mt-6">
            <a href={href}>
              {actionLabel ?? "Explore the workspace"} <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </div>
      {children ?? preview ?? <ProjectPreview />}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {copy.footerNote ??
          "Try the project: switch views, open a task, or mark something done."}
      </p>
    </section>
  );
}
