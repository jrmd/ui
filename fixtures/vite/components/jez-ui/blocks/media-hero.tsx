"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export function MediaHero({
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
        "relative isolate overflow-hidden rounded-xl bg-[#e8e2d6] text-[#302f29]",
        className,
      )}
    >
      <div className="grid md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col items-start justify-between gap-12 p-8 md:p-12">
          <span className="font-serif text-2xl">Objects for living.</span>
          <div>
            <p className="mb-5 text-xs tracking-widest">
              THE EVERYDAY COLLECTION
            </p>
            <h1 className="font-serif text-6xl leading-none tracking-tight md:text-7xl">
              {title ?? (
                <>
                  A little
                  <br />
                  more light.
                </>
              )}
            </h1>
            <p className="my-7 max-w-xs text-sm leading-relaxed">
              {description ?? (
                <>
                  Useful things, thoughtfully made. Meet the pieces that make a
                  space feel like yours.
                </>
              )}
            </p>
            <HeroLink href={href}>
              {actionLabel ?? <>Discover the collection</>}
            </HeroLink>
          </div>
          <span className="text-xs">Studio lamp / Sand / No. 004</span>
        </div>
        <img
          src={imageSrc ?? "/assets/studio-lamp-cover.svg"}
          alt={imageAlt ?? "Sculptural studio lamp in a warm interior"}
          className="h-96 w-full object-cover md:h-[620px]"
        />
      </div>
    </section>
  );
}
