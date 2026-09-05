"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const EclipseHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive eclipse artwork",
  brand: "UMBRA",
  eyebrow: "An encounter with the unseen",
  footerNote: "A digital exhibition · Open to everyone",
};
export type EclipseHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type EclipseHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof EclipseHeroOptions
> &
  EclipseHeroOptions;
export function EclipseHero({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: EclipseHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#f3dec0]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <EclipseHeroContent>
            <div className="flex flex-col items-start justify-between gap-12 p-8 md:p-12">
              <span className="font-display text-xl tracking-[.25em]">
                {copy.brand ?? "UMBRA"}
              </span>
              <div>
                <p className="mb-5 text-xs uppercase tracking-widest text-[#d0a367]">
                  {copy.eyebrow ?? "An encounter with the unseen"}
                </p>
                <EclipseHeroTitle>
                  {title ?? (
                    <>
                      Beyond
                      <br />
                      the visible.
                    </>
                  )}
                </EclipseHeroTitle>
                <p className="my-7 max-w-xs text-sm leading-relaxed text-white/55">
                  {description ?? (
                    <>
                      Art, science, and a little uncertainty. A new way of
                      looking at the world.
                    </>
                  )}
                </p>
                <HeroLink href={href}>
                  {actionLabel ?? <>Enter the exhibition</>}
                </HeroLink>
              </div>
              <span className="text-xs text-white/40">
                {copy.footerNote ?? "A digital exhibition · Open to everyone"}
              </span>
            </div>
            <HeroArt
              options={{
                ...artwork,
                label: copy.artworkLabel ?? artwork?.label,
                playLabel: copy.playLabel ?? artwork?.playLabel,
                pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
              }}
              kind="eclipse"
              className="min-h-[350px] md:min-h-[580px]"
            />
          </EclipseHeroContent>
        </>
      )}
    </section>
  );
}

export function EclipseHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="eclipse-hero-content"
      className={cn("grid gap-0 md:grid-cols-[1fr_1.3fr]", className)}
      {...props}
    />
  );
}
export function EclipseHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="eclipse-hero-title"
      className={cn(
        "font-display text-5xl leading-none tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
