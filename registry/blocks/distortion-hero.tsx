"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const DistortionHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive distortion artwork",
  brand: "FORM / EXPERIMENTAL DESIGN OFFICE",
  meta: "EST. 2026",
};
export type DistortionHeroOptions = Pick<
  HeroProps,
  | "artworkText"
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type DistortionHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof DistortionHeroOptions
> &
  DistortionHeroOptions;
export function DistortionHero({
  artworkText,
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: DistortionHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#d7dfcf] text-[#28352d]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <DistortionHeroHeader>
            <span>{copy.brand ?? "FORM / EXPERIMENTAL DESIGN OFFICE"}</span>
            <span>{copy.meta ?? "EST. 2026"}</span>
          </DistortionHeroHeader>
          <HeroArt
            text={artworkText}
            options={{
              ...artwork,
              label: copy.artworkLabel ?? artwork?.label,
              playLabel: copy.playLabel ?? artwork?.playLabel,
              pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
            }}
            kind="distortion"
            className="h-72 md:h-96"
          />
          <DistortionHeroContent>
            <DistortionHeroTitle>
              {title ?? (
                <>
                  Nothing good
                  <br />
                  stands still.
                </>
              )}
            </DistortionHeroTitle>
            <div className="flex flex-col items-start gap-5">
              <p className="max-w-sm text-sm leading-relaxed">
                {description ?? (
                  <>
                    Identities that move. Experiences that respond. A practice
                    built around the possibilities of the screen.
                  </>
                )}
              </p>
              <HeroLink href={href}>
                {actionLabel ?? <>See what moves us</>}
              </HeroLink>
            </div>
          </DistortionHeroContent>
        </>
      )}
    </section>
  );
}

export function DistortionHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="distortion-hero-header"
      className={cn(
        "flex items-center justify-between border-b border-[#28352d]/20 p-7 text-xs",
        className,
      )}
      {...props}
    />
  );
}
export function DistortionHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="distortion-hero-content"
      className={cn(
        "grid gap-6 border-t border-[#28352d]/20 p-8 md:grid-cols-2",
        className,
      )}
      {...props}
    />
  );
}
export function DistortionHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="distortion-hero-title"
      className={cn(
        "font-display text-4xl leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
