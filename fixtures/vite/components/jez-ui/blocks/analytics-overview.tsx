"use client";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
import { AreaChart } from "../ui/area-chart";
import { DonutChart } from "../ui/donut-chart";
export function AnalyticsOverview({ className }: { className?: string }) {
  return (
    <section className={cn("grid gap-6", className)}>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
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
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border p-5">
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
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0 rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold">Revenue over time</h3>
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
      </div>
    </section>
  );
}
