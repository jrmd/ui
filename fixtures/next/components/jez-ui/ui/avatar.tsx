"use client";
import * as React from "react";
import { Avatar as P } from "radix-ui";
import { cn } from "./utils";
export function Avatar({
  src,
  alt,
  fallback = "JU",
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}) {
  return (
    <P.Root
      className={cn(
        "relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-sm font-medium text-[#171817]",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback role={alt ? "img" : undefined} aria-label={alt}>
            {fallback}
          </AvatarFallback>
        </>
      )}
    </P.Root>
  );
}
export function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof P.Image>) {
  return (
    <P.Image className={cn("size-full object-cover", className)} {...props} />
  );
}
export function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof P.Fallback>) {
  return (
    <P.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-accent",
        className,
      )}
      {...props}
    />
  );
}
