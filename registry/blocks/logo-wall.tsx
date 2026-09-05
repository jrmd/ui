"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type LogoWallOptions = {
  names?: string[];
  className?: string;
  description?: React.ReactNode;
};
export type LogoWallProps = Omit<
  React.ComponentProps<"section">,
  keyof LogoWallOptions
> &
  LogoWallOptions;

export function LogoWall({
  description = <>Illustrative brand collection</>,
  names = ["Forma", "Circa", "Outline", "Common", "Mode"],
  className,
  children,
  ...rootProps
}: LogoWallProps) {
  return (
    <section
      {...rootProps}
      className={cn("border-y border-border py-7", className)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <LogoWallDescription>{description}</LogoWallDescription>
          <LogoWallHeader>
            {names.map((n) => (
              <span key={n} className="font-display text-2xl font-semibold">
                {n}
              </span>
            ))}
          </LogoWallHeader>
        </>
      )}
    </section>
  );
}

export function LogoWallDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="logo-wall-description"
      className={cn("mb-5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
export function LogoWallHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="logo-wall-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-8",
        className,
      )}
      {...props}
    />
  );
}
