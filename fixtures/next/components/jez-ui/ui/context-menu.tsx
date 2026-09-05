"use client";
import * as React from "react";
import { ContextMenu as P } from "radix-ui";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "./utils";
export function ContextMenu({
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
          <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>
          <ContextMenuContent className={className}>
            {items?.map((i, n) => (
              <ContextMenuItem
                key={n}
                disabled={i.disabled}
                onSelect={i.onSelect}
              >
                {i.label}
              </ContextMenuItem>
            ))}
            {children}
          </ContextMenuContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const ContextMenuTrigger = P.Trigger;
export const ContextMenuPortal = P.Portal;
export const ContextMenuGroup = P.Group;
export const ContextMenuSub = P.Sub;
export const ContextMenuRadioGroup = P.RadioGroup;
export function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <P.Content
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
export function ContextMenuItem({
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
export function ContextMenuLabel({
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
export function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof P.Separator>) {
  return (
    <P.Separator className={cn("my-1 h-px bg-border", className)} {...props} />
  );
}
export function ContextMenuCheckboxItem({
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
export function ContextMenuRadioItem({
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
export function ContextMenuSubTrigger({
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
export function ContextMenuSubContent({
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
export function ContextMenuShortcut({
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
