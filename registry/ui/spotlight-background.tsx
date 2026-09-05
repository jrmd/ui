"use client";
import * as React from "react";
import { cn } from "./utils";
export function SpotlightBackground({
  children,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    children?: React.ReactNode;
    className?: string;
  }
> & {
  children?: React.ReactNode;
  className?: string;
}) {
  const [x, setX] = React.useState(50);
  return (
    <div
      {...rootProps}
      onPointerMove={(e) => {
        rootProps.onPointerMove?.(e);
        if (e.defaultPrevented) return;

        const r = e.currentTarget.getBoundingClientRect();
        setX(((e.clientX - r.left) / r.width) * 100);
      }}
      className={cn(
        "min-h-64 rounded-xl bg-[#161c22] p-8 text-white",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(ellipse at ${x}% 0%,#657765,transparent 70%)`,
        ...rootProps.style,
      }}
    >
      {children}
    </div>
  );
}
