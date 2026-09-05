"use client";
import * as React from "react";
import { cn } from "./utils";
import { Button } from "./button";
import { useControllable } from "./use-controllable";
export function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function Calendar({
  value,
  defaultValue = "",
  onValueChange,
  className,
  min,
  max,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  min?: string;
  max?: string;
}) {
  const [selected, setSelected] = useControllable(
    value,
    defaultValue,
    onValueChange,
  );
  const [month, setMonth] = React.useState(() =>
    selected ? new Date(selected + "T12:00:00") : new Date(),
  );
  const y = month.getFullYear(),
    m = month.getMonth(),
    days = new Date(y, m + 1, 0).getDate(),
    offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className={cn("w-72 max-w-full rounded-xl border border-border p-4", className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          aria-label="Previous month"
          onClick={() => setMonth(new Date(y, m - 1, 1))}
        >
          ←
        </Button>
        <span aria-live="polite" className="text-sm font-medium">
          {month.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Button
          variant="ghost"
          aria-label="Next month"
          onClick={() => setMonth(new Date(y, m + 1, 1))}
        >
          →
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="py-1 text-center text-xs text-muted-foreground"
          >
            {d}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={"s" + i} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const key = dateKey(new Date(y, m, i + 1));
          return (
            <button
              key={key}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-label={new Date(y, m, i + 1).toLocaleDateString("en-GB", {
                dateStyle: "full",
              })}
              aria-pressed={selected === key}
              disabled={!!((min && key < min) || (max && key > max))}
              onClick={() => setSelected(key)}
              onKeyDown={(e) => {
                const delta = (
                  {
                    ArrowLeft: -1,
                    ArrowRight: 1,
                    ArrowUp: -7,
                    ArrowDown: 7,
                  } as Record<string, number>
                )[e.key];
                if (delta) {
                  e.preventDefault();
                  refs.current[
                    Math.min(days - 1, Math.max(0, i + delta))
                  ]?.focus();
                }
              }}
              className={cn(
                "size-8 max-w-full rounded-lg text-sm hover:bg-muted disabled:opacity-30",
                selected === key && "bg-primary text-primary-foreground",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
