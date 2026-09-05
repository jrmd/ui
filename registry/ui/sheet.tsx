"use client";
import * as React from "react";
import { Dialog as P } from "radix-ui";
import { X, PanelRight } from "lucide-react";
import { cn } from "./utils";
export function Sheet({
  trigger,
  title,
  description,
  children,
  className,
  onConfirm: _onConfirm,
  ...props
}: React.ComponentProps<typeof P.Root> & {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  onConfirm?: () => void;
}) {
  return (
    <P.Root {...props}>
      <P.Trigger asChild>{trigger}</P.Trigger>
      <P.Portal>
        <P.Overlay className="jez-overlay fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px]" />
        <P.Content
          className={cn(
            "jez-sheet fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(94vw,460px)] flex-col bg-background text-foreground shadow-2xl",
            className,
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <PanelRight size={17} className="text-muted-foreground" />
            <P.Close
              aria-label="Close"
              className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted"
            >
              <X size={18} />
            </P.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            <P.Title className="text-xl font-semibold">{title}</P.Title>
            <P.Description className="mb-8 mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </P.Description>
            {children}
          </div>
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
