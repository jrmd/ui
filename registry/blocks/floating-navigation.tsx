"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { Home, Layers, Bookmark, Settings } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../ui/utils";
export type FloatingNavigationOptions = {
  className?: string;
  items?: { label: string; href: string; icon: typeof Home }[];
  currentHref?: string;
};
export type FloatingNavigationProps = Omit<
  React.ComponentProps<"nav">,
  keyof FloatingNavigationOptions
> &
  FloatingNavigationOptions;
function useFloatingNavigationModel({
  className,
  items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Components", href: "/components", icon: Layers },
    { label: "Blocks", href: "/blocks", icon: Bookmark },
    { label: "Templates", href: "/templates", icon: Settings },
  ],
  currentHref = "/",
  children,
  ...rootProps
}: FloatingNavigationProps) {
  const reduced = useReducedMotion();
  const id = React.useId();
  return { className, items, currentHref, children, rootProps, reduced, id };
}
const FloatingNavigationCompositionContext = React.createContext<ReturnType<
  typeof useFloatingNavigationModel
> | null>(null);
function useFloatingNavigationComposition() {
  const context = React.useContext(FloatingNavigationCompositionContext);
  if (!context)
    throw new Error(
      "FloatingNavigation parts must be inside FloatingNavigation.",
    );
  return context;
}
export function FloatingNavigation(props: FloatingNavigationProps) {
  const model = useFloatingNavigationModel(props);
  const { className, rootProps, children } = model;
  return (
    <FloatingNavigationCompositionContext.Provider value={model}>
      <nav
        {...rootProps}
        aria-label={rootProps["aria-label"] ?? "Quick navigation"}
        className={cn(
          "mx-auto flex w-fit max-w-full items-center gap-1 rounded-2xl border border-border bg-background/95 p-1.5 shadow-lg backdrop-blur-lg",
          className,
        )}
      >
        {children !== undefined ? children : <FloatingNavigationLinks />}
      </nav>
    </FloatingNavigationCompositionContext.Provider>
  );
}

export function FloatingNavigationItem({
  className,
  asChild,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="floating-navigation-item"
      className={cn(
        "relative flex min-w-0 items-center gap-2 rounded-xl px-3 py-3 text-sm sm:px-4",
        className,
      )}
      {...props}
    />
  );
}

export function FloatingNavigationLinks({ children }: React.PropsWithChildren) {
  const { items, currentHref, reduced, id } =
    useFloatingNavigationComposition();
  return children === undefined
    ? items.map((item) => (
        <FloatingNavigationItem
          key={item.href}
          href={item.href}
          aria-current={currentHref === item.href ? "page" : undefined}
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
        </FloatingNavigationItem>
      ))
    : children;
}
