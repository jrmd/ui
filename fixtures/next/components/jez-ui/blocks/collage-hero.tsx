"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export function CollageHero({
  title,
  actionLabel,
  imageSrc,
  imageAlt,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#e8d4c3] text-[#412f25]",
        className,
      )}
    >
      <div className="p-7 md:p-10">
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl italic">In good company</span>
          <span className="text-xs">OBJECTS / STORIES / PEOPLE</span>
        </div>
        <div className="grid items-center gap-6 py-12 md:grid-cols-[.7fr_1.2fr_.7fr]">
          <img
            src={imageSrc ?? "/assets/studio-lamp-cover.svg"}
            alt={imageAlt ?? "A considered object for the home"}
            className="mx-auto hidden aspect-[3/4] w-full -rotate-6 object-cover md:block"
          />
          <div className="relative z-10 text-center">
            <p className="mb-5 text-xs uppercase tracking-widest">
              Room for the everyday
            </p>
            <h1 className="font-serif text-6xl leading-none tracking-tight md:text-7xl">
              {title ?? (
                <>
                  Life, with
                  <br />
                  <em>
                    a little
                    <br />
                    character.
                  </em>
                </>
              )}
            </h1>
            <div className="mt-7">
              <HeroLink href={href}>{actionLabel ?? <>Come on in</>}</HeroLink>
            </div>
          </div>
          <img
            src="/assets/editorial-question.svg"
            alt="A colourful study of shapes and balance"
            className="mx-auto aspect-[4/3] w-3/4 rotate-6 object-cover md:aspect-[3/4] md:w-full"
          />
        </div>
        <p className="border-t border-[#412f25]/20 pt-6 text-center text-xs">
          A collection of things worth keeping close.
        </p>
      </div>
    </section>
  );
}
