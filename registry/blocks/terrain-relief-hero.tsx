"use client";
import * as React from "react";
import { ArrowUpRight, Pause, Play, Mountain } from "lucide-react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { WebGLStage } from "../ui/webgl-stage";
export const TerrainReliefHeroCopy = {
  brand: "FIELD / 01",
  meta: "A study in elevation",
  playLabel: "Play",
  pauseLabel: "Pause",
  animationName: "terrain",
};
export type TerrainReliefHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof Pick<
    HeroProps,
    | "title"
    | "description"
    | "actionLabel"
    | "copy"
    | "artwork"
    | "className"
    | "href"
  >
> &
  Pick<
    HeroProps,
    | "title"
    | "description"
    | "actionLabel"
    | "copy"
    | "artwork"
    | "className"
    | "href"
  >;
export function TerrainReliefHero({
  title,
  description,
  actionLabel,
  copy = {},
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: TerrainReliefHeroProps) {
  const [paused, setPaused] = React.useState(false);
  return (
    <section
      {...rootProps}
      className={cn(
        "@container relative isolate overflow-hidden rounded-xl bg-[#14221e] text-[#f0f1e6]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <TerrainReliefHeroHeader>
            <span className="flex items-center gap-2 font-medium tracking-widest">
              <Mountain size={19} />
              {copy.brand ?? "FIELD / 01"}
            </span>
            <span className="text-[#b7c7b8]">
              {copy.meta ?? "A study in elevation"}
            </span>
          </TerrainReliefHeroHeader>
          <TerrainReliefHeroContent>
            <TerrainReliefHeroTitle>
              {title ?? (
                <>
                  Find your
                  <br />
                  <span className="text-[#c8dd9f]">higher ground.</span>
                </>
              )}
            </TerrainReliefHeroTitle>
            <p className="max-w-xs text-sm leading-relaxed text-[#bdcdbf] @min-[640px]:justify-self-end">
              {description ?? (
                <>
                  New perspectives are rarely found on familiar paths. Follow
                  the contours. See where they take you.
                </>
              )}
            </p>
          </TerrainReliefHeroContent>
          <WebGLStage
            kind="terrain-relief"
            color={artwork?.color ?? "#91b47b"}
            speed={artwork?.speed ?? 0.4}
            paused={paused}
            className="-mt-8 h-[300px] rounded-none [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_88%,transparent)] @min-[640px]:h-[360px]"
            label={
              copy.artworkLabel ??
              "An expansive three-dimensional landscape with illuminated contour lines"
            }
          />
          <div className="relative z-10 mx-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 py-5 @min-[640px]:mx-10">
            <a
              href={href}
              className="flex min-h-11 items-center gap-3 text-sm font-medium hover:text-[#c8dd9f]"
            >
              {actionLabel ?? "Explore the collection"}
              <ArrowUpRight size={17} />
            </a>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((v) => !v)}
              className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#bdcdbf] hover:bg-white/10"
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
              {paused
                ? (copy.playLabel ?? "Play")
                : (copy.pauseLabel ?? "Pause")}{" "}
              {copy.animationName ?? "terrain"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export function TerrainReliefHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terrain-relief-hero-header"
      className={cn(
        "relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 pt-6 text-xs @min-[640px]:px-10",
        className,
      )}
      {...props}
    />
  );
}
export function TerrainReliefHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terrain-relief-hero-content"
      className={cn(
        "relative z-10 grid gap-6 px-6 pt-10 @min-[640px]:grid-cols-[1.65fr_1fr] @min-[640px]:items-end @min-[640px]:px-10 @min-[640px]:pt-14",
        className,
      )}
      {...props}
    />
  );
}
export function TerrainReliefHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="terrain-relief-hero-title"
      className={cn(
        "font-display text-[clamp(2.5rem,6.5cqi,5rem)] leading-[1.02] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
