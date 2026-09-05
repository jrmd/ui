"use client";
import * as React from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { WebGLRibbonField } from "../ui/webgl-ribbon-field";
export const WebglHeroCopy = {
  playLabel: "Play",
  pauseLabel: "Pause",
  animationName: "scene",
};
export type WebglHeroOptions = Pick<
  HeroProps,
  | "title"
  | "description"
  | "actionLabel"
  | "copy"
  | "artwork"
  | "className"
  | "href"
>;
export type WebglHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof WebglHeroOptions
> &
  WebglHeroOptions;
export function WebglHero({
  title,
  description,
  actionLabel,
  copy = {},
  artwork,
  className,
  href = "#work",
  children,
  ...rootProps
}: WebglHeroProps) {
  const [paused, setPaused] = React.useState(false);
  return (
    <section
      {...rootProps}
      className={cn(
        "overflow-hidden rounded-xl bg-[#10151d] text-[#f0f4f8]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <WebglHeroContent>
            <WebglHeroTitle>
              {title ?? (
                <>
                  Form follows
                  <br />
                  <span className="text-[#9fb6d0]">curiosity.</span>
                </>
              )}
            </WebglHeroTitle>
            <p className="max-w-xs text-sm leading-relaxed text-[#b9c5d3] md:justify-self-end">
              {description ?? (
                <>
                  An exploration of light, material, and movement. Move through
                  the field and watch it respond.
                </>
              )}
            </p>
          </WebglHeroContent>
          <WebGLRibbonField
            color={artwork?.color}
            speed={artwork?.speed}
            paused={paused}
            className="h-[280px] rounded-none md:h-[360px]"
            label={
              copy.artworkLabel ??
              "Seven flowing ribbons responding to your pointer"
            }
          />
          <WebglHeroHeader>
            <a
              href={href}
              className="flex items-center gap-2 text-sm hover:text-[#9fb6d0]"
            >
              {actionLabel ?? "Explore the work"} <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((v) => !v)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-[#b9c5d3] hover:bg-white/10"
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
              {paused
                ? (copy.playLabel ?? "Play")
                : (copy.pauseLabel ?? "Pause")}{" "}
              {copy.animationName ?? "scene"}
            </button>
          </WebglHeroHeader>
        </>
      )}
    </section>
  );
}

export function WebglHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="webgl-hero-content"
      className={cn(
        "grid gap-7 px-7 pt-10 md:grid-cols-[1.2fr_1fr] md:items-end md:px-12 md:pt-14",
        className,
      )}
      {...props}
    />
  );
}
export function WebglHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="webgl-hero-title"
      className={cn("max-w-xl text-5xl leading-[1.03] md:text-7xl", className)}
      {...props}
    />
  );
}
export function WebglHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="webgl-hero-header"
      className={cn(
        "mx-7 flex items-center justify-between gap-4 border-t border-white/15 py-6 md:mx-12",
        className,
      )}
      {...props}
    />
  );
}
