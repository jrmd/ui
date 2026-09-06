"use client";
import * as React from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";

export type FeatureCarouselItemData = {
  value: string;
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  detail?: React.ReactNode;
  preview?: React.ReactNode;
  href?: string;
  actionLabel?: React.ReactNode;
  onAction?: () => void;
};

export const FeatureCarouselDefaultItems: FeatureCarouselItemData[] = [
  {
    value: "brief",
    label: "Shared context",
    title: "The brief stays beside the work.",
    description:
      "Give every decision a home, so people arrive with the context they need instead of a trail of links.",
    detail: "Briefs · decisions · release criteria",
  },
  {
    value: "review",
    label: "Clear review",
    title: "Review work while it still has momentum.",
    description:
      "Collect a useful response in the place the work happened, then turn it into a visible next step.",
    detail: "Comments · requests · approvals",
  },
  {
    value: "release",
    label: "Confident release",
    title: "Know what changed before you ship.",
    description:
      "A compact handoff connects the final decision, owner, and release note without another status meeting.",
    detail: "Owners · handoffs · launch notes",
  },
];

type FeatureCarouselState = {
  items: FeatureCarouselItemData[];
  active: string;
  setActive: (value: string) => void;
  layout: "spotlight" | "rail";
  id: string;
};
const Context = React.createContext<FeatureCarouselState | null>(null);
function useFeatureCarousel() {
  const context = React.useContext(Context);
  if (!context)
    throw new Error("FeatureCarousel parts must be inside FeatureCarousel.");
  return context;
}

export type FeatureCarouselProps = Omit<
  React.ComponentProps<"section">,
  "value" | "defaultValue" | "onValueChange"
