"use client";
import * as React from "react";
import { cn } from "./utils";
import { Input } from "./input";
import { useControllable } from "./use-controllable";
export type DateRange = { from: string; to: string };
export function DateRangePicker({
  value,
  defaultValue = { from: "", to: "" },
  onValueChange,
  className,
}: {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  className?: string;
}) {
  const [range, setRange] = useControllable(value, defaultValue, onValueChange);
  return (
    <fieldset className={cn("flex flex-wrap gap-3", className)}>
      <legend className="mb-2 text-sm font-medium">Date range</legend>
      <label className="grid gap-1 text-xs">
        From
        <Input
          type="date"
          value={range.from}
          max={range.to || undefined}
          onChange={(e) => setRange({ ...range, from: e.target.value })}
        />
      </label>
      <label className="grid gap-1 text-xs">
        To
        <Input
          type="date"
          value={range.to}
          min={range.from || undefined}
          onChange={(e) => setRange({ ...range, to: e.target.value })}
        />
      </label>
    </fieldset>
  );
}
