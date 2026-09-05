"use client";
import * as React from "react";
import { Dialog as P } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
export function Dialog({
  trigger,
  title,
  description,
  children,
  className,
  closeLabel = "Close",
  ...props
}: React.ComponentProps<typeof P.Root> & {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  closeLabel?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}) {
  return (
    <P.Root {...props}>
      {trigger !== undefined ? (
        <>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent showClose={false} className={className}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{closeLabel}</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const DialogTrigger = P.Trigger;
export const DialogPortal = P.Portal;
export const DialogClose = P.Close;
export function DialogOverlay({
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
export function DialogContent({
  className,
  children,
  showClose = true,
  closeLabel = "Close",
  ...props
}: React.ComponentProps<typeof P.Content> & {
  showClose?: boolean;
  closeLabel?: string;
}) {
  return (
    <P.Portal>
      <DialogOverlay />
      <P.Content
        className={cn(
          "jez-popover fixed left-1/2 top-1/2 z-50 w-[min(92vw,460px)] max-h-[85dvh] overflow-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-7 text-foreground shadow-xl",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <P.Close
            aria-label={closeLabel}
            className="absolute right-4 top-4 grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted"
          >
            <X size={16} />
          </P.Close>
        )}
      </P.Content>
    </P.Portal>
  );
}
export function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mb-6 grid gap-2 pr-8", className)} {...props} />;
}
export function DialogFooter({
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
export function DialogTitle({
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
export function DialogDescription({
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
