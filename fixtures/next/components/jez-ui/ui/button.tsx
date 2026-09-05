"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { LoaderCircle } from "lucide-react";
import { cn } from "./utils";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
};
export function Button({
  variant = "primary",
  size = "md",
  loading,
  asChild,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      type={asChild ? undefined : "button"}
      disabled={asChild ? undefined : disabled || loading}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent text-sm font-medium leading-none transition-[background-color,border-color,box-shadow,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[.98] disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none [&_svg]:shrink-0",
        {
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_#ffffff26,0_1px_2px_#00000012] hover:bg-primary/90":
            variant === "primary",
          "border-border/60 bg-muted text-foreground hover:bg-muted/70":
            variant === "secondary",
          "border-border bg-background text-foreground shadow-sm hover:bg-muted/60":
            variant === "outline",
          "text-muted-foreground hover:bg-muted hover:text-foreground":
            variant === "ghost",
          "bg-danger text-danger-foreground hover:bg-danger/90":
            variant === "danger",
        },
        {
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          <span
            className={cn(
              "inline-flex min-w-0 flex-1 items-center justify-center gap-2",
              loading && "invisible",
            )}
          >
            {children}
          </span>
          {loading && (
            <LoaderCircle
              aria-hidden="true"
              className="absolute size-4 animate-spin motion-reduce:animate-none"
            />
          )}
        </>
      )}
    </Comp>
  );
}
