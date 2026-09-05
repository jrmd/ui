"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const StudioHeroCopy = {
  brand: "FIELDWORK / BRAND & DIGITAL",
  meta: "INDEPENDENT BY DESIGN",
  caption: "Featured project — Fieldwork",
};
export type StudioHeroOptions = Pick<
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
export type StudioHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof StudioHeroOptions
> &
  StudioHeroOptions;
export function StudioHero({
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
}: StudioHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#22251f] text-[#ebe9dc]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <StudioHeroContent>
            <span>{copy.brand ?? "FIELDWORK / BRAND & DIGITAL"}</span>
            <span>{copy.meta ?? "INDEPENDENT BY DESIGN"}</span>
          </StudioHeroContent>
          <StudioHeroTitle>
            {title ?? (
              <>
                Rooted in strategy.
                <br />
                <span className="font-serif italic text-[#c8d3b6]">
                  Made to feel something.
                </span>
              </>
            )}
          </StudioHeroTitle>
          <div className="grid gap-8 p-7 md:grid-cols-[1.5fr_1fr] md:p-12">
            <img
              src={imageSrc ?? "/assets/fieldwork.svg"}
              alt={imageAlt ?? "Fieldwork identity study"}
              className="aspect-[16/10] w-full rounded-sm object-cover"
            />
            <div className="flex flex-col items-start justify-end gap-7">
              <p className="max-w-xs text-sm leading-relaxed text-white/65">
                {description ?? (
                  <>
                    We build identities and digital experiences for
                    organisations moving the world in a better direction.
                  </>
                )}
              </p>
              <HeroLink href={href}>
                {actionLabel ?? <>Explore our practice</>}
              </HeroLink>
              <span className="text-xs text-white/40">
                {copy.caption ?? "Featured project — Fieldwork"}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function StudioHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="studio-hero-content"
      className={cn(
        "flex justify-between p-7 text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}
export function StudioHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="studio-hero-title"
      className={cn(
        "px-7 pt-9 font-display text-5xl leading-none tracking-tight md:px-12 md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
