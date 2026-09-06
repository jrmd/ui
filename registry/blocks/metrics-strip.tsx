"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type MetricsStripOptions = {
  items?: { label: string; value: string }[];
  className?: string;
};
export type MetricsStripProps = Omit<
  React.ComponentProps<"dl">,
  keyof MetricsStripOptions
> &
  MetricsStripOptions;
function useMetricsStripModel({
  items = [
    { label: "Projects in this demo", value: "12" },
    { label: "Open tasks", value: "38" },
    { label: "Teammates", value: "6" },
  ],
  className,
  children,
  ...rootProps
}: MetricsStripProps) {
  return { items, className, children, rootProps };
}
const MetricsStripCompositionContext = React.createContext<ReturnType<
  typeof useMetricsStripModel
> | null>(null);
function useMetricsStripComposition() {
  const context = React.useContext(MetricsStripCompositionContext);
  if (!context)
    throw new Error("MetricsStrip parts must be inside MetricsStrip.");
  return context;
}
export function MetricsStrip(props: MetricsStripProps) {
  const model = useMetricsStripModel(props);
  const { className, rootProps, children } = model;
  return (
    <MetricsStripCompositionContext.Provider value={model}>
      <dl
        {...rootProps}
        className={cn(
          "grid gap-6 border-y border-border py-7 sm:grid-cols-3",
          className,
        )}
      >
        {children !== undefined ? children : <MetricsStripItems />}
      </dl>
    </MetricsStripCompositionContext.Provider>
  );
}

export function MetricsStripItems({ children }: React.PropsWithChildren) {
  const { items } = useMetricsStripComposition();
  return children === undefined
    ? items.map((i) => (
        <MetricsStripItem key={i.label}>
          <MetricsStripLabel>{i.label}</MetricsStripLabel>
          <MetricsStripValue>{i.value}</MetricsStripValue>
        </MetricsStripItem>
      ))
    : children;
}

export function MetricsStripLabel({
  className,
  ...props
}: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="metrics-strip-label"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export function MetricsStripValue({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="metrics-strip-value"
      className={cn("mt-2 font-display text-3xl tabular-nums", className)}
      {...props}
    />
  );
}

export function MetricsStripItem(props: React.ComponentProps<"div">) {
  return <div data-slot="metrics-strip-item" {...props} />;
}
