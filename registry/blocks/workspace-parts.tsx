"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { RotateCcw } from "lucide-react";
export function WorkspaceHeading({
  title,
  description,
  action,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header
      {...props}
      className={cn(
        "mb-7 flex flex-wrap items-start justify-between gap-4",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          {action}
        </>
      )}
    </header>
  );
}
export function DemoReset({ onReset }: { onReset: () => void }) {
  return (
    <footer className="mt-7 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
      <span>Local demo workspace</span>
      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted"
      >
        <RotateCcw size={12} />
        Reset demo
      </button>
    </footer>
  );
}
