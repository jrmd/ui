"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const CollageHeroCopy = {
  brand: "In good company",
  meta: "OBJECTS / STORIES / PEOPLE",
  eyebrow: "Room for the everyday",
  footerNote: "A collection of things worth keeping close.",
};
export type CollageHeroOptions = Pick<
  HeroProps,
  | "secondaryImageSrc"
  | "secondaryImageAlt"
  | "copy"
  | "title"
  | "actionLabel"
  | "imageSrc"
  | "imageAlt"
  | "className"
  | "href"
>;
export type CollageHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof CollageHeroOptions
> &
  CollageHeroOptions;
export function CollageHero({
  secondaryImageSrc,
  secondaryImageAlt,
  copy = {},
  title,
  actionLabel,
  imageSrc,
  imageAlt,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: CollageHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#e8d4c3] text-[#412f25]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <CollageHeroContent>
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl italic">
                {copy.brand ?? "In good company"}
              </span>
              <span className="text-xs">
                {copy.meta ?? "OBJECTS / STORIES / PEOPLE"}
              </span>
            </div>
            <div className="grid items-center gap-6 py-12 md:grid-cols-[.7fr_1.2fr_.7fr]">
              <img
                src={imageSrc ?? "/assets/studio-lamp-cover.svg"}
                alt={imageAlt ?? "A considered object for the home"}
                className="mx-auto hidden aspect-[3/4] w-full -rotate-6 object-cover md:block"
              />
              <div className="relative z-10 text-center">
                <p className="mb-5 text-xs uppercase tracking-widest">
                  {copy.eyebrow ?? "Room for the everyday"}
                </p>
                <CollageHeroTitle>
                  {title ?? (
                    <>
                      Life, with
                      <br />
                      <em>
                        a little
                        <br />
                        character.
                      </em>
                    </>
                  )}
                </CollageHeroTitle>
                <div className="mt-7">
                  <HeroLink href={href}>
                    {actionLabel ?? <>Come on in</>}
                  </HeroLink>
                </div>
              </div>
              <img
                src={secondaryImageSrc ?? "/assets/editorial-question.svg"}
                alt={
                  secondaryImageAlt ?? "A colourful study of shapes and balance"
                }
                className="mx-auto aspect-[4/3] w-3/4 rotate-6 object-cover md:aspect-[3/4] md:w-full"
              />
            </div>
            <p className="border-t border-[#412f25]/20 pt-6 text-center text-xs">
              {copy.footerNote ?? "A collection of things worth keeping close."}
            </p>
          </CollageHeroContent>
        </>
      )}
    </section>
  );
}

export function CollageHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collage-hero-content"
      className={cn("p-7 md:p-10", className)}
      {...props}
    />
  );
}
export function CollageHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="collage-hero-title"
      className={cn(
        "font-serif text-6xl leading-none tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
