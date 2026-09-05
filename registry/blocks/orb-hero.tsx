"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const OrbHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive orb artwork",
  brand: "SOMA / OBJECTS OF POSSIBILITY",
  meta: "01—03",
};
export type OrbHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "artwork" | "className" | "href"
>;
export type OrbHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof OrbHeroOptions
> &
  OrbHeroOptions;
export function OrbHero({
  copy = {},
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: OrbHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "@container relative isolate overflow-hidden rounded-xl bg-[#241c2b] text-[#f4e9e0]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <OrbHeroHeader>
            <span className="tracking-widest">
              {copy.brand ?? "SOMA / OBJECTS OF POSSIBILITY"}
            </span>
            <span>{copy.meta ?? "01—03"}</span>
          </OrbHeroHeader>
          <OrbHeroContent>
            <HeroArt
              options={{
                ...artwork,
                label: copy.artworkLabel ?? artwork?.label,
                playLabel: copy.playLabel ?? artwork?.playLabel,
                pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
              }}
              kind="orb"
              color="#dfaa84"
              className="order-2 h-80 @min-[640px]:col-start-2 @min-[640px]:row-start-1 @min-[640px]:h-full"
            />
            <div className="relative z-10 order-1 flex flex-col items-start justify-center px-6 pt-8 pb-4 @min-[640px]:col-start-1 @min-[640px]:row-start-1 @min-[640px]:px-10 @min-[640px]:py-12">
              <OrbHeroTitle>
                {title ?? (
                  <>
                    Some things
                    <br />
                    just <em className="font-serif font-normal">feel</em>
                    <br />
                    different.
                  </>
                )}
              </OrbHeroTitle>
              <div className="pointer-events-auto mt-7">
                <HeroLink href={href}>
                  {actionLabel ?? <>Meet the collection</>}
                </HeroLink>
              </div>
            </div>
          </OrbHeroContent>
        </>
      )}
    </section>
  );
}

export function OrbHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="orb-hero-header"
      className={cn(
        "relative z-10 flex items-center justify-between gap-6 px-6 py-6 text-xs @min-[640px]:px-10",
        className,
      )}
      {...props}
    />
  );
}
export function OrbHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="orb-hero-content"
      className={cn(
        "relative grid @min-[640px]:min-h-[440px] @min-[640px]:grid-cols-[1.1fr_1fr]",
        className,
      )}
      {...props}
    />
  );
}
export function OrbHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="orb-hero-title"
      className={cn(
        "font-display text-[clamp(2.5rem,5.8cqi,4.5rem)] leading-[1.04] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
