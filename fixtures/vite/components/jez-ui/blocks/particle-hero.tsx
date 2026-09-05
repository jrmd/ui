"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export function ParticleHero({
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
        "relative isolate overflow-hidden rounded-xl bg-[#10101c] text-[#efedf7]",
        className,
      )}
    >
      <div className="relative z-10 px-7 pt-9 text-center">
        <p className="text-xs tracking-[.3em] text-[#b9a4f8]">
          ATLAS / COLLECTIVE INTELLIGENCE
        </p>
        <h1 className="mx-auto mt-8 max-w-2xl font-display text-5xl leading-[.95] tracking-tight md:text-7xl">
          {title ?? (
            <>
              A million signals.
              <br />
              One new perspective.
            </>
          )}
        </h1>
      </div>
      <HeroArt
        options={artwork}
        kind="particles"
        className="-mt-6 h-80 md:h-96"
      />
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/15 p-7">
        <p className="max-w-sm text-sm text-white/60">
          {description ?? (
            <>
              Find the patterns hiding in plain sight. Make space for the next
              discovery.
            </>
          )}
        </p>
        <HeroLink href={href}>{actionLabel ?? <>Start exploring</>}</HeroLink>
      </div>
    </section>
  );
}
