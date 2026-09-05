"use client";
import * as React from "react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { TextReveal } from "../ui/text-reveal";
export const EditorialHeroCopy = {};
export type EditorialHeroOptions = Pick<
  HeroProps,
  "actionLabel" | "title" | "description" | "href" | "className"
>;
export type EditorialHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof EditorialHeroOptions
> &
  EditorialHeroOptions;
export function EditorialHero({
  actionLabel,
  title = "Make room for your next big idea.",
  description = "A thoughtful place to turn the things you imagine into the things you make.",
  href = "#start",
  className,
  children,
  ...rootProps
}: EditorialHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "grid gap-8 py-16 md:grid-cols-[2fr_1fr] md:items-end",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <EditorialHeroTitle>
            {typeof title === "string" ? (
              <TextReveal>{title}</TextReveal>
            ) : (
              title
            )}
          </EditorialHeroTitle>
          <EditorialHeroContent>
            <p className="max-w-sm text-muted-foreground">{description}</p>
            <Button asChild>
              <a href={href}>{actionLabel ?? "Explore the possibilities →"}</a>
            </Button>
          </EditorialHeroContent>
        </>
      )}
    </section>
  );
}

export function EditorialHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="editorial-hero-title"
      className={cn("max-w-4xl text-5xl leading-[1.02] md:text-7xl", className)}
      {...props}
    />
  );
}
export function EditorialHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="editorial-hero-content"
      className={cn("grid justify-items-start gap-6", className)}
      {...props}
    />
  );
}
