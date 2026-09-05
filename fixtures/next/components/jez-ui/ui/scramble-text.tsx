"use client";
import * as React from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "./utils";
export function ScrambleText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [text, setText] = React.useState(children);
  const reduce = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);
  React.useEffect(() => {
    setText(children);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [children, reduce]);
  function run() {
    if (reduce) return;
    if (timer.current) clearInterval(timer.current);
    let step = 0;
    timer.current = setInterval(() => {
      step++;
      setText(
        Array.from(children)
          .map((c, i) =>
            i < step / 2 || /\s/.test(c)
              ? c
              : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)],
          )
          .join(""),
      );
      if (step >= children.length * 2 && timer.current)
        clearInterval(timer.current);
    }, 28);
  }
  let offset = 0;
  return (
    <span
      tabIndex={0}
      aria-label={children}
      onPointerEnter={run}
      onFocus={run}
      className={cn("inline-block", className)}
    >
      {children.split(/(\s+)/).map((word, w) => {
        const start = offset;
        offset += word.length;
        return /\s/.test(word) ? (
          <React.Fragment key={w}>{word}</React.Fragment>
        ) : (
          <span
            key={w}
            className="inline-flex whitespace-nowrap"
            aria-hidden="true"
          >
            {Array.from(word).map((char, i) => (
              <span key={i} className="relative inline-block">
                <span className="invisible">{char}</span>
                <span className="absolute inset-0 text-center">
                  {text[start + i] ?? char}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
