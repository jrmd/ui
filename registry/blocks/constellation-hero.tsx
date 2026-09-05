"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const ConstellationHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive constellation artwork",
  brand: "COMMON ORBIT",
  footerNote: "Different disciplines. Shared curiosity.",
};
export type ConstellationHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type ConstellationHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof ConstellationHeroOptions
> &
  ConstellationHeroOptions;
export function ConstellationHero({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: ConstellationHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "@container relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#e0eee6]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <ConstellationHeroContent>
            <div className="relative z-10 px-6 py-8 @min-[640px]:p-10">
              <p className="text-xs tracking-widest text-[#91b6a4]">
                {copy.brand ?? "COMMON ORBIT"}
              </p>
              <ConstellationHeroTitle>
                {title ?? (
                  <>
                    Better things
                    <br />
                    happen
                    <br />
                    <span className="text-[#91b6a4]">between us.</span>
                  </>
                )}
              </ConstellationHeroTitle>
              <p className="my-7 max-w-xs text-sm leading-relaxed text-[#a9bdb2]">
                {description ?? (
                  <>
                    A home for independent minds. Connect your ideas to people
                    who see what you see.
                  </>
                )}
              </p>
              <HeroLink href={href}>
                {actionLabel ?? <>Find your people</>}
              </HeroLink>
            </div>
            <div className="flex min-w-0 flex-col">
              <HeroArt
                options={{
                  ...artwork,
                  label: copy.artworkLabel ?? artwork?.label,
                  playLabel: copy.playLabel ?? artwork?.playLabel,
                  pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
                }}
                kind="constellation"
                className="h-72 @min-[640px]:h-auto @min-[640px]:min-h-80 @min-[640px]:flex-1"
              />
              <p className="border-t border-white/15 px-6 py-5 text-xs text-[#a9bdb2]">
                {copy.footerNote ?? "Different disciplines. Shared curiosity."}
              </p>
            </div>
          </ConstellationHeroContent>
        </>
      )}
    </section>
  );
}

export function ConstellationHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="constellation-hero-content"
      className={cn("grid @min-[640px]:grid-cols-[1.2fr_1fr]", className)}
      {...props}
    />
  );
}
export function ConstellationHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="constellation-hero-title"
      className={cn(
        "mt-10 font-display text-[clamp(2.5rem,5.7cqi,4.5rem)] leading-[1.04] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
