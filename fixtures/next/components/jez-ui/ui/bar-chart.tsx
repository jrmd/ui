"use client";
import * as React from "react";
import { cn } from "./utils";
import {
  ResponsiveContainer,
  BarChart as Plot,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartFrame, sampleChartData, type ChartProps } from "./chart-frame";
export function BarChart({
  data = sampleChartData,
  label = "Bar chart",
  className,
  color = "var(--primary)",
}: ChartProps) {
  return (
    <ChartFrame data={data} label={label} className={cn("", className)}>
      <ResponsiveContainer
        initialDimension={{ width: 600, height: 240 }}
        width="100%"
        height="100%"
      >
        <Plot
          data={data}
          margin={{ top: 8, right: 12, left: -24, bottom: 0 }}
          accessibilityLayer
        >
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)",
            }}
          />
          <Bar
            dataKey="value"
            fill={color}
            stroke={color}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </Plot>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
