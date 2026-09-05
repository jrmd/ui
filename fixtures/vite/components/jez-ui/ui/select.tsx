"use client";
import * as React from "react";
import { Select as P } from "radix-ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "./utils";
export function Select({
  options,
  label,
  placeholder = "Choose an option",
  className,
  id,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  options: { label: string; value: string; disabled?: boolean }[];
  label: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <P.Root {...props}>
      <P.Trigger
        id={id}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        aria-label={label}
        className={cn(
          "flex h-10 w-full min-w-40 items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 text-left text-sm shadow-sm outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-3 focus:ring-primary/10 data-[placeholder]:text-muted-foreground disabled:opacity-50 [&>span:first-child]:truncate",
          className,
        )}
      >
        <P.Value placeholder={placeholder} />
        <P.Icon asChild>
          <ChevronDown size={15} className="shrink-0 text-muted-foreground" />
        </P.Icon>
      </P.Trigger>
      <P.Portal>
        <P.Content
          position="popper"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className="jez-popover z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-lg"
        >
          <P.ScrollUpButton className="grid h-6 place-items-center">
            <ChevronUp size={14} />
          </P.ScrollUpButton>
          <P.Viewport>
            {options.map((o) => (
              <P.Item
                key={o.value}
                value={o.value}
                disabled={o.disabled}
                className="relative flex cursor-default select-none items-center rounded-md py-2 pl-3 pr-9 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
              >
                <P.ItemText>{o.label}</P.ItemText>
                <P.ItemIndicator className="absolute right-2.5">
                  <Check size={15} />
                </P.ItemIndicator>
              </P.Item>
            ))}
          </P.Viewport>
          <P.ScrollDownButton className="grid h-6 place-items-center">
            <ChevronDown size={14} />
          </P.ScrollDownButton>
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
