"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const SilkHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive silk artwork",
  brand: "Atelier No. 9",
  meta: "Independent design practice",
  eyebrow: "NOTHING EXTRA. EVERYTHING CONSIDERED.",
};
export type SilkHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "artwork" | "className" | "href"
>;
export type SilkHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof SilkHeroOptions
> &
  SilkHeroOptions;
export function SilkHero({
  copy = {},
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: SilkHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#e4eadf]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <SilkHeroHeader>
            <span className="font-serif text-2xl italic">
              {copy.brand ?? "Atelier No. 9"}
            </span>
            <span className="text-xs text-white/50">
              {copy.meta ?? "Independent design practice"}
            </span>
          </SilkHeroHeader>
          <SilkHeroContent>
            <HeroArt
              options={{
                ...artwork,
                label: copy.artworkLabel ?? artwork?.label,
                playLabel: copy.playLabel ?? artwork?.playLabel,
                pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
              }}
              kind="silk"
              className="h-[460px]"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="mb-7 text-xs tracking-[.35em]">
                {copy.eyebrow ?? "NOTHING EXTRA. EVERYTHING CONSIDERED."}
              </p>
              <SilkHeroTitle>
                {title ?? (
                  <>
                    Quietly
                    <br />
                    <em>extraordinary.</em>
                  </>
                )}
              </SilkHeroTitle>
            </div>
          </SilkHeroContent>
          <div className="flex justify-center border-t border-white/15 py-6">
            <HeroLink href={href}>
              {actionLabel ?? <>Selected work, 2026</>}
            </HeroLink>
          </div>
        </>
      )}
    </section>
  );
}

export function SilkHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="silk-hero-header"
      className={cn("flex items-center justify-between p-7", className)}
      {...props}
    />
  );
}
export function SilkHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="silk-hero-content"
      className={cn("relative", className)}
      {...props}
    />
  );
}
export function SilkHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="silk-hero-title"
      className={cn(
        "font-serif text-[clamp(2rem,8vw,6rem)] leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
