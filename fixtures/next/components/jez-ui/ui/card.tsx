"use client";
import * as React from "react";
import { cn } from "./utils";
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border border-border bg-background p-6 text-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 pb-5",
        className,
      )}
      {...props}
    />
  );
}
export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "col-start-1 font-display text-lg font-semibold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "col-start-1 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-start-1 row-span-2 self-start", className)}
      {...props}
    />
  );
}
export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("grid gap-4 text-sm leading-relaxed", className)}
      {...props}
    />
  );
}
export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex flex-wrap items-center gap-3 pt-6", className)}
      {...props}
    />
  );
}
