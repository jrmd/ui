"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const LiquidHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive liquid artwork",
  brand: "Tide®",
  eyebrow: "Ideas in motion",
};
export function LiquidHero({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#1c2945] text-[#edf1fb]",
        className,
      )}
    >
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col items-start justify-between gap-10 p-8 md:p-12">
          <span className="font-display text-xl">{copy.brand ?? "Tide®"}</span>
          <div>
            <p className="mb-5 text-xs uppercase tracking-widest text-[#a8bade]">
              {copy.eyebrow ?? "Ideas in motion"}
            </p>
            <h1 className="font-display text-6xl leading-[.95] tracking-tight md:text-7xl">
              {title ?? (
                <>
                  Stay
                  <br />
                  in your
                  <br />
                  <em className="font-serif font-normal">flow.</em>
                </>
              )}
            </h1>
            <p className="my-7 max-w-xs text-sm leading-relaxed text-[#bac8e4]">
              {description ?? (
                <>
                  A quiet current for a busy mind. Your space to think, collect,
                  and begin again.
                </>
              )}
            </p>
            <HeroLink href={href}>
              {actionLabel ?? <>Find your rhythm</>}
            </HeroLink>
          </div>
        </div>
        <HeroArt
          options={{
            ...artwork,
            label: copy.artworkLabel ?? artwork?.label,
            playLabel: copy.playLabel ?? artwork?.playLabel,
            pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
          }}
          kind="liquid"
          color="#98bccc"
          className="min-h-80 md:min-h-[570px]"
        />
      </div>
    </section>
  );
}
