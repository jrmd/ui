"use client";
import * as React from "react";
import { cn } from "./utils";
export type ChartDatum = { name: string; value: number; previous?: number };
export const sampleChartData: ChartDatum[] = [
  { name: "Mon", value: 32, previous: 24 },
  { name: "Tue", value: 48, previous: 31 },
  { name: "Wed", value: 39, previous: 36 },
  { name: "Thu", value: 65, previous: 42 },
  { name: "Fri", value: 57, previous: 38 },
  { name: "Sat", value: 82, previous: 49 },
  { name: "Sun", value: 73, previous: 51 },
];
export type ChartProps = {
  data?: ChartDatum[];
  label?: string;
  className?: string;
  color?: string;
};
export function ChartFrame({
  children,
  data,
  label,
  className,
}: {
  children: React.ReactNode;
  data: ChartDatum[];
  label: string;
  className?: string;
}) {
  return (
    <figure className={cn("m-0 w-full min-w-0", className)}>
      <figcaption className="mb-4 text-sm font-medium">{label}</figcaption>
      <div className="h-60 w-full min-w-0 overflow-hidden">{children}</div>
      <details className="mt-3 text-xs text-muted-foreground">
        <summary>View data table</summary>
        <table className="mt-3 w-full text-left">
          <caption className="sr-only">{label}</caption>
          <thead>
            <tr>
              <th>Period</th>
              <th>Value</th>
              <th>Previous</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <th className="py-1 font-normal">{d.name}</th>
                <td>{d.value}</td>
                <td>{d.previous ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
