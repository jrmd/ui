"use client";
import * as React from "react";
import { cn } from "./utils";
import { useReducedMotion } from "motion/react";
export function CursorTrail({
  children,
  className,
  color,
  duration = 650,
}: {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}) {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const points = React.useRef<{ x: number; y: number; time: number }[]>([]);
  const frame = React.useRef(0);
  const draw = React.useRef<() => void>(() => {});
  const reduce = useReducedMotion();
  React.useEffect(() => {
    const surface = canvas.current;
    if (!surface || reduce) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0;
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = width * dpr;
      surface.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    resize.observe(surface);
    draw.current = () => {
      const now = performance.now(),
        life = Math.max(100, duration);
      points.current = points.current.filter((p) => now - p.time < life);
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle =
        color ||
        getComputedStyle(surface).getPropertyValue("--primary").trim() ||
        "#343be8";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const trail = points.current;
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1],
          b = trail[i],
          next = trail[Math.min(i + 1, trail.length - 1)];
        const freshness = Math.max(0, 1 - (now - b.time) / life);
        ctx.globalAlpha = freshness * 0.8;
        ctx.lineWidth = 1 + freshness * (i / trail.length) * 12;
        ctx.beginPath();
        ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.quadraticCurveTo(b.x, b.y, (b.x + next.x) / 2, (b.y + next.y) / 2);
        ctx.stroke();
      }
      frame.current = trail.length ? requestAnimationFrame(draw.current) : 0;
    };
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      points.current = [];
      ctx.clearRect(0, 0, width, height);
    };
  }, [color, duration, reduce]);
  return (
    <div
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        points.current.push({
          x: e.clientX - r.left,
          y: e.clientY - r.top,
          time: performance.now(),
        });
        if (points.current.length > 80) points.current.shift();
        if (!frame.current) frame.current = requestAnimationFrame(draw.current);
      }}
      className={cn(
        "relative min-h-64 overflow-hidden rounded-xl bg-muted p-8",
        className,
      )}
    >
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
