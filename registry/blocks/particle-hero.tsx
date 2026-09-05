"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const ParticleHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive particles artwork",
  eyebrow: "ATLAS / COLLECTIVE INTELLIGENCE",
};
export type ParticleHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type ParticleHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof ParticleHeroOptions
> &
  ParticleHeroOptions;
export function ParticleHero({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: ParticleHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#10101c] text-[#efedf7]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <ParticleHeroContent>
            <p className="text-xs tracking-[.3em] text-[#b9a4f8]">
              {copy.eyebrow ?? "ATLAS / COLLECTIVE INTELLIGENCE"}
            </p>
            <ParticleHeroTitle>
              {title ?? (
                <>
                  A million signals.
                  <br />
                  One new perspective.
                </>
              )}
            </ParticleHeroTitle>
          </ParticleHeroContent>
          <HeroArt
            options={{
              ...artwork,
              label: copy.artworkLabel ?? artwork?.label,
              playLabel: copy.playLabel ?? artwork?.playLabel,
              pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
            }}
            kind="particles"
            className="-mt-6 h-80 md:h-96"
          />
          <ParticleHeroHeader>
            <p className="max-w-sm text-sm text-white/60">
              {description ?? (
                <>
                  Find the patterns hiding in plain sight. Make space for the
                  next discovery.
                </>
              )}
            </p>
            <HeroLink href={href}>
              {actionLabel ?? <>Start exploring</>}
            </HeroLink>
          </ParticleHeroHeader>
        </>
      )}
    </section>
  );
}

export function ParticleHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="particle-hero-content"
      className={cn("relative z-10 px-7 pt-9 text-center", className)}
      {...props}
    />
  );
}
export function ParticleHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="particle-hero-title"
      className={cn(
        "mx-auto mt-8 max-w-2xl font-display text-5xl leading-[.95] tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
export function ParticleHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="particle-hero-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-5 border-t border-white/15 p-7",
        className,
      )}
      {...props}
    />
  );
}
