"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export function DistortionHero({
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
        "relative isolate overflow-hidden rounded-xl bg-[#d7dfcf] text-[#28352d]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[#28352d]/20 p-7 text-xs">
        <span>FORM / EXPERIMENTAL DESIGN OFFICE</span>
        <span>EST. 2026</span>
      </div>
      <HeroArt options={artwork} kind="distortion" className="h-72 md:h-96" />
      <div className="grid gap-6 border-t border-[#28352d]/20 p-8 md:grid-cols-2">
        <h1 className="font-display text-4xl leading-tight tracking-tight">
          {title ?? (
            <>
              Nothing good
              <br />
              stands still.
            </>
          )}
        </h1>
        <div className="flex flex-col items-start gap-5">
          <p className="max-w-sm text-sm leading-relaxed">
            {description ?? (
              <>
                Identities that move. Experiences that respond. A practice built
                around the possibilities of the screen.
              </>
            )}
          </p>
          <HeroLink href={href}>
            {actionLabel ?? <>See what moves us</>}
          </HeroLink>
        </div>
      </div>
    </section>
  );
}
