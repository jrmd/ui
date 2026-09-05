"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const PortfolioHeroCopy = {
  brand: "ALEX RIVERS / DESIGN ENGINEER",
  meta: "Independent practice",
};
export type PortfolioHeroOptions = Pick<
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
export type PortfolioHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof PortfolioHeroOptions
> &
  PortfolioHeroOptions;
export function PortfolioHero({
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
}: PortfolioHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#ecece7] text-[#262923]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <PortfolioHeroHeader>
            <span>{copy.brand ?? "ALEX RIVERS / DESIGN ENGINEER"}</span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#557746]" />
              {copy.meta ?? "Independent practice"}
            </span>
          </PortfolioHeroHeader>
          <PortfolioHeroContent>
            <div>
              <PortfolioHeroTitle>
                {title ?? (
                  <>
                    Thoughtful
                    <br />
                    by design.
                    <br />
                    <span className="text-[#7a8171]">
                      Useful by
                      <br />
                      default.
                    </span>
                  </>
                )}
              </PortfolioHeroTitle>
              <div className="mt-8">
                <HeroLink href={href}>
                  {actionLabel ?? <>Selected projects</>}
                </HeroLink>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-5">
              <img
                src={imageSrc ?? "/assets/common.svg"}
                alt={imageAlt ?? "Common identity and digital design project"}
                className="aspect-square w-full -rotate-3 object-cover shadow-lg"
              />
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#676d60]">
                {description ?? (
                  <>
                    I bring design and engineering together to make the web feel
                    a little more human.
                  </>
                )}
              </p>
            </div>
          </PortfolioHeroContent>
        </>
      )}
    </section>
  );
}

export function PortfolioHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="portfolio-hero-header"
      className={cn("flex items-center justify-between p-7 text-xs", className)}
      {...props}
    />
  );
}
export function PortfolioHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="portfolio-hero-content"
      className={cn(
        "grid gap-10 px-7 py-12 md:grid-cols-[1.4fr_1fr] md:px-12",
        className,
      )}
      {...props}
    />
  );
}
export function PortfolioHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="portfolio-hero-title"
      className={cn(
        "font-display text-5xl leading-[1.05] tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
