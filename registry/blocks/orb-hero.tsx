"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export function OrbHero({
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#241c2b] text-[#f4e9e0]",
        className,
      )}
    >
      <div className="flex items-center justify-between p-7 text-xs">
        <span className="tracking-widest">SOMA / OBJECTS OF POSSIBILITY</span>
        <span>01—03</span>
      </div>
      <div className="relative">
        <HeroArt
          options={artwork}
          kind="orb"
          color="#dfaa84"
          className="h-[400px] md:ml-[25%] md:h-[510px]"
        />
        <div className="pointer-events-none relative z-10 -mt-36 px-7 pb-8 md:absolute md:inset-y-0 md:left-0 md:mt-0 md:flex md:w-1/2 md:flex-col md:justify-center md:px-12">
          <h1 className="font-display text-5xl leading-none tracking-tight md:text-7xl">
            {title ?? (
              <>
                Some things
                <br />
                just <em className="font-serif font-normal">feel</em>
                <br />
                different.
              </>
            )}
          </h1>
          <div className="pointer-events-auto mt-7">
            <HeroLink href={href}>
              {actionLabel ?? <>Meet the collection</>}
            </HeroLink>
          </div>
        </div>
      </div>
    </section>
  );
}
