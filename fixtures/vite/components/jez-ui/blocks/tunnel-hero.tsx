"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export function TunnelHero({
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#dce6f7]",
        className,
      )}
    >
      <div className="relative">
        <HeroArt options={artwork} kind="tunnel" className="h-[590px]" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 md:p-10">
          <div className="flex justify-between text-xs tracking-widest">
            <span>AFTERHOURS</span>
            <span>SOUND / SPACE / POSSIBILITY</span>
          </div>
          <div className="text-center">
            <p className="mb-4 text-xs uppercase tracking-[.4em]">
              Leave the ordinary behind
            </p>
            <h1 className="font-display text-6xl font-semibold leading-none tracking-tighter md:text-8xl">
              {title ?? <>GO DEEPER.</>}
            </h1>
            <div className="pointer-events-auto mt-8">
              <HeroLink
                href={href}
                className="bg-[#030405]/70 backdrop-blur-sm"
              >
                {actionLabel ?? <>Explore the programme</>}
              </HeroLink>
            </div>
          </div>
          <span className="text-xs text-white/50">
            An independent music &amp; culture platform
          </span>
        </div>
      </div>
    </section>
  );
}
