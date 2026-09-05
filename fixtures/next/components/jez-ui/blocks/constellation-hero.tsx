"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export function ConstellationHero({
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
        "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#e0eee6]",
        className,
      )}
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="p-8 md:p-12">
          <p className="text-xs tracking-widest text-[#91b6a4]">COMMON ORBIT</p>
          <h1 className="mt-16 font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            {title ?? (
              <>
                Better things
                <br />
                happen
                <br />
                <span className="text-[#91b6a4]">between us.</span>
              </>
            )}
          </h1>
          <p className="my-7 max-w-xs text-sm leading-relaxed text-white/60">
            {description ?? (
              <>
                A home for independent minds. Connect your ideas to people who
                see what you see.
              </>
            )}
          </p>
          <HeroLink href={href}>
            {actionLabel ?? <>Find your people</>}
          </HeroLink>
        </div>
        <div>
          <HeroArt
            options={artwork}
            kind="constellation"
            className="h-80 md:h-[470px]"
          />
          <p className="border-t border-white/15 p-6 text-xs text-white/50">
            Different disciplines. Shared curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}
