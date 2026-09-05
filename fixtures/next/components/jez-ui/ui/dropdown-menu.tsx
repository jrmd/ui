"use client";
import * as React from "react";
import { DropdownMenu as P } from "radix-ui";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "./utils";
export function DropdownMenu({
  trigger,
  items,
  children,
  className,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  trigger?: React.ReactNode;
  items?: {
    label: React.ReactNode;
    onSelect: () => void;
    disabled?: boolean;
  }[];
  className?: string;
}) {
  return (
    <P.Root {...props}>
      {trigger !== undefined ? (
        <>
          <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
          <DropdownMenuContent className={className}>
            {items?.map((i, n) => (
              <DropdownMenuItem
                key={n}
                disabled={i.disabled}
                onSelect={i.onSelect}
              >
                {i.label}
              </DropdownMenuItem>
            ))}
            {children}
          </DropdownMenuContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const DropdownMenuTrigger = P.Trigger;
export const DropdownMenuPortal = P.Portal;
export const DropdownMenuGroup = P.Group;
export const DropdownMenuSub = P.Sub;
export const DropdownMenuRadioGroup = P.RadioGroup;
export function DropdownMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <P.Content
        sideOffset={6}
        collisionPadding={12}
        className={cn(
          "jez-popover z-50 min-w-48 max-h-[var(--radix-popper-available-height)] overflow-y-auto rounded-lg border border-border bg-background p-1 text-foreground shadow-lg",
          className,
        )}
        {...props}
      />
    </P.Portal>
  );
}
export function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof P.Item>) {
  return (
    <P.Item
      className={cn(
        "flex cursor-default items-center gap-2 rounded-md px-3 py-2 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}
export function DropdownMenuLabel({
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
export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof P.Separator>) {
  return (
    <P.Separator className={cn("my-1 h-px bg-border", className)} {...props} />
  );
}
export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.CheckboxItem>) {
  return (
    <P.CheckboxItem
      className={cn(
        "relative flex items-center rounded-md py-2 pl-9 pr-3 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:opacity-40",
        className,
      )}
      {...props}
    >
      <P.ItemIndicator className="absolute left-3">
        <Check size={14} />
      </P.ItemIndicator>
      {children}
    </P.CheckboxItem>
  );
}
export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.RadioItem>) {
  return (
    <P.RadioItem
      className={cn(
        "relative flex items-center rounded-md py-2 pl-9 pr-3 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:opacity-40",
        className,
      )}
      {...props}
    >
      <P.ItemIndicator className="absolute left-3">
        <Circle size={8} fill="currentColor" />
      </P.ItemIndicator>
      {children}
    </P.RadioItem>
  );
}
export function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.SubTrigger>) {
  return (
    <P.SubTrigger
      className={cn(
        "flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm outline-none data-[highlighted]:bg-muted data-[state=open]:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight size={14} />
    </P.SubTrigger>
  );
}
export function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof P.SubContent>) {
  return (
    <P.Portal>
      <P.SubContent
        className={cn(
          "z-50 min-w-44 rounded-lg border border-border bg-background p-1 text-foreground shadow-lg",
          className,
        )}
        {...props}
      />
    </P.Portal>
  );
}
export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-wider text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
