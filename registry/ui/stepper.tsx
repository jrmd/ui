"use client";
import * as React from "react";
import { cn } from "./utils";
export function Stepper({
  steps,
  current = 0,
  children,
  className,
  ...props
}: React.ComponentProps<"ol"> & { steps?: string[]; current?: number }) {
  return (
    <ol className={cn("flex flex-wrap gap-5", className)} {...props}>
      {steps
        ? steps.map((label, i) => (
            <StepperItem
              key={label}
              state={
                i === current
                  ? "current"
                  : i < current
                    ? "complete"
                    : "upcoming"
              }
            >
              <StepperIndicator>{i + 1}</StepperIndicator>
              <StepperTitle>{label}</StepperTitle>
            </StepperItem>
          ))
        : children}
    </ol>
  );
}
export function StepperItem({
  state = "upcoming",
  className,
  ...props
}: React.ComponentProps<"li"> & {
  state?: "current" | "complete" | "upcoming";
}) {
  return (
    <li
      data-state={state}
      aria-current={state === "current" ? "step" : undefined}
      className={cn("group/step flex items-center gap-3 text-sm", className)}
      {...props}
    />
  );
}
export function StepperIndicator({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs group-data-[state=current]/step:bg-primary group-data-[state=current]/step:text-primary-foreground group-data-[state=complete]/step:bg-primary group-data-[state=complete]/step:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function StepperTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground group-data-[state=current]/step:font-medium group-data-[state=current]/step:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-1 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
