"use client";
import * as React from "react";
import { cn } from "./utils";
import { LineChart } from "./line-chart";
import { sampleChartData, type ChartProps } from "./chart-frame";
import { Button } from "./button";
export function LiveLineChart({
  children,
  className,
  data: suppliedData,
  label = "Live signal · simulated",
  color,
  startLabel = "Start stream",
  pauseLabel = "Pause stream",
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof (ChartProps<"div"> & { startLabel?: string; pauseLabel?: string })
> &
  (ChartProps<"div"> & { startLabel?: string; pauseLabel?: string })) {
  const [data, setData] = React.useState(sampleChartData);
  const [running, setRunning] = React.useState(false);
  const tick = React.useRef(0);
  React.useEffect(() => {
    if (!running || suppliedData) return;
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
  }, [running, suppliedData]);
  return (
    <div {...rootProps} className={cn("grid gap-3", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <LineChart data={suppliedData ?? data} label={label} color={color} />
          {!suppliedData && (
            <Button variant="outline" onClick={() => setRunning((v) => !v)}>
              {running ? pauseLabel : startLabel}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
