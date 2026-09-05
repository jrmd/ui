"use client";
import * as React from "react";
import { Home, Layers, Bookmark, Settings } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../ui/utils";
export function FloatingNavigation({
  className,
  items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Components", href: "/components", icon: Layers },
    { label: "Blocks", href: "/blocks", icon: Bookmark },
    { label: "Templates", href: "/templates", icon: Settings },
  ],
  currentHref = "/",
}: {
  className?: string;
  items?: { label: string; href: string; icon: typeof Home }[];
  currentHref?: string;
}) {
  const reduced = useReducedMotion();
  const id = React.useId();
  return (
    <nav
      aria-label="Quick navigation"
      className={cn(
        "mx-auto flex w-fit max-w-full items-center gap-1 rounded-2xl border border-border bg-background/95 p-1.5 shadow-lg backdrop-blur-lg",
        className,
      )}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={currentHref === item.href ? "page" : undefined}
          className="relative flex min-w-0 items-center gap-2 rounded-xl px-3 py-3 text-sm sm:px-4"
        >
          {currentHref === item.href && (
            <motion.span
              layoutId={id}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 400, damping: 35 }
              }
              className="absolute inset-0 rounded-xl bg-primary/8"
            />
          )}
          <item.icon
            size={18}
            className={cn(
              "relative shrink-0",
              currentHref === item.href
                ? "text-primary"
                : "text-muted-foreground",
            )}
          />
          <span
            className={cn(
              "relative",
              currentHref === item.href
                ? "font-medium text-primary"
                : "sr-only sm:not-sr-only sm:text-muted-foreground",
            )}
          >
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
