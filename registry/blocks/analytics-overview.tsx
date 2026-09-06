"use client";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
import { AreaChart } from "../ui/area-chart";
import { DonutChart } from "../ui/donut-chart";
export type AnalyticsOverviewOptions = {
  className?: string;
  metrics?: typeof AnalyticsOverviewDefaultMetrics;
};
export type AnalyticsOverviewProps = Omit<
  React.ComponentProps<"section">,
  keyof AnalyticsOverviewOptions
> &
  AnalyticsOverviewOptions;
const AnalyticsOverviewDefaultMetrics = [
  {
    label: "Revenue",
    value: "£24,860",
    change: "12.8%",
    note: "vs. previous month",
  },
  {
    label: "Sessions",
    value: "18,204",
    change: "8.2%",
    note: "vs. previous month",
  },
  {
    label: "Conversion",
    value: "3.8%",
    change: "0.6 pts",
    note: "vs. previous month",
  },
];
function useAnalyticsOverviewModel({
  metrics = AnalyticsOverviewDefaultMetrics,
  className,
  children,
  ...rootProps
}: AnalyticsOverviewProps) {
  return { metrics, className, children, rootProps };
}
const AnalyticsOverviewCompositionContext = React.createContext<ReturnType<
  typeof useAnalyticsOverviewModel
> | null>(null);
function useAnalyticsOverviewComposition() {
  const context = React.useContext(AnalyticsOverviewCompositionContext);
  if (!context)
    throw new Error(
      "AnalyticsOverview parts must be inside AnalyticsOverview.",
    );
  return context;
}
export function AnalyticsOverview(props: AnalyticsOverviewProps) {
  const model = useAnalyticsOverviewModel(props);
  const { className, rootProps, children } = model;
  return (
    <AnalyticsOverviewCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("grid gap-6", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <AnalyticsOverviewMetrics />
            <AnalyticsOverviewCharts />
          </>
        )}
      </section>
    </AnalyticsOverviewCompositionContext.Provider>
  );
}

export function AnalyticsOverviewContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="analytics-overview-content"
      className={cn("grid gap-4 sm:grid-cols-3", className)}
      {...props}
    />
  );
}
export function AnalyticsOverviewItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="analytics-overview-itemtitle"
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
}

export function AnalyticsOverviewItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="analytics-overview-item"
      className={cn("rounded-xl border border-border p-5", className)}
      {...props}
    />
  );
}

export function AnalyticsOverviewMetrics({
  children,
  ...props
}: Partial<React.ComponentProps<typeof AnalyticsOverviewContent>> & {
  children?: React.ReactNode;
}) {
  const { metrics } = useAnalyticsOverviewComposition();
  return (
    <AnalyticsOverviewContent {...props}>
      {children === undefined
        ? metrics.map((m) => (
            <AnalyticsOverviewItem key={m.label}>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="mt-3 font-display text-3xl tracking-tight tabular-nums">
                {m.value}
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-medium text-primary">
                  <ArrowUpRight size={13} />
                  {m.change}
                </span>
                {m.note}
              </p>
            </AnalyticsOverviewItem>
          ))
        : children}
    </AnalyticsOverviewContent>
  );
}
export function AnalyticsOverviewCharts({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  return (
    <div
      {...props}
      className={cn(
        "grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <div className="min-w-0 rounded-xl border border-border p-5">
            <AnalyticsOverviewItemTitle>
              Revenue over time
            </AnalyticsOverviewItemTitle>
            <p className="mb-5 mt-1 text-xs text-muted-foreground">
              Weekly breakdown · illustrative data
            </p>
            <AreaChart
              label="Weekly revenue (£) · illustrative"
              className="[&_figcaption]:sr-only"
              data={[
                { name: "Mon", value: 2840 },
                { name: "Tue", value: 3420 },
                { name: "Wed", value: 2960 },
                { name: "Thu", value: 4120 },
                { name: "Fri", value: 3650 },
                { name: "Sat", value: 4290 },
                { name: "Sun", value: 3580 },
              ]}
            />
          </div>
          <div className="min-w-0 rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold">Audience mix</h3>
            <p className="mb-5 mt-1 text-xs text-muted-foreground">
              Sessions by source
            </p>
            <DonutChart className="[&_figcaption]:sr-only" />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
