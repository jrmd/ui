"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export function SilkHero({
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#e4eadf]",
        className,
      )}
    >
      <div className="flex items-center justify-between p-7">
        <span className="font-serif text-2xl italic">Atelier No. 9</span>
        <span className="text-xs text-white/50">
          Independent design practice
        </span>
      </div>
      <div className="relative">
        <HeroArt options={artwork} kind="silk" className="h-[460px]" />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-7 text-xs tracking-[.35em]">
            NOTHING EXTRA. EVERYTHING CONSIDERED.
          </p>
          <h1 className="font-serif text-[clamp(2rem,8vw,6rem)] leading-none tracking-tight">
            {title ?? (
              <>
                Quietly
                <br />
                <em>extraordinary.</em>
              </>
            )}
          </h1>
        </div>
      </div>
      <div className="flex justify-center border-t border-white/15 py-6">
        <HeroLink href={href}>
          {actionLabel ?? <>Selected work, 2026</>}
        </HeroLink>
      </div>
    </section>
  );
}
