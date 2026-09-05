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
export function WebglHero({
  title,
  description,
  actionLabel,
  copy = {},
  artwork,
  className,
  href = "#work",
}: HeroProps) {
  const [paused, setPaused] = React.useState(false);
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl bg-[#10151d] text-[#f0f4f8]",
        className,
      )}
    >
      <div className="grid gap-7 px-7 pt-10 md:grid-cols-[1.2fr_1fr] md:items-end md:px-12 md:pt-14">
        <h1 className="max-w-xl text-5xl leading-[1.03] md:text-7xl">
          {title ?? (
            <>
              Form follows
              <br />
              <span className="text-[#9fb6d0]">curiosity.</span>
            </>
          )}
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-[#b9c5d3] md:justify-self-end">
          {description ?? (
            <>
              An exploration of light, material, and movement. Move through the
              field and watch it respond.
            </>
          )}
        </p>
      </div>
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
      <div className="mx-7 flex items-center justify-between gap-4 border-t border-white/15 py-6 md:mx-12">
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
      </div>
    </section>
  );
}
