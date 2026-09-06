"use client";
import { lazy, Suspense, useState } from "react";
import { ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { Switch } from "../../../registry/ui/switch";
import { Slider } from "../../../registry/ui/slider";
const Ribbons = lazy(() =>
  import("../../../registry/ui/webgl-ribbon-field").then((m) => ({
    default: m.WebGLRibbonField,
  })),
);
export function HomeExhibit() {
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [word, setWord] = useState(0);
  const [checked, setChecked] = useState(true);
  return (
    <>
      <div className="exhibit">
        <div className="exhibit-main">
          <Suspense fallback={<div className="h-[440px]" />}>
            <Ribbons
              composition="orbit"
              paused={paused}
              speed={speed[0]}
              color={checked ? "#d1ed84" : "#b0bced"}
              className="!h-[440px] max-sm:!h-[330px] !rounded-none !bg-[#182022]"
            />
          </Suspense>
          <div className="absolute left-6 right-6 top-5 flex justify-between text-xs text-[#d8e1ce]">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#d9e3cd]" />
              Live playground
            </span>
            <button
              className="rounded-full border border-white/25 p-2"
              aria-label={paused ? "Play scene" : "Pause scene"}
              onClick={() => setPaused((v) => !v)}
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>
          <div className="exhibit-caption">
            <div>
              <h2>A little out of the ordinary.</h2>
              <p>WebGL ribbons · yours to play with</p>
            </div>
            <a
              href="/components/webgl-ribbon-field"
              aria-label="Explore WebGL ribbons"
              className="rounded-full border border-white/25 p-2"
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="exhibit-side">
          <div className="exhibit-type">
            <div className="play-label">
              <span>Words with a little movement.</span>
              <button
                aria-label="Change phrase"
                onClick={() => setWord((w) => (w + 1) % 3)}
              >
                <RotateCcw size={14} />
              </button>
            </div>
            <div key={word} className="play-type">
              {["Oh, hello.", "Looking good.", "Make it pop."][word]}
              <br />
              <span className="opacity-70">
                {["Nice moves.", "Feeling better.", "Keep it clean."][word]}
              </span>
            </div>
            <a
              href="/components?category=motion"
              className="play-label no-underline"
            >
              Explore motion <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="exhibit-control">
            <div className="flex justify-between text-xs">
              <span>Small details. Big difference.</span>
              <ArrowUpRight size={14} />
            </div>
            <div className="demo-switches">
              <Switch
                aria-label="Enable playground accent"
                checked={checked}
                onCheckedChange={setChecked}
                className="data-[state=checked]:!bg-[#575ac8]"
              />
              <Switch
                aria-label="Pause WebGL scene"
                checked={paused}
                onCheckedChange={setPaused}
              />
              <Switch aria-label="Decorative demo option" defaultChecked />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px]">Scene speed</span>
              <Slider
                min={0.2}
                max={2}
                step={0.1}
                value={speed}
                onValueChange={setSpeed}
                label="Scene speed"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="exhibit-bottom">
        <div className="stat-links">
          <a href="/components">91 components ↗</a>
          <a href="/blocks">92 blocks ↗</a>
          <a href="/templates">9 templates ↗</a>
        </div>
        <span>React + Tailwind. Your source. Your next thing.</span>
      </div>
    </>
  );
}
