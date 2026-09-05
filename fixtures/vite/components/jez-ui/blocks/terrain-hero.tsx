"use client";
import * as React from "react";
import { ArrowUpRight, Pause, Play, Mountain } from "lucide-react";
import { cn } from "../ui/utils";
import { WebGLTerrain } from "../ui/webgl-terrain";
export function TerrainHero({
  className,
  href = "/blocks",
}: {
  className?: string;
  href?: string;
}) {
  const [paused, setPaused] = React.useState(false);
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#14221e] text-[#f0f1e6]",
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-between px-7 pt-7 text-xs md:px-12">
        <span className="flex items-center gap-2 font-medium tracking-widest">
          <Mountain size={19} />
          FIELD / 01
        </span>
        <span className="text-[#b7c7b8]">A study in elevation</span>
      </div>
      <div className="relative z-10 grid gap-7 px-7 pt-12 md:grid-cols-[1.3fr_1fr] md:items-end md:px-12 md:pt-16">
        <h1 className="font-display text-5xl leading-none tracking-tight md:text-7xl">
          Find your
          <br />
          <span className="text-[#c8dd9f]">higher ground.</span>
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-[#bdcdbf] md:justify-self-end">
          New perspectives are rarely found on familiar paths. Follow the
          contours. See where they take you.
        </p>
      </div>
      <WebGLTerrain
        color="#91b47b"
        paused={paused}
        speed={0.4}
        className="-mt-3 h-[310px] rounded-none md:-mt-8 md:h-[400px]"
        label="An animated landscape of rolling green terrain"
      />
      <div className="relative z-10 mx-7 flex items-center justify-between gap-4 border-t border-white/20 py-6 md:mx-12">
        <a
          href={href}
          className="flex items-center gap-3 text-sm font-medium hover:text-[#c8dd9f]"
        >
          Explore the collection
          <ArrowUpRight size={17} />
        </a>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((v) => !v)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#bdcdbf] hover:bg-white/10"
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
          {paused ? "Play" : "Pause"} terrain
        </button>
      </div>
    </section>
  );
}
