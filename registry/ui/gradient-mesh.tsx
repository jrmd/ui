"use client";
import * as React from "react";
import { cn } from "./utils";
export function GradientMesh({
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
  return (
    <div
      {...rootProps}
      className={cn("min-h-60 rounded-xl p-8 text-[#151818]", className)}
      style={{
        background:
          "radial-gradient(at 10% 15%,#d3fb65,transparent 65%),radial-gradient(at 90% 10%,#b0c6ff,transparent 60%),radial-gradient(at 55% 95%,#f6ab81,transparent 65%),#f0f0df",
        ...rootProps.style,
      }}
    >
      {children}
    </div>
  );
}
