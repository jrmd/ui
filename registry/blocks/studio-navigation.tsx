"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { Dialog as D } from "radix-ui";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
export type StudioNavigationOptions = {
  className?: string;
  items?: typeof StudioNavigationDefaultItems;
};
export type StudioNavigationProps = Omit<
  React.ComponentProps<"header">,
  keyof StudioNavigationOptions
> &
  StudioNavigationOptions;
const StudioNavigationDefaultItems = ["Work", "Studio", "Contact"];
function useStudioNavigationModel({
  items = StudioNavigationDefaultItems,
  className,
  children,
  ...rootProps
}: StudioNavigationProps) {
  return { items, className, children, rootProps };
}
const StudioNavigationCompositionContext = React.createContext<ReturnType<
  typeof useStudioNavigationModel
> | null>(null);
function useStudioNavigationComposition() {
  const context = React.useContext(StudioNavigationCompositionContext);
  if (!context)
    throw new Error("StudioNavigation parts must be inside StudioNavigation.");
  return context;
}
export function StudioNavigation(props: StudioNavigationProps) {
  const model = useStudioNavigationModel(props);
  const { className, rootProps, children } = model;
  return (
    <StudioNavigationCompositionContext.Provider value={model}>
      <header
        {...rootProps}
        className={cn(
          "flex items-center justify-between rounded-xl bg-[#22251f] p-6 text-[#ebe9dc]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <StudioNavigationBrand />
            <StudioNavigationMenu />
          </>
        )}
      </header>
    </StudioNavigationCompositionContext.Provider>
  );
}

export function StudioNavigationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="studio-navigation-content"
      className={cn("flex items-center gap-6", className)}
      {...props}
    />
  );
}

export function StudioNavigationItem({
  className,
  asChild,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="studio-navigation-item"
      className={cn(
        "group flex items-center gap-5 border-b border-white/20 py-6 font-display text-4xl tracking-tight md:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

export function StudioNavigationBrand({
  children,
  asChild,
  ...props
}: Partial<React.ComponentProps<"a">> & { children?: React.ReactNode } & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      href="/templates/agency/preview"
      {...props}
      className={cn(
        "font-display text-2xl font-bold tracking-tighter",
        props.className,
      )}
    >
      {children === undefined ? "OTHER®" : children}
    </Comp>
  );
}
export function StudioNavigationMenu({
  children,
  ...props
}: Partial<React.ComponentProps<typeof StudioNavigationContent>> & {
  children?: React.ReactNode;
}) {
  const { items } = useStudioNavigationComposition();
  return (
    <StudioNavigationContent {...props}>
      {children === undefined ? (
        <>
          <a
            href="/templates/agency/preview/contact"
            className="hidden items-center gap-2 text-xs sm:flex"
          >
            Have something in mind?
            <ArrowUpRight size={15} />
          </a>
          <D.Root>
            <D.Trigger className="flex items-center gap-3 rounded-full border border-white/30 px-4 py-2.5 text-xs">
              Menu
              <Menu size={16} />
            </D.Trigger>
            <D.Portal>
              <D.Overlay className="jez-overlay fixed inset-0 z-40 bg-black/50" />
              <D.Content className="jez-sheet fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-[#22251f] p-8 text-[#ebe9dc] md:p-12">
                <div className="flex items-center justify-between">
                  <D.Title className="font-display text-xl">OTHER®</D.Title>
                  <D.Close
                    aria-label="Close menu"
                    className="grid size-10 place-items-center rounded-full border border-white/30"
                  >
                    <X size={18} />
                  </D.Close>
                </div>
                <D.Description className="mt-4 text-xs text-white/50">
                  Independent design. A different point of view.
                </D.Description>
                <nav aria-label="Studio navigation" className="my-auto grid">
                  {items.map((name, i) => (
                    <StudioNavigationItem
                      key={name}
                      href={`/templates/agency/preview/${name.toLowerCase()}`}
                    >
                      <span className="text-xs text-white/40">0{i + 1}</span>
                      <span className="flex-1">{name}</span>
                      <ArrowUpRight className="size-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </StudioNavigationItem>
                  ))}
                </nav>
                <p className="text-xs text-white/50">
                  Good work starts with a conversation.
                </p>
              </D.Content>
            </D.Portal>
          </D.Root>
        </>
      ) : (
        children
      )}
    </StudioNavigationContent>
  );
}
