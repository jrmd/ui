"use client";

import * as React from "react";
import { ArrowUpRight, Layers2, Play, ShieldCheck } from "lucide-react";
import { cn } from "../ui/utils";

export type FeatureSpotlightProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: React.ReactNode;
  href?: string;
};
type FeatureSpotlightModel = Pick<
  FeatureSpotlightProps,
  "title" | "description" | "actionLabel" | "href"
>;
const FeatureSpotlightContext =
  React.createContext<FeatureSpotlightModel | null>(null);
function useFeatureSpotlight() {
  const context = React.useContext(FeatureSpotlightContext);
  if (!context)
    throw new Error("FeatureSpotlight parts must be inside FeatureSpotlight.");
  return context;
}

export const FeatureSpotlight = React.forwardRef<
  HTMLElement,
  FeatureSpotlightProps
>(function FeatureSpotlight(
  {
    title = "Move from a useful thought to a usable system.",
    description = "Put the brief, the people, and the work in one deliberate view. Every stage knows what comes next.",
    actionLabel = "Explore the flow",
    href,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <FeatureSpotlightContext.Provider
      value={{ title, description, actionLabel, href }}
    >
      <section
        ref={ref}
        data-slot="feature-spotlight"
        className={cn("py-12 md:py-20", className)}
        {...props}
      >
        {children !== undefined ? (
          children
        ) : (
          <FeatureSpotlightFrame>
            <FeatureSpotlightCopy />
            <FeatureSpotlightPreview />
          </FeatureSpotlightFrame>
        )}
      </section>
    </FeatureSpotlightContext.Provider>
  );
});
export const FeatureSpotlightFrame = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function FeatureSpotlightFrame({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="feature-spotlight-frame"
      className={cn(
        "grid overflow-hidden rounded-[14px] bg-[#191b19] text-[#f4f4ec] lg:grid-cols-[.86fr_1.14fr]",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureSpotlightCopy = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function FeatureSpotlightCopy({ children, className, ...props }, ref) {
  const { title, description, actionLabel, href } = useFeatureSpotlight();
  return (
    <div
      ref={ref}
      data-slot="feature-spotlight-copy"
      className={cn(
        "flex min-h-96 flex-col justify-between p-7 md:p-10",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div>
            <h2 className=" max-w-md text-balance text-4xl leading-[1.04] tracking-[-0.035em] md:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#b5baae]">
              {description}
            </p>
          </div>
          {href && (
            <a
              href={href}
              className="mt-12 inline-flex w-fit items-center gap-2 border-b border-[#f4f4ec]/35 pb-2 text-sm transition-colors hover:border-[#f4f4ec]"
            >
              <span>{actionLabel}</span>
              <ArrowUpRight size={16} />
            </a>
          )}
        </>
      )}
    </div>
  );
});
export const FeatureSpotlightPreview = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function FeatureSpotlightPreview({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="feature-spotlight-preview"
      className={cn(
        "relative min-h-96 overflow-hidden bg-[#d9e3cd] p-5 text-[#17241b] sm:p-8",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div
            aria-hidden
            className="absolute right-0 top-0 h-full w-1/2 bg-[#bdcfb8]/45"
          />
          <div className="relative mx-auto max-w-md rounded-xl bg-[#f8f7f3] p-4 shadow-[0_18px_50px_rgba(23,24,23,.16)] sm:p-5">
            <div className="flex items-center justify-between border-b border-[#d6d7ce] pb-4 text-xs">
              <span className="font-medium">Release brief</span>
              <span className="rounded-full bg-[#d9e3cd] px-2.5 py-1 text-xs font-medium">
                In review
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              <FeatureSpotlightPreviewRow
                icon={<Play size={14} />}
                title="Shape the release"
                meta="Brief agreed"
                active
              />
              <FeatureSpotlightPreviewRow
                icon={<Layers2 size={14} />}
                title="Build the useful parts"
                meta="Three pieces ready"
              />
              <FeatureSpotlightPreviewRow
                icon={<ShieldCheck size={14} />}
                title="Check the handoff"
                meta="Owner assigned"
              />
            </div>
          </div>
          <div
            aria-hidden
            className="absolute bottom-7 right-7 grid size-20 place-items-center rounded-full border border-[#36483e]/25 text-center text-xs font-medium uppercase leading-tight tracking-[.12em]"
          >
            keep
            <br />
            moving
          </div>
        </>
      )}
    </div>
  );
});
export const FeatureSpotlightPreviewRow = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    icon: React.ReactNode;
    title: React.ReactNode;
    meta: React.ReactNode;
    active?: boolean;
  }
>(function FeatureSpotlightPreviewRow(
  { icon, title, meta, active, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="feature-spotlight-preview-row"
      className={cn(
        "flex items-center gap-3 rounded-lg border border-[#d6d7ce] p-3",
        active && "border-[#36483e] bg-[#36483e] text-white",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full bg-[#eeede7]",
          active && "bg-white/15",
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium">{title}</p>
        <p
          className={cn(
            "mt-1 text-xs text-[#64665d]",
            active && "text-white/65",
          )}
        >
          {meta}
        </p>
      </div>
      <span
        className={cn(
          "size-2 rounded-full bg-[#bdcfb8]",
          active && "bg-[#dfff00]",
        )}
      />
    </div>
  );
});
FeatureSpotlight.displayName = "FeatureSpotlight";
