"use client";
import * as React from "react";
import { cn } from "./utils";
export function Avatar({
  src,
  alt,
  fallback = "JU",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  src?: string;
  alt: string;
  fallback?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  return (
    <span
      role={src && !failed ? undefined : "img"}
      aria-label={src && !failed ? undefined : alt}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-[#171817] text-sm font-medium",
        className,
      )}
      {...props}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        fallback
      )}
    </span>
  );
}
