"use client";
import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "../ui/utils";
import { WebGLStage } from "../ui/webgl-stage";
import type { SceneKind } from "../ui/webgl-scenes";
export function HeroArt({
  options,
  kind,
  color,
  className,
}: {
  options?: { color?: string; speed?: number };
  kind: SceneKind;
  color?: string;
  className?: string;
}) {
  const [paused, setPaused] = React.useState(false);
  return (
    <div className={cn("relative min-h-72", className)}>
      <WebGLStage
        kind={kind}
        color={options?.color ?? color}
        paused={paused}
        speed={options?.speed ?? 0.45}
        className="absolute inset-0 h-full rounded-none"
        label={`Interactive ${kind} artwork`}
      />
      <button
        type="button"
        aria-label={paused ? "Play artwork" : "Pause artwork"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
        className="absolute bottom-4 right-4 z-20 grid size-10 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-sm hover:bg-black/60"
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </div>
  );
}
