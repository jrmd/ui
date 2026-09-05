"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export function JournalHero({
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
        "relative isolate overflow-hidden rounded-xl bg-[#f6f0e7] text-[#43372d]",
        className,
      )}
    >
      <div className="flex items-end justify-between border-b border-[#43372d]/25 p-7">
        <span className="font-serif text-4xl">Still.</span>
        <span className="text-xs">A journal for paying attention</span>
      </div>
      <div className="grid gap-8 p-7 md:grid-cols-[1fr_1.2fr] md:p-10">
        <div className="flex flex-col items-start justify-between gap-8">
          <p className="text-xs uppercase tracking-widest">
            From the editor / Issue 04
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            {title ?? (
              <>
                The art of
                <br />
                <em>noticing.</em>
              </>
            )}
          </h1>
          <p className="max-w-xs text-sm leading-relaxed">
            {description ?? (
              <>
                On small observations, everyday objects, and the things we miss
                when we move too quickly.
              </>
            )}
          </p>
          <HeroLink href={href}>
            {actionLabel ?? <>Read the latest issue</>}
          </HeroLink>
        </div>
        <figure>
          <img
            src={imageSrc ?? "/assets/editorial-slow.svg"}
            alt={imageAlt ?? "Abstract editorial study in warm geometric forms"}
            className="aspect-[4/5] w-full object-cover"
          />
          <figcaption className="mt-3 text-xs text-[#43372d]/65">
            A slower internet. A wider view.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
