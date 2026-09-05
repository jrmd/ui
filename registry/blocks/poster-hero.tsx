"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const PosterHeroCopy = {
  brand: "ASSEMBLY / A GATHERING OF IDEAS",
  meta: "ONLINE & EVERYWHERE",
  tagline: "Design. Culture.",
  taglineEnd: "Whatever comes next.",
};
export type PosterHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "description" | "className" | "href"
>;
export type PosterHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof PosterHeroOptions
> &
  PosterHeroOptions;
export function PosterHero({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: PosterHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#dfeb5a] text-[#243022]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <PosterHeroContent>
            <div className="flex justify-between text-xs font-medium">
              <span>{copy.brand ?? "ASSEMBLY / A GATHERING OF IDEAS"}</span>
              <span>{copy.meta ?? "ONLINE & EVERYWHERE"}</span>
            </div>
            <div className="my-12 border-y-2 border-[#243022] py-6">
              <PosterHeroTitle>
                {title ?? (
                  <>
                    COME WITH
                    <br />
                    QUESTIONS.
                    <br />
                    <span className="font-serif font-normal italic tracking-tight">
                      Leave inspired.
                    </span>
                  </>
                )}
              </PosterHeroTitle>
            </div>
            <div className="grid gap-7 md:grid-cols-[1fr_1fr_auto]">
              <p className="text-sm font-medium">
                {copy.tagline ?? "Design. Culture."}
                <br />
                {copy.taglineEnd ?? "Whatever comes next."}
              </p>
              <p className="max-w-xs text-sm leading-relaxed">
                {description ?? (
                  <>
                    Conversations for curious people. A programme built around
                    sharing what we know and asking what we don’t.
                  </>
                )}
              </p>
              <div>
                <HeroLink href={href}>
                  {actionLabel ?? <>View programme</>}
                </HeroLink>
              </div>
            </div>
          </PosterHeroContent>
        </>
      )}
    </section>
  );
}

export function PosterHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="poster-hero-content"
      className={cn("p-7 md:p-12", className)}
      {...props}
    />
  );
}
export function PosterHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="poster-hero-title"
      className={cn(
        "font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[.86] tracking-[-.065em]",
        className,
      )}
      {...props}
    />
  );
}
