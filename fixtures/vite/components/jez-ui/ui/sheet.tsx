"use client";
import * as React from "react";
import { Dialog as P } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "./utils";
export function Sheet({
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
          <SheetTrigger asChild>{trigger}</SheetTrigger>
          <SheetContent closeLabel={closeLabel} className={className}>
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            {children}
          </SheetContent>
        </>
      ) : (
        children
      )}
    </P.Root>
  );
}
export const SheetTrigger = P.Trigger;
export const SheetPortal = P.Portal;
export const SheetClose = P.Close;
export function SheetOverlay({
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
export function SheetContent({
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
      <SheetOverlay />
      <P.Content
        className={cn(
          "jez-sheet fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(94vw,460px)] flex-col overflow-y-auto bg-background p-6 text-foreground shadow-2xl",
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
export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mb-6 grid gap-2 pr-8", className)} {...props} />;
}
export function SheetFooter({
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
export function SheetTitle({
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
export function SheetDescription({
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
