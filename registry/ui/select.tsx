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
  children,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  options?: { label: string; value: string; disabled?: boolean }[];
  label?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <P.Root {...props}>
      {options ? (
        <>
          <SelectTrigger
            id={id}
            aria-label={label}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={className}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const SelectValue = P.Value;
export const SelectGroup = P.Group;
export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Trigger>) {
  return (
    <P.Trigger
      className={cn(
        "flex h-10 w-full min-w-40 items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 text-left text-sm shadow-sm outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-3 focus:ring-primary/10 data-[placeholder]:text-muted-foreground disabled:opacity-50 [&>span:first-child]:truncate",
        className,
      )}
      {...props}
    >
      {children}
      <P.Icon asChild>
        <ChevronDown size={15} className="shrink-0 text-muted-foreground" />
      </P.Icon>
    </P.Trigger>
  );
}
export function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <P.Content
        position="popper"
        align="start"
        sideOffset={6}
        collisionPadding={12}
        className={cn(
          "jez-popover z-50 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-lg",
          className,
        )}
        {...props}
      >
        <P.ScrollUpButton className="grid h-6 place-items-center">
          <ChevronUp size={14} />
        </P.ScrollUpButton>
        <P.Viewport>{children}</P.Viewport>
        <P.ScrollDownButton className="grid h-6 place-items-center">
          <ChevronDown size={14} />
        </P.ScrollDownButton>
      </P.Content>
    </P.Portal>
  );
}
export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Item>) {
  return (
    <P.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md py-2 pl-3 pr-9 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className,
      )}
      {...props}
    >
      <P.ItemText>{children}</P.ItemText>
      <P.ItemIndicator className="absolute right-2.5">
        <Check size={15} />
      </P.ItemIndicator>
    </P.Item>
  );
}
export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof P.Label>) {
  return (
    <P.Label
      className={cn(
        "px-3 py-2 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof P.Separator>) {
  return (
    <P.Separator className={cn("my-1 h-px bg-border", className)} {...props} />
  );
}
