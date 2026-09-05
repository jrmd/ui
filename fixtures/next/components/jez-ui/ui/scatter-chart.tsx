"use client";
import * as React from "react";
import { cn } from "./utils";
import {
  ResponsiveContainer,
  ScatterChart as Plot,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartFrame, sampleChartData, type ChartProps } from "./chart-frame";
export function ScatterChart({
  data = sampleChartData,
  label = "Current vs previous",
  className,
}: ChartProps) {
  return (
    <ChartFrame data={data} label={label} className={cn("", className)}>
      <ResponsiveContainer initialDimension={{ width: 600, height: 240 }}>
        <Plot margin={{ left: -20, right: 15, top: 10, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" />
          <XAxis
            type="number"
            dataKey="previous"
            name="Previous"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            type="number"
            dataKey="value"
            name="Current"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            data={data}
            fill="var(--primary)"
            isAnimationActive={false}
          />
        </Plot>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