> & {
  items?: FeatureCarouselItemData[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  layout?: "spotlight" | "rail";
};
export function FeatureCarousel({
  items = FeatureCarouselDefaultItems,
  value,
  defaultValue,
  onValueChange,
  layout = "spotlight",
  children,
  className,
  ...props
}: FeatureCarouselProps) {
  const first = items[0]?.value ?? "";
  const [selected, setSelected] = useControllable(
    value,
    defaultValue ?? first,
    onValueChange,
  );
  const active = items.some((item) => item.value === selected)
    ? selected
    : first;
  return (
    <Context.Provider
      value={{
        items,
        active,
        setActive: setSelected,
        layout,
        id: React.useId(),
      }}
    >
      <section
        {...props}
        aria-roledescription={props["aria-roledescription"] ?? "carousel"}
        className={cn(
          "overflow-hidden rounded-[14px] border border-border bg-background",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <FeatureCarouselHeader />
            <FeatureCarouselSlides />
            {layout === "spotlight" && <FeatureCarouselControls />}
          </>
        )}
      </section>
    </Context.Provider>
  );
}

export const FeatureCarouselHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FeatureCarouselHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="feature-carousel-header"
      className={cn(
        "flex items-center justify-between gap-5 border-b border-border px-6 py-5",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureCarouselTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(function FeatureCarouselTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      data-slot="feature-carousel-title"
      className={cn(
        "max-w-xl text-3xl tracking-[-0.035em] md:text-4xl",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureCarouselDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function FeatureCarouselDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="feature-carousel-description"
      className={cn(
        "mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FeatureCarouselContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="feature-carousel-content"
      className={cn("overflow-hidden", className)}
      {...props}
    />
  );
});
export const FeatureCarouselSlide = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"article">
>(function FeatureCarouselSlide({ className, ...props }, ref) {
  return (
    <article
      ref={ref}
      data-slot="feature-carousel-slide"
      className={cn("grid min-w-full md:grid-cols-[.92fr_1.08fr]", className)}
      {...props}
    />
  );
});

export function FeatureCarouselHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FeatureCarouselHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <FeatureCarouselHeader {...props}>
      {children !== undefined ? (
        children
      ) : (
        <div>
          <FeatureCarouselTitle>
            Make each handoff easier to understand.
          </FeatureCarouselTitle>
          <FeatureCarouselDescription>
            Three focused moments keep the project legible from first thought to
            launch.
          </FeatureCarouselDescription>
        </div>
      )}
    </FeatureCarouselHeader>
  );
}
export function FeatureCarouselSlides({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FeatureCarouselContent>> & {
  children?: React.ReactNode;
}) {
  const { items, active, setActive, layout, id } = useFeatureCarousel();
  const index = Math.max(
    0,
    items.findIndex((item) => item.value === active),
  );
  if (children !== undefined)
    return (
      <FeatureCarouselContent {...props}>{children}</FeatureCarouselContent>
    );
  if (layout === "rail")
    return (
      <FeatureCarouselContent {...props}>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-5 [scrollbar-width:thin] md:px-7 md:py-7">
          {items.map((item, itemIndex) => (
            <button
              type="button"
              key={item.value}
              id={`${id}-${item.value}-rail-card`}
              aria-pressed={item.value === active}
              onClick={() => {
                setActive(item.value);
                document
                  .getElementById(`${id}-${item.value}-rail-card`)
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
              }}
              className={cn(
                "group min-h-64 w-[82%] shrink-0 snap-center rounded-xl border p-5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary sm:w-[52%] lg:w-[31%]",
                item.value === active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted hover:bg-background",
              )}
            >
              <span className="flex items-center justify-between text-xs">
                <span>{item.label}</span>
                <span>0{itemIndex + 1}</span>
              </span>
              <span className="mt-10 block text-2xl leading-tight tracking-[-.035em]">
                {item.title}
              </span>
              <span
                className={cn(
                  "mt-5 block text-sm leading-relaxed",
                  item.value === active
                    ? "text-primary-foreground/75"
                    : "text-muted-foreground",
                )}
              >
                {item.description}
              </span>
            </button>
          ))}
        </div>
        <div
          id={`${id}-rail-panel`}
          role="region"
          aria-label="Selected feature"
          className="border-t border-border px-5 py-5 md:px-7"
        >
          {items.find((item) => item.value === active)?.detail}
        </div>
      </FeatureCarouselContent>
    );
  return (
    <FeatureCarouselContent {...props}>
      <div
        className="flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((item, itemIndex) => (
          <FeatureCarouselSlide
            key={item.value}
            id={`${id}-${item.value}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-${item.value}-tab`}
            aria-hidden={item.value !== active}
            inert={item.value !== active}
          >
            <div className="flex min-h-72 flex-col justify-between bg-muted p-7 md:min-h-[25rem] md:p-10">
              <div className="flex items-center justify-between text-xs font-medium">
                <span>{item.label}</span>
                <span className="rounded-full border border-foreground/15 px-2 py-1">
                  0{itemIndex + 1} / 0{items.length}
                </span>
              </div>
              <div className="mt-10 rounded-lg border border-border bg-background p-5 text-foreground shadow-[0_14px_32px_rgb(0_0_0_/_0.08)]">
                <div className="flex items-center justify-between border-b border-border pb-4 text-xs">
                  <span className="font-medium">Project record</span>
                  <span className="text-muted-foreground">In review</span>
                </div>
                <p className="mt-7 text-xl tracking-[-.025em]">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                <div className="mt-7 flex items-center gap-2 border-t border-border pt-4 text-xs">
                  <span className="size-2 rounded-full bg-primary" />
                  Decision recorded
                </div>
                {item.preview}
              </div>
            </div>
            <div className="flex min-h-72 flex-col justify-between p-7 md:min-h-[25rem] md:p-10">
              <div>
                <p className="text-xs font-medium text-primary">{item.label}</p>
                <h3 className="mt-5 max-w-lg text-3xl leading-[1.05] tracking-[-0.035em] md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-5 text-xs">
                <span className="text-muted-foreground">{item.detail}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 font-medium hover:text-primary"
                  >
                    {item.actionLabel ?? "Explore"} <ArrowUpRight size={15} />
                  </a>
                ) : item.onAction ? (
                  <button
                    type="button"
                    onClick={item.onAction}
                    className="inline-flex items-center gap-2 font-medium hover:text-primary"
                  >
                    {item.actionLabel ?? "Explore"} <ArrowUpRight size={15} />
                  </button>
                ) : null}
              </div>
            </div>
          </FeatureCarouselSlide>
        ))}
      </div>
    </FeatureCarouselContent>
  );
}
export function FeatureCarouselControls({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { items, active, setActive, id, layout } = useFeatureCarousel();
  const index = Math.max(
    0,
    items.findIndex((item) => item.value === active),
  );
  const select = (nextValue: string, focus = false) => {
    setActive(nextValue);
    if (layout === "rail") {
      document
        .getElementById(`${id}-${nextValue}-rail-card`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
    } else if (focus) {
      document.getElementById(`${id}-${nextValue}-tab`)?.focus();
    }
  };
  const move = (delta: number, focus = false) =>
    select(
      items[(index + delta + items.length) % items.length]?.value ?? active,
      focus,
    );
  return (
    <div
      {...props}
      data-slot="feature-carousel-controls"
      className={cn(
        "flex items-center justify-between gap-4 border-t border-border px-6 py-4",
        props.className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          {layout === "spotlight" && (
            <div
              className="flex gap-1"
              role="tablist"
              aria-label="Feature slides"
            >
              {items.map((item, itemIndex) => (
                <button
                  type="button"
                  key={item.value}
                  id={`${id}-${item.value}-tab`}
                  role="tab"
                  aria-selected={item.value === active}
                  aria-controls={`${id}-${item.value}-panel`}
                  tabIndex={item.value === active ? 0 : -1}
                  aria-label={`Show feature ${itemIndex + 1}`}
                  onClick={() => select(item.value)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      move(1, true);
                    } else if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      move(-1, true);
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      select(items[0]?.value ?? active, true);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      select(items[items.length - 1]?.value ?? active, true);
                    }
                  }}
                  className="group grid size-9 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span
                    className={cn(
                      "h-1 rounded-full transition-all motion-reduce:transition-none",
                      itemIndex === index
                        ? "w-6 bg-primary"
                        : "w-2 bg-border group-hover:bg-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous feature"
              onClick={() => move(-1)}
              disabled={items.length < 2}
              className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted disabled:opacity-40"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next feature"
              onClick={() => move(1)}
              disabled={items.length < 2}
              className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted disabled:opacity-40"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
