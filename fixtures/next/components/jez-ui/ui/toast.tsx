"use client";
import * as React from "react";
import { cn } from "./utils";
import { Toast as P } from "radix-ui";
import { Button } from "./button";
export const ToastProvider = P.Provider;
export function ToastRoot({
  className,
  ...props
}: React.ComponentProps<typeof P.Root>) {
  return (
    <P.Root
      className={cn(
        "jez-popover rounded-xl border border-border bg-background p-5 text-foreground shadow-lg data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
        className,
      )}
      {...props}
    />
  );
}
export function ToastViewport({
  className,
  ...props
}: React.ComponentProps<typeof P.Viewport>) {
  return (
    <P.Viewport
      className={cn(
        "fixed bottom-5 right-5 z-[100] grid w-[min(90vw,360px)] gap-3 outline-none",
        className,
      )}
      {...props}
    />
  );
}
export function ToastTitle({
  className,
  ...props
}: React.ComponentProps<typeof P.Title>) {
  return <P.Title className={cn("font-medium", className)} {...props} />;
}
export function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof P.Description>) {
  return (
    <P.Description
      className={cn(
        "mt-1 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function ToastClose({
  className,
  ...props
}: React.ComponentProps<typeof P.Close>) {
  return (
    <P.Close
      className={cn(
        "mt-3 rounded text-sm underline underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}
export function ToastAction({
  className,
  ...props
}: React.ComponentProps<typeof P.Action>) {
  return (
    <P.Action
      className={cn(
        "mt-3 inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
export function Toast({
  title,
  description,
  trigger = "Show notification",
  dismissLabel = "Dismiss",
  className,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  trigger?: React.ReactNode;
  dismissLabel?: string;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <ToastProvider swipeDirection="right">
      <Button variant="outline" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      <ToastRoot open={open} onOpenChange={setOpen} className={className}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
        <ToastClose aria-label={dismissLabel}>{dismissLabel}</ToastClose>
      </ToastRoot>
      <ToastViewport />
    </ToastProvider>
  );
}
