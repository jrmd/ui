"use client";

import * as React from "react";
import { ArrowUpRight, Braces, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "../ui/utils";

export type FeatureMosaicItem = {
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
};

const defaultItems: FeatureMosaicItem[] = [
  {
    title: "A considered first draft",
    description:
      "Start with a clear brief, then let the work take shape together.",
    icon: Sparkles,
  },
  {
    title: "Every decision stays visible",
    description:
      "Keep approvals, source material, and useful context in reach.",
    icon: CheckCircle2,
  },
  {
    title: "Built to meet your stack",
    description: "Bring the tools your team already trusts into the same flow.",
    icon: Braces,
  },
];

export type FeatureMosaicProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: FeatureMosaicItem[];
};

type FeatureMosaicModel = Required<
  Pick<FeatureMosaicProps, "title" | "description" | "items">
>;
const FeatureMosaicContext = React.createContext<FeatureMosaicModel | null>(
  null,
);
function useFeatureMosaic() {
  const context = React.useContext(FeatureMosaicContext);
  if (!context)
    throw new Error("FeatureMosaic parts must be inside FeatureMosaic.");
  return context;
}

export const FeatureMosaic = React.forwardRef<HTMLElement, FeatureMosaicProps>(
  function FeatureMosaic(
    {
      title = "The pieces you need, arranged around the work.",
      description = "A flexible workspace for turning early direction into a decision everyone can follow.",
      items = defaultItems,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <FeatureMosaicContext.Provider value={{ title, description, items }}>
        <section
          ref={ref}
          data-slot="feature-mosaic"
          className={cn("py-12 md:py-20", className)}
          {...props}
        >
          {children !== undefined ? (
            children
          ) : (
            <>
              <FeatureMosaicHeading />
              <FeatureMosaicGrid />
            </>
          )}
        </section>
      </FeatureMosaicContext.Provider>
    );
  },
);

export const FeatureMosaicTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h2">
>(function FeatureMosaicTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      data-slot="feature-mosaic-title"
      className={cn(
        "max-w-2xl text-balance text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureMosaicDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(function FeatureMosaicDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="feature-mosaic-description"
      className={cn(
        "mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureMosaicHeading = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function FeatureMosaicHeading({ className, children, ...props }, ref) {
  const { title, description } = useFeatureMosaic();
  return (
    <div
      ref={ref}
      data-slot="feature-mosaic-heading"
      className={cn("mb-8 md:mb-12", className)}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <FeatureMosaicTitle>{title}</FeatureMosaicTitle>
          <FeatureMosaicDescription>{description}</FeatureMosaicDescription>
        </>
      )}
    </div>
  );
});
export const FeatureMosaicGrid = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function FeatureMosaicGrid({ className, children, ...props }, ref) {
  const { items } = useFeatureMosaic();
  return (
    <div
      ref={ref}
      data-slot="feature-mosaic-grid"
      className={cn(
        "grid overflow-hidden rounded-[14px] border border-border bg-muted md:grid-cols-12",
        className,
      )}
      {...props}
    >
      {children !== undefined
        ? children
        : items.map((item, index) =>
            index === 0 ? (
              <FeatureMosaicLead key={index} item={item} />
            ) : (
              <FeatureMosaicCard key={index} item={item} />
            ),
          )}
    </div>
  );
});
export const FeatureMosaicLead = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { item?: FeatureMosaicItem }
>(function FeatureMosaicLead({ item, className, children, ...props }, ref) {
  const Icon = item?.icon ?? Sparkles;
  return (
    <div
      ref={ref}
      data-slot="feature-mosaic-lead"
      className={cn(
        "relative min-h-80 overflow-hidden bg-primary p-6 text-primary-foreground md:col-span-7 md:p-9",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div className="relative z-10 flex size-10 items-center justify-center rounded-full bg-primary-foreground/15">
            <Icon size={19} />
          </div>
          <div className="relative z-10 mt-16 max-w-sm">
            <p className="text-2xl leading-tight tracking-[-0.03em] md:text-4xl">
              {item?.title}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
              {item?.description}
            </p>
          </div>
          <div
            aria-hidden
            className="absolute -right-10 -top-10 size-64 rounded-full border-[28px] border-primary-foreground/10"
          />
          <div
            aria-hidden
            className="absolute bottom-8 right-8 grid size-28 place-items-center rounded-full border border-primary-foreground/20 text-center text-xs font-medium uppercase tracking-[0.18em]"
          >
            Make
            <br />
            room
          </div>
        </>
      )}
    </div>
  );
});
export const FeatureMosaicCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { item?: FeatureMosaicItem }
>(function FeatureMosaicCard({ item, className, children, ...props }, ref) {
  const Icon = item?.icon ?? CheckCircle2;
  return (
    <div
      ref={ref}
      data-slot="feature-mosaic-card"
      className={cn(
        "group relative min-h-64 border-t border-border bg-background p-6 md:col-span-5 md:border-l md:border-t-0 md:p-8 [&+&]:md:col-span-5 [&+&]:md:border-l-0 [&+&]:md:border-t",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div className="flex items-start justify-between">
            <span className="grid size-9 place-items-center rounded-full bg-muted">
              <Icon size={17} />
            </span>
            <ArrowUpRight
              size={17}
              className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
          <div className="mt-7 rounded-lg border border-border bg-muted/55 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Release brief</span>
              <span className="rounded-full bg-background px-2 py-1 text-muted-foreground">
                Updated
              </span>
            </div>
            <div className="mt-3 h-1.5 w-4/5 rounded-full bg-border" />
            <div className="mt-2 h-1.5 w-3/5 rounded-full bg-border" />
          </div>
          <div className="mt-5">
            <h3 className="text-xl tracking-[-0.03em]">{item?.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {item?.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
});

FeatureMosaic.displayName = "FeatureMosaic";
