"use client";
import * as React from "react";
import { ArrowUpRight, ChevronDown, CircleCheck } from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";

export type ExpandableFeatureData = {
  value: string;
  title: React.ReactNode;
  description: React.ReactNode;
  points: React.ReactNode[];
  preview?: React.ReactNode;
};
export const ExpandableFeaturesDefaultItems: ExpandableFeatureData[] = [
  {
    value: "capture",
    title: "Capture the decision while it is fresh.",
    description:
      "A useful project record makes the next conversation shorter and more certain.",
    points: [
      "Write the why, not only the request",
      "Attach the decision to its work",
      "Keep the release rule visible",
    ],
  },
  {
    value: "shape",
    title: "Shape work into a clear next move.",
    description:
      "Bring the brief, response, and owner into one surface that people can actually use.",
    points: [
      "Turn feedback into a named action",
      "Make the current owner obvious",
      "Keep scope changes in context",
    ],
  },
  {
    value: "ship",
    title: "Ship with the full story in view.",
    description:
      "The final handoff should tell a teammate what changed and what deserves attention next.",
    points: [
      "Summarise the change",
      "Link the decision behind it",
      "Leave a useful release note",
    ],
  },
];
type State = {
  items: ExpandableFeatureData[];
  value: string;
  setValue: (value: string) => void;
  id: string;
};
const Context = React.createContext<State | null>(null);
function useExpandableFeatures() {
  const context = React.useContext(Context);
  if (!context)
    throw new Error(
      "ExpandableFeatures parts must be inside ExpandableFeatures.",
    );
  return context;
}
export type ExpandableFeaturesProps = Omit<
  React.ComponentProps<"section">,
  "value" | "defaultValue" | "onValueChange"
