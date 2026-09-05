"use client";
import * as React from "react";
import { cn } from "./utils";
import { LineChart } from "./line-chart";
import { sampleChartData } from "./chart-frame";
import { Button } from "./button";
export function LiveLineChart({ className }: { className?: string }) {
  const [data, setData] = React.useState(sampleChartData);
  const [running, setRunning] = React.useState(false);
  const tick = React.useRef(0);
  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      tick.current++;
      setData((d) => [
        ...d.slice(-11),
        {
          name: String(tick.current),
          value: 50 + Math.round(Math.sin(tick.current * 0.8) * 25),
        },
      ]);
    }, 1000);
    return () => clearInterval(t);
  }, [running]);
  return (
    <div className={cn("grid gap-3", className)}>
      <LineChart data={data} label="Live signal · simulated" />
      <Button variant="outline" onClick={() => setRunning((v) => !v)}>
        {running ? "Pause" : "Start"} stream
      </Button>
    </div>
  );
}
