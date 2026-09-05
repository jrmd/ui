"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const MediaHeroCopy = {
  brand: "Objects for living.",
  eyebrow: "THE EVERYDAY COLLECTION",
  caption: "Studio lamp / Sand / No. 004",
};
export type MediaHeroOptions = Pick<
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
export type MediaHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof MediaHeroOptions
> &
  MediaHeroOptions;
export function MediaHero({
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
}: MediaHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#e8e2d6] text-[#302f29]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <MediaHeroContent>
            <div className="flex flex-col items-start justify-between gap-12 p-8 md:p-12">
              <span className="font-serif text-2xl">
                {copy.brand ?? "Objects for living."}
              </span>
              <div>
                <p className="mb-5 text-xs tracking-widest">
                  {copy.eyebrow ?? "THE EVERYDAY COLLECTION"}
                </p>
                <MediaHeroTitle>
                  {title ?? (
                    <>
                      A little
                      <br />
                      more light.
                    </>
                  )}
                </MediaHeroTitle>
                <p className="my-7 max-w-xs text-sm leading-relaxed">
                  {description ?? (
                    <>
                      Useful things, thoughtfully made. Meet the pieces that
                      make a space feel like yours.
                    </>
                  )}
                </p>
                <HeroLink href={href}>
                  {actionLabel ?? <>Discover the collection</>}
                </HeroLink>
              </div>
              <span className="text-xs">
                {copy.caption ?? "Studio lamp / Sand / No. 004"}
              </span>
            </div>
            <img
              src={imageSrc ?? "/assets/studio-lamp-cover.svg"}
              alt={imageAlt ?? "Sculptural studio lamp in a warm interior"}
              className="h-96 w-full object-cover md:h-[620px]"
            />
          </MediaHeroContent>
        </>
      )}
    </section>
  );
}

export function MediaHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="media-hero-content"
      className={cn("grid md:grid-cols-[1fr_1.1fr]", className)}
      {...props}
    />
  );
}
export function MediaHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="media-hero-title"
      className={cn(
        "font-serif text-6xl leading-none tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
