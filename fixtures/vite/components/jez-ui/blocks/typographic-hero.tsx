"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const TypographicHeroCopy = {
  brand: "OTHER® — DESIGN & DIRECTION",
  meta: "OPEN TO GOOD PROBLEMS",
};
export function TypographicHero({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#ef582f] text-[#231d18]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-black/20 p-7 text-xs font-medium">
        <span>{copy.brand ?? "OTHER® — DESIGN & DIRECTION"}</span>
        <span>{copy.meta ?? "OPEN TO GOOD PROBLEMS"}</span>
      </div>
      <div className="p-7 md:p-12">
        <h1 className="font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-[.82] tracking-[-.075em]">
          {title ?? (
            <>
              GOOD
              <br />
              <span className="block text-right">WEIRD.</span>
              <span className="block">WORK.</span>
            </>
          )}
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-7">
          <p className="max-w-xs text-sm leading-relaxed">
            {description ?? (
              <>
                For people with something to say. We turn a point of view into a
                world you can step inside.
              </>
            )}
          </p>
          <HeroLink href={href}>
            {actionLabel ?? <>Take a look around</>}
          </HeroLink>
        </div>
      </div>
    </section>
  );
}
