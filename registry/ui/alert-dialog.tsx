"use client";
import * as React from "react";
import { AlertDialog as P } from "radix-ui";
import { cn } from "./utils";
import { Button } from "./button";
export function AlertDialog({
  trigger,
  title,
  description,
  children,
  className,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  ...props
}: React.ComponentProps<typeof P.Root> & {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}) {
  return (
    <P.Root {...props}>
      {trigger !== undefined ? (
        <>
          <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
          <AlertDialogContent className={className}>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            {children}
            <AlertDialogFooter>
              <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>
                {confirmLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const AlertDialogTrigger = P.Trigger;
export const AlertDialogPortal = P.Portal;
export function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof P.Overlay>) {
  return (
    <P.Overlay
      className={cn("jez-overlay fixed inset-0 z-50 bg-black/40", className)}
      {...props}
    />
  );
}
export function AlertDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof P.Content>) {
  return (
    <P.Portal>
      <AlertDialogOverlay />
      <P.Content
        className={cn(
          "jez-popover fixed left-1/2 top-1/2 z-50 w-[min(92vw,460px)] max-h-[85dvh] overflow-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-7 text-foreground shadow-xl",
          className,
        )}
        {...props}
      >
        {children}
      </P.Content>
    </P.Portal>
  );
}
export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mb-6 grid gap-2 pr-8", className)} {...props} />;
}
export function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-6 flex flex-wrap justify-end gap-3", className)}
      {...props}
    />
  );
}
export function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof P.Title>) {
  return (
    <P.Title
      className={cn(
        "font-display text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
export function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof P.Description>) {
  return (
    <P.Description
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
export function AlertDialogCancel({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof P.Cancel>) {
  return (
    <P.Cancel asChild {...props}>
      {asChild ? children : <Button variant="outline">{children}</Button>}
    </P.Cancel>
  );
}
export function AlertDialogAction({
  asChild = false,
  children,
  ...props
}: React.ComponentProps<typeof P.Action>) {
  return (
    <P.Action asChild {...props}>
      {asChild ? children : <Button variant="danger">{children}</Button>}
    </P.Action>
  );
}
