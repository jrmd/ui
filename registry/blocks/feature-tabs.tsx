"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";

export type FeatureTabData = {
  value: string;
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  outcomes: React.ReactNode[];
  preview?: React.ReactNode;
};
export const FeatureTabsDefaultItems: FeatureTabData[] = [
  {
    value: "plan",
    label: "Plan",
    title: "Make the next move obvious.",
    description:
      "Turn an unformed request into a brief that has a decision, owner, and release boundary.",
    outcomes: [
      "Context stays with the work",
      "Everyone sees the current decision",
      "Scope has a visible home",
    ],
  },
  {
    value: "build",
    label: "Build",
    title: "Keep the work connected as it changes.",
    description:
      "Shape feedback where the task lives and preserve the useful reason behind each adjustment.",
    outcomes: [
      "Useful feedback stays actionable",
      "Handoffs carry their history",
      "Progress is easy to scan",
    ],
  },
  {
    value: "ship",
    label: "Ship",
    title: "Release with a record people can trust.",
    description:
      "Turn the final review into a concise handoff that answers what changed and what happens next.",
    outcomes: [
      "Owners are clear",
      "Release notes write themselves",
      "Nothing important gets lost",
    ],
  },
];
type State = {
  items: FeatureTabData[];
  value: string;
  setValue: (value: string) => void;
  id: string;
};
const Context = React.createContext<State | null>(null);
function useFeatureTabs() {
  const context = React.useContext(Context);
  if (!context)
    throw new Error("FeatureTabs parts must be inside FeatureTabs.");
  return context;
}
export type FeatureTabsProps = Omit<
  React.ComponentProps<"section">,
  "value" | "defaultValue" | "onValueChange"
> & {
  items?: FeatureTabData[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export function FeatureTabs({
  items = FeatureTabsDefaultItems,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}: FeatureTabsProps) {
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
      value={{ items, value: active, setValue: setSelected, id: React.useId() }}
    >
      <section {...props} className={cn("py-12 md:py-20", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <FeatureTabsHeader />
            <FeatureTabsList />
            <FeatureTabsPanels />
          </>
        )}
      </section>
    </Context.Provider>
  );
}
export const FeatureTabsTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(function FeatureTabsTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      data-slot="feature-tabs-title"
      className={cn(
        "max-w-2xl text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureTabsDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function FeatureTabsDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="feature-tabs-description"
      className={cn(
        "mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureTabsListRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FeatureTabsListRoot({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="feature-tabs-list"
      role="tablist"
      aria-label="Product capabilities"
      className={cn(
        "mt-10 flex overflow-x-auto border-b border-border",
        className,
      )}
      {...props}
    />
  );
});
export const FeatureTabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { value: string }
>(function FeatureTabsTrigger(
  { value, className, onClick, onKeyDown, children, ...props },
  ref,
) {
  const { items, value: selected, setValue, id } = useFeatureTabs();
  const index = items.findIndex((item) => item.value === value);
  const selectAndFocus = (nextValue: string) => {
    setValue(nextValue);
    document.getElementById(`${id}-${nextValue}-tab`)?.focus();
  };
  const move = (delta: number) => {
    const next = items[(index + delta + items.length) % items.length];
    if (next) selectAndFocus(next.value);
  };
  return (
    <button
      ref={ref}
      id={`${id}-${value}-tab`}
      type="button"
      role="tab"
      aria-selected={selected === value}
      aria-controls={`${id}-${value}-panel`}
      tabIndex={selected === value ? 0 : -1}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setValue(value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "Home") {
          event.preventDefault();
          selectAndFocus(items[0]?.value ?? value);
        }
        if (event.key === "End") {
          event.preventDefault();
          selectAndFocus(items[items.length - 1]?.value ?? value);
        }
      }}
      data-slot="feature-tabs-trigger"
      className={cn(
        "shrink-0 border-b-2 border-transparent px-5 py-4 text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:border-primary data-[state=active]:text-primary",
        className,
      )}
      data-state={selected === value ? "active" : "inactive"}
      {...props}
    >
      {children}
    </button>
  );
});
export const FeatureTabsPanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { value: string }
>(function FeatureTabsPanel({ value, className, ...props }, ref) {
  const { value: selected, id } = useFeatureTabs();
  return (
    <div
      ref={ref}
      id={`${id}-${value}-panel`}
      role="tabpanel"
      aria-labelledby={`${id}-${value}-tab`}
      hidden={selected !== value}
      data-slot="feature-tabs-panel"
      className={cn("pt-10", className)}
      {...props}
    />
  );
});
export function FeatureTabsHeader({
  children,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn(
        "grid gap-5 md:grid-cols-[1.2fr_.8fr] md:items-end",
        props.className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <FeatureTabsTitle>
            Three moments. One clear way to move work forward.
          </FeatureTabsTitle>
          <FeatureTabsDescription>
            Choose a stage to inspect the work it makes easier for a team to do.
          </FeatureTabsDescription>
        </>
      )}
    </header>
  );
}
export function FeatureTabsList({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FeatureTabsListRoot>> & {
  children?: React.ReactNode;
}) {
  const { items } = useFeatureTabs();
  return (
    <FeatureTabsListRoot {...props}>
      {children !== undefined
        ? children
        : items.map((item) => (
            <FeatureTabsTrigger key={item.value} value={item.value}>
              {item.label}
            </FeatureTabsTrigger>
          ))}
    </FeatureTabsListRoot>
  );
}
export function FeatureTabsPanels({
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { items } = useFeatureTabs();
  return (
    <div {...props} data-slot="feature-tabs-panels">
      {children !== undefined
        ? children
        : items.map((item) => (
            <FeatureTabsPanel key={item.value} value={item.value}>
              <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
                <div>
                  <h3 className="max-w-md text-3xl leading-[1.05] tracking-[-0.035em] md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-7 space-y-3 text-sm">
                    {item.outcomes.map((outcome, index) => (
                      <li key={index} className="flex gap-3">
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-h-72 rounded-xl border border-border bg-muted p-5 md:min-h-96 md:p-7">
                  <div className="flex justify-between border-b border-border pb-4 text-xs">
                    <span>Project overview</span>
                    <span className="text-muted-foreground">Updated now</span>
                  </div>
                  <div className="mt-7 rounded-lg bg-background p-5 shadow-[0_14px_32px_rgb(0_0_0_/_0.08)]">
                    <p className="text-xs text-muted-foreground">
                      Current decision
                    </p>
                    <p className="mt-3 text-xl tracking-[-0.025em]">
                      {item.title}
                    </p>
                    <div className="mt-7 border-t border-border pt-4 text-xs text-muted-foreground">
                      {item.outcomes[0]}
                    </div>
                  </div>
                  {item.preview}
                </div>
              </div>
            </FeatureTabsPanel>
          ))}
    </div>
  );
}
