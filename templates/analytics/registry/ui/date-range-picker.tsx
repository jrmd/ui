"use client";
import * as React from "react";
import { cn } from "./utils";
import { Input } from "./input";
import { useControllable } from "./use-controllable";
export type DateRange = { from: string; to: string };
export function DateRangePicker({
  children,
  value,
  defaultValue = { from: "", to: "" },
  onValueChange,
  className,
  label = "Date range",
  fromLabel = "From",
  toLabel = "To",
  ...rootProps
}: Omit<
  React.ComponentProps<"fieldset">,
  keyof {
    value?: DateRange;
    defaultValue?: DateRange;
    onValueChange?: (range: DateRange) => void;
    className?: string;
    label?: string;
    fromLabel?: string;
    toLabel?: string;
  }
> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  className?: string;
  label?: string;
  fromLabel?: string;
  toLabel?: string;
}) {
  const [range, setRange] = useControllable(value, defaultValue, onValueChange);
  return (
    <fieldset {...rootProps} className={cn("flex flex-wrap gap-3", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <legend className="mb-2 text-sm font-medium">{label}</legend>
          <label className="grid gap-1 text-xs">
            {fromLabel}
            <Input
              type="date"
              value={range.from}
              max={range.to || undefined}
              onChange={(e) => setRange({ ...range, from: e.target.value })}
            />
          </label>
          <label className="grid gap-1 text-xs">
            {toLabel}
            <Input
              type="date"
              value={range.to}
              min={range.from || undefined}
              onChange={(e) => setRange({ ...range, to: e.target.value })}
            />
          </label>
        </>
      )}
    </fieldset>
  );
}
