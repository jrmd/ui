"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const PosterHeroCopy = {
  brand: "ASSEMBLY / A GATHERING OF IDEAS",
  meta: "ONLINE & EVERYWHERE",
  tagline: "Design. Culture.",
  taglineEnd: "Whatever comes next.",
};
export function PosterHero({
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
        "relative isolate overflow-hidden rounded-xl bg-[#dfeb5a] text-[#243022]",
        className,
      )}
    >
      <div className="p-7 md:p-12">
        <div className="flex justify-between text-xs font-medium">
          <span>{copy.brand ?? "ASSEMBLY / A GATHERING OF IDEAS"}</span>
          <span>{copy.meta ?? "ONLINE & EVERYWHERE"}</span>
        </div>
        <div className="my-12 border-y-2 border-[#243022] py-6">
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[.86] tracking-[-.065em]">
            {title ?? (
              <>
                COME WITH
                <br />
                QUESTIONS.
                <br />
                <span className="font-serif font-normal italic tracking-tight">
                  Leave inspired.
                </span>
              </>
            )}
          </h1>
        </div>
        <div className="grid gap-7 md:grid-cols-[1fr_1fr_auto]">
          <p className="text-sm font-medium">
            {copy.tagline ?? "Design. Culture."}
            <br />
            {copy.taglineEnd ?? "Whatever comes next."}
          </p>
          <p className="max-w-xs text-sm leading-relaxed">
            {description ?? (
              <>
                Conversations for curious people. A programme built around
                sharing what we know and asking what we don’t.
              </>
            )}
          </p>
          <div>
            <HeroLink href={href}>
              {actionLabel ?? <>View programme</>}
            </HeroLink>
          </div>
        </div>
      </div>
    </section>
  );
}
