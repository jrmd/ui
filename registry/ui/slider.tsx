"use client";
import * as React from "react";
import { cn } from "./utils";
import { Slider as Primitive } from "radix-ui";
export function Slider({
  className,
  label = "Value",
  ...props
}: React.ComponentProps<typeof Primitive.Root> & { label?: string }) {
  return (
    <Primitive.Root
      defaultValue={[50]}
      className={cn(
        "relative flex h-8 w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <Primitive.Track className="relative h-1.5 grow rounded-full bg-muted">
        <Primitive.Range className="absolute h-full rounded-full bg-primary" />
      </Primitive.Track>
      {(props.value ?? props.defaultValue ?? [50]).map((_, i) => (
        <Primitive.Thumb
          key={i}
          aria-label={`${label}${i ? " " + (i + 1) : ""}`}
          className="block size-5 rounded-full border-2 border-primary bg-background"
        />
      ))}
    </Primitive.Root>
  );
}
