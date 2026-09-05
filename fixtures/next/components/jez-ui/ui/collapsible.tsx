"use client";
import * as React from "react";
import { Collapsible as P } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";
export function Collapsible({
  title,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & { title: string }) {
  return (
    <P.Root
      className={cn(
        "w-full overflow-hidden rounded-lg border border-border",
        className,
      )}
      {...props}
    >
      <P.Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium hover:bg-muted/40">
        {title}
        <ChevronDown
          size={16}
          className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </P.Trigger>
      <P.Content className="jez-collapse overflow-hidden">
        <div className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </P.Content>
    </P.Root>
  );
}
