"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const JournalHeroCopy = {
  brand: "Still.",
  tagline: "A journal for paying attention",
  eyebrow: "From the editor / Issue 04",
  caption: "A slower internet. A wider view.",
};
export type JournalHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "imageSrc"
  | "imageAlt"
  | "className"
  | "href"
>;
export type JournalHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof JournalHeroOptions
> &
  JournalHeroOptions;
export function JournalHero({
  copy = {},
  title,
  actionLabel,
  description,
  imageSrc,
  imageAlt,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: JournalHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#f6f0e7] text-[#43372d]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <JournalHeroHeader>
            <span className="font-serif text-4xl">
              {copy.brand ?? "Still."}
            </span>
            <span className="text-xs">
              {copy.tagline ?? "A journal for paying attention"}
            </span>
          </JournalHeroHeader>
          <JournalHeroContent>
            <div className="flex flex-col items-start justify-between gap-8">
              <p className="text-xs uppercase tracking-widest">
                {copy.eyebrow ?? "From the editor / Issue 04"}
              </p>
              <JournalHeroTitle>
                {title ?? (
                  <>
                    The art of
                    <br />
                    <em>noticing.</em>
                  </>
                )}
              </JournalHeroTitle>
              <p className="max-w-xs text-sm leading-relaxed">
                {description ?? (
                  <>
                    On small observations, everyday objects, and the things we
                    miss when we move too quickly.
                  </>
                )}
              </p>
              <HeroLink href={href}>
                {actionLabel ?? <>Read the latest issue</>}
              </HeroLink>
            </div>
            <figure>
              <img
                src={imageSrc ?? "/assets/editorial-slow.svg"}
                alt={
                  imageAlt ?? "Abstract editorial study in warm geometric forms"
                }
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-3 text-xs text-[#43372d]/65">
                {copy.caption ?? "A slower internet. A wider view."}
              </figcaption>
            </figure>
          </JournalHeroContent>
        </>
      )}
    </section>
  );
}

export function JournalHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="journal-hero-header"
      className={cn(
        "flex items-end justify-between border-b border-[#43372d]/25 p-7",
        className,
      )}
      {...props}
    />
  );
}
export function JournalHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="journal-hero-content"
      className={cn(
        "grid gap-8 p-7 md:grid-cols-[1fr_1.2fr] md:p-10",
        className,
      )}
      {...props}
    />
  );
}
export function JournalHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="journal-hero-title"
      className={cn(
        "font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}
