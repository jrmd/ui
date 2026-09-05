"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const StudioHeroCopy = {
  brand: "FIELDWORK / BRAND & DIGITAL",
  meta: "INDEPENDENT BY DESIGN",
  caption: "Featured project — Fieldwork",
};
export function StudioHero({
  copy = {},
  title,
  actionLabel,
  description,
  imageSrc,
  imageAlt,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#22251f] text-[#ebe9dc]",
        className,
      )}
    >
      <div className="flex justify-between p-7 text-xs tracking-widest">
        <span>{copy.brand ?? "FIELDWORK / BRAND & DIGITAL"}</span>
        <span>{copy.meta ?? "INDEPENDENT BY DESIGN"}</span>
      </div>
      <h1 className="px-7 pt-9 font-display text-5xl leading-none tracking-tight md:px-12 md:text-7xl">
        {title ?? (
          <>
            Rooted in strategy.
            <br />
            <span className="font-serif italic text-[#c8d3b6]">
              Made to feel something.
            </span>
          </>
        )}
      </h1>
      <div className="grid gap-8 p-7 md:grid-cols-[1.5fr_1fr] md:p-12">
        <img
          src={imageSrc ?? "/assets/fieldwork.svg"}
          alt={imageAlt ?? "Fieldwork identity study"}
          className="aspect-[16/10] w-full rounded-sm object-cover"
        />
        <div className="flex flex-col items-start justify-end gap-7">
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            {description ?? (
              <>
                We build identities and digital experiences for organisations
                moving the world in a better direction.
              </>
            )}
          </p>
          <HeroLink href={href}>
            {actionLabel ?? <>Explore our practice</>}
          </HeroLink>
          <span className="text-xs text-white/40">
            {copy.caption ?? "Featured project — Fieldwork"}
          </span>
        </div>
      </div>
    </section>
  );
}
