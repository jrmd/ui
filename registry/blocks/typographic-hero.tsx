"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const TypographicHeroCopy = {
  brand: "OTHER® — DESIGN & DIRECTION",
  meta: "OPEN TO GOOD PROBLEMS",
};
export type TypographicHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "description" | "className" | "href"
>;
export type TypographicHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof TypographicHeroOptions
> &
  TypographicHeroOptions;
export function TypographicHero({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: TypographicHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#ef582f] text-[#231d18]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <TypographicHeroHeader>
            <span>{copy.brand ?? "OTHER® — DESIGN & DIRECTION"}</span>
            <span>{copy.meta ?? "OPEN TO GOOD PROBLEMS"}</span>
          </TypographicHeroHeader>
          <TypographicHeroContent>
            <TypographicHeroTitle>
              {title ?? (
                <>
                  GOOD
                  <br />
                  <span className="block text-right">WEIRD.</span>
                  <span className="block">WORK.</span>
                </>
              )}
            </TypographicHeroTitle>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-7">
              <p className="max-w-xs text-sm leading-relaxed">
                {description ?? (
                  <>
                    For people with something to say. We turn a point of view
                    into a world you can step inside.
                  </>
                )}
              </p>
              <HeroLink href={href}>
                {actionLabel ?? <>Take a look around</>}
              </HeroLink>
            </div>
          </TypographicHeroContent>
        </>
      )}
    </section>
  );
}

export function TypographicHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typographic-hero-header"
      className={cn(
        "flex items-center justify-between border-b border-black/20 p-7 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}
export function TypographicHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typographic-hero-content"
      className={cn("p-7 md:p-12", className)}
      {...props}
    />
  );
}
export function TypographicHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="typographic-hero-title"
      className={cn(
        "font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-[.82] tracking-[-.075em]",
        className,
      )}
      {...props}
    />
  );
}