> & {
  items?: ExpandableFeatureData[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export function ExpandableFeatures({
  items = ExpandableFeaturesDefaultItems,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}: ExpandableFeaturesProps) {
  const first = items[0]?.value ?? "";
  const [selected, setSelected] = useControllable(
    value,
    defaultValue ?? first,
    onValueChange,
  );
  const active = items.some((item) => item.value === selected)
    ? selected
    : first;
  const id = React.useId();
  return (
    <Context.Provider
      value={{ items, value: active, setValue: setSelected, id }}
    >
      <section
        {...props}
        className={cn("border-y border-border py-12 md:py-20", className)}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <ExpandableFeaturesHeader />
            <ExpandableFeaturesLayout />
          </>
        )}
      </section>
    </Context.Provider>
  );
}
export const ExpandableFeaturesTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(function ExpandableFeaturesTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      data-slot="expandable-features-title"
      className={cn(
        "max-w-xl text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl",
        className,
      )}
      {...props}
    />
  );
});
export const ExpandableFeaturesDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function ExpandableFeaturesDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="expandable-features-description"
      className={cn(
        "max-w-md text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
export const ExpandableFeaturesList = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ExpandableFeaturesList({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="expandable-features-list"
      className={cn("border-t border-border", className)}
      {...props}
    />
  );
});
export const ExpandableFeaturesItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { value: string }
>(function ExpandableFeaturesItem({ value, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="expandable-features-item"
      data-state={useExpandableFeatures().value === value ? "open" : "closed"}
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
});
export const ExpandableFeaturesTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { value: string }
>(function ExpandableFeaturesTrigger(
  { value, className, onClick, children, ...props },
  ref,
) {
  const { value: selected, setValue, id } = useExpandableFeatures();
  const open = selected === value;
  return (
    <button
      ref={ref}
      type="button"
      id={`${id}-${value}-trigger`}
      aria-expanded={open}
      aria-controls={`${id}-${value}-panel`}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      data-slot="expandable-features-trigger"
      className={cn(
        "flex w-full items-center justify-between gap-4 py-5 text-left text-xl tracking-[-0.025em] outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        size={18}
        aria-hidden
        className={cn(
          "shrink-0 transition-transform motion-reduce:transition-none",
          open && "rotate-180",
        )}
      />
    </button>
  );
});
export const ExpandableFeaturesPanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { value: string }
>(function ExpandableFeaturesPanel({ value, className, ...props }, ref) {
  const { value: selected, id } = useExpandableFeatures();
  return (
    <div
      ref={ref}
      id={`${id}-${value}-panel`}
      role="region"
      aria-labelledby={`${id}-${value}-trigger`}
      hidden={selected !== value}
      data-slot="expandable-features-panel"
      className={cn("pb-6", className)}
      {...props}
    />
  );
});
export const ExpandableFeaturesPreview = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ExpandableFeaturesPreview({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="expandable-features-preview"
      className={cn(
        "relative min-h-80 overflow-hidden rounded-xl bg-primary p-6 text-primary-foreground md:min-h-[31rem] md:p-8",
        className,
      )}
      {...props}
    />
  );
});
export function ExpandableFeaturesHeader({
  children,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn(
        "grid gap-6 pb-10 md:grid-cols-[1fr_.72fr] md:items-end md:pb-14",
        props.className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <ExpandableFeaturesTitle>
            Build clarity into every part of the work.
          </ExpandableFeaturesTitle>
          <ExpandableFeaturesDescription>
            Open a feature to see the detail people need when they enter, shape,
            and release a project.
          </ExpandableFeaturesDescription>
        </>
      )}
    </header>
  );
}
export function ExpandableFeaturesLayout({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { items, value, setValue, id } = useExpandableFeatures();
  const selectAndFocus = (nextValue: string) => {
    setValue(nextValue);
    document.getElementById(`${id}-${nextValue}-desktop-tab`)?.focus();
  };
  return (
    <div
      {...props}
      data-slot="expandable-features-layout"
      className={cn("mt-2", props.className)}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div
            className="hidden gap-3 md:flex"
            role="tablist"
            aria-label="Feature details"
          >
            {items.map((item, index) => {
              const selected = item.value === value;
              return (
                <button
                  key={item.value}
                  id={`${id}-${item.value}-desktop-tab`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${id}-desktop-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setValue(item.value)}
                  onFocus={() => setValue(item.value)}
                  onKeyDown={(event) => {
                    const position = items.findIndex(
                      (entry) => entry.value === item.value,
                    );
                    if (event.key === "ArrowRight") {
                      event.preventDefault();
                      selectAndFocus(
                        items[(position + 1) % items.length]?.value ??
                          item.value,
                      );
                    } else if (event.key === "ArrowLeft") {
                      event.preventDefault();
                      selectAndFocus(
                        items[(position - 1 + items.length) % items.length]
                          ?.value ?? item.value,
                      );
                    } else if (event.key === "Home") {
                      event.preventDefault();
                      selectAndFocus(items[0]?.value ?? item.value);
                    } else if (event.key === "End") {
                      event.preventDefault();
                      selectAndFocus(
                        items[items.length - 1]?.value ?? item.value,
                      );
                    }
                  }}
                  className={cn(
                    "group relative min-h-[31rem] overflow-hidden rounded-xl bg-primary text-left text-primary-foreground outline-none transition-[flex,filter] duration-500 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 motion-reduce:transition-none",
                    selected ? "flex-[2.35]" : "flex-1 hover:flex-[1.18]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,.2),transparent_48%),linear-gradient(0deg,rgba(0,0,0,.3),transparent_42%)]",
                      !selected && "opacity-80",
                    )}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-5 top-5 h-px bg-white/30"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-5 top-8 text-7xl font-medium tracking-[-.08em] text-white/15 transition-transform duration-500",
                      selected && "translate-x-3 translate-y-2",
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span className="absolute inset-x-5 bottom-5">
                    <span
                      className={cn(
                        "mb-3 block max-w-sm text-sm leading-relaxed text-primary-foreground/75 transition-all duration-300",
                        selected
                          ? "translate-y-0 opacity-100"
                          : "translate-y-3 opacity-0",
                      )}
                    >
                      {item.description}
                    </span>
                    <span className="flex items-end justify-between gap-3">
                      <span
                        className={cn(
                          "block max-w-xs text-xl leading-tight tracking-[-.03em]",
                          !selected && "[writing-mode:vertical-rl]",
                        )}
                      >
                        {item.title}
                      </span>
                      <ArrowUpRight size={18} className="shrink-0" />
                    </span>
                  </span>
                  {selected && (
                    <span className="absolute right-5 top-24 lg:bottom-5 lg:top-auto w-[min(14rem,58%)] rounded-lg bg-background p-4 text-foreground shadow-[0_18px_40px_rgb(0_0_0_/_0.18)]">
                      <span className="flex items-center gap-2 text-xs font-medium">
                        <CircleCheck size={15} className="text-primary" />
                        {item.points[0]}
                      </span>
                    </span>
                  )}
                  {item.preview}
                </button>
              );
            })}
          </div>
          <div
            id={`${id}-desktop-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-${value}-desktop-tab`}
            className="hidden md:grid md:grid-cols-3 md:gap-3"
          >
            {items.map((item) => (
              <p
                key={item.value}
                className={cn(
                  "pt-4 text-sm leading-relaxed text-muted-foreground",
                  item.value === value ? "col-span-2 max-w-xl" : "opacity-0",
                )}
              >
                {item.value === value
                  ? "Select a panel to follow the path from a captured decision to a confident release."
                  : " "}
              </p>
            ))}
          </div>
          <div className="md:hidden">
            <ExpandableFeaturesList>
              {items.map((item) => (
                <ExpandableFeaturesItem key={item.value} value={item.value}>
                  <ExpandableFeaturesTrigger value={item.value}>
                    {item.title}
                  </ExpandableFeaturesTrigger>
                  <ExpandableFeaturesPanel value={item.value}>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-5 grid gap-3 text-sm">
                      {item.points.map((point, index) => (
                        <li key={index} className="flex gap-3">
                          <CircleCheck
                            size={17}
                            className="mt-0.5 shrink-0 text-primary"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </ExpandableFeaturesPanel>
                </ExpandableFeaturesItem>
              ))}
            </ExpandableFeaturesList>
          </div>
        </>
      )}
    </div>
  );
}
