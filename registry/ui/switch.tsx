"use client";
import * as React from "react";
import { Switch as P } from "radix-ui";
import { cn } from "./utils";
export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof P.Root>) {
  return (
    <P.Root
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border bg-muted p-[2px] align-middle transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <P.Thumb className="pointer-events-none block size-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ease-out data-[state=checked]:translate-x-5" />
    </P.Root>
  );
}
