"use client";
import * as React from "react";
import { cn } from "./utils";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartFrame, type ChartProps } from "./chart-frame";
export function DonutChart({
  data = [
    { name: "Direct", value: 48 },
    { name: "Search", value: 32 },
    { name: "Referral", value: 20 },
  ],
  label = "Traffic sources",
  className,
  color,
  colors = ["var(--primary)", "#9eb95f", "#e29366", "#8498bb"],
}: ChartProps & { colors?: string[] }) {
  return (
    <ChartFrame data={data} label={label} className={cn("", className)}>
      <ResponsiveContainer initialDimension={{ width: 600, height: 240 }}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="88%"
            paddingAngle={3}
            isAnimationActive={false}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={color ?? colors[i % colors.length] ?? "var(--primary)"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
