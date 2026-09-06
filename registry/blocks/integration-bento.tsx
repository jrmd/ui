"use client";

import * as React from "react";
import {
  ArrowUpRight,
  Check,
  CircleDashed,
  Send,
  Workflow,
} from "lucide-react";
import { cn } from "../ui/utils";

export type IntegrationBentoItem = {
  name: React.ReactNode;
  detail: React.ReactNode;
  initials: string;
  tone?: "sage" | "ink" | "paper";
};
const defaultItems: IntegrationBentoItem[] = [
  {
    name: "Project brief",
    detail: "One source of direction",
    initials: "PB",
    tone: "sage",
  },
  {
    name: "Design review",
    detail: "Feedback where it belongs",
    initials: "DR",
    tone: "paper",
  },
  {
    name: "Release checklist",
    detail: "Hand off with confidence",
    initials: "RC",
    tone: "ink",
  },
];
export type IntegrationBentoProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: IntegrationBentoItem[];
};
type IntegrationBentoModel = Required<
  Pick<IntegrationBentoProps, "title" | "description" | "items">
>;
const IntegrationBentoContext =
  React.createContext<IntegrationBentoModel | null>(null);
function useIntegrationBento() {
  const context = React.useContext(IntegrationBentoContext);
  if (!context)
    throw new Error("IntegrationBento parts must be inside IntegrationBento.");
  return context;
}
export const IntegrationBento = React.forwardRef<
  HTMLElement,
  IntegrationBentoProps
>(function IntegrationBento(
  {
    title = "Your tools should pass the right context along.",
    description = "Connect the moments that make work feel joined up, without asking people to duplicate the important bit.",
    items = defaultItems,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <IntegrationBentoContext.Provider value={{ title, description, items }}>
      <section
        ref={ref}
        data-slot="integration-bento"
        className={cn("py-12 md:py-20", className)}
        {...props}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <IntegrationBentoHeading />
            <IntegrationBentoGrid />
          </>
        )}
      </section>
    </IntegrationBentoContext.Provider>
  );
});
export const IntegrationBentoHeading = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function IntegrationBentoHeading({ children, className, ...props }, ref) {
  const { title, description } = useIntegrationBento();
  return (
    <div
      ref={ref}
      data-slot="integration-bento-heading"
      className={cn(
        "mb-8 grid gap-5 md:mb-12 md:grid-cols-2 md:items-end",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <h2 className="max-w-xl text-balance text-4xl leading-[1.05] tracking-[-.035em] md:text-6xl">
            {title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:justify-self-end">
            {description}
          </p>
        </>
      )}
    </div>
  );
});
export const IntegrationBentoGrid = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function IntegrationBentoGrid({ children, className, ...props }, ref) {
  const { items } = useIntegrationBento();
  return (
    <div
      ref={ref}
      data-slot="integration-bento-grid"
      className={cn("grid gap-3 md:grid-cols-12", className)}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <IntegrationBentoFlow />
          <IntegrationBentoItems items={items} />
        </>
      )}
    </div>
  );
});
export const IntegrationBentoFlow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function IntegrationBentoFlow({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="integration-bento-flow"
      className={cn(
        "relative min-h-80 overflow-hidden rounded-xl bg-[#36483e] p-6 text-white md:col-span-7 md:p-8",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xs text-white/65">
              <Workflow size={15} /> Connected flow
            </span>
            <ArrowUpRight size={17} />
          </div>
          <div className="relative mt-12 grid gap-3 sm:grid-cols-3">
            <IntegrationBentoNode
              label="Brief"
              icon={<CircleDashed size={16} />}
            />
            <IntegrationBentoNode label="Review" icon={<Check size={16} />} />
            <IntegrationBentoNode label="Release" icon={<Send size={16} />} />
          </div>
          <p className="absolute bottom-7 left-6 max-w-sm text-2xl leading-tight tracking-[-.03em] md:left-8">
            A handoff should carry the decision, not just a link.
          </p>
          <svg
            aria-hidden
            className="absolute right-0 top-16 hidden h-32 w-1/2 text-white/20 sm:block"
            viewBox="0 0 300 120"
            fill="none"
          >
            <path
              d="M0 60H72C95 60 104 18 130 18H300"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          </svg>
        </>
      )}
    </div>
  );
});
export const IntegrationBentoNode = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    label: React.ReactNode;
    icon: React.ReactNode;
  }
>(function IntegrationBentoNode({ label, icon, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="integration-bento-node"
      className={cn(
        "relative z-10 flex items-center gap-2 rounded-lg bg-white/10 p-3 text-xs font-medium",
        className,
      )}
      {...props}
    >
      <span className="grid size-7 place-items-center rounded-full bg-white/15">
        {icon}
      </span>
      {label}
    </div>
  );
});
export const IntegrationBentoItems = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { items?: IntegrationBentoItem[] }
>(function IntegrationBentoItems(
  { items, children, className, ...props },
  ref,
) {
  const model = useIntegrationBento();
  const actualItems = items ?? model.items;
  return (
    <div
      ref={ref}
      data-slot="integration-bento-items"
      className={cn(
        "grid gap-3 sm:grid-cols-3 md:col-span-5 md:grid-cols-1",
        className,
      )}
      {...props}
    >
      {children !== undefined
        ? children
        : actualItems.map((item) => (
            <IntegrationBentoItem key={String(item.name)} item={item} />
          ))}
    </div>
  );
});
export const IntegrationBentoItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { item: IntegrationBentoItem }
>(function IntegrationBentoItem({ item, children, className, ...props }, ref) {
  const tone =
    item.tone === "ink"
      ? "bg-[#191b19] text-[#f4f4ec]"
      : item.tone === "sage"
        ? "bg-[#d9e3cd]"
        : "bg-muted";
  return (
    <div
      ref={ref}
      data-slot="integration-bento-item"
      className={cn(
        "group flex min-h-24 items-center gap-4 rounded-xl p-5",
        tone,
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full text-xs font-medium",
              item.tone === "ink" ? "bg-white/10" : "bg-background",
            )}
          >
            {item.initials}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium">{item.name}</h3>
            <p
              className={cn(
                "mt-1 text-xs",
                item.tone === "ink"
                  ? "text-[#b5baae]"
                  : "text-muted-foreground",
              )}
            >
              {item.detail}
            </p>
          </div>
          <ArrowUpRight
            size={16}
            className="shrink-0 opacity-55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </>
      )}
    </div>
  );
});
IntegrationBento.displayName = "IntegrationBento";
