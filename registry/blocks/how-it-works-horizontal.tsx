"use client";

import * as React from "react";
import { ArrowUpRight, Check, FileText, UsersRound } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "../ui/utils";

export type HowItWorksHorizontalStepData = {
  number: string;
  title: React.ReactNode;
  description: React.ReactNode;
  media?: React.ReactNode;
  preview?: "brief" | "invite" | "decision";
  icon?: React.ElementType<{ size?: number; strokeWidth?: number }>;
};

const defaultSteps: HowItWorksHorizontalStepData[] = [
  {
    number: "01",
    title: "Frame the work",
    description:
      "Bring the brief, constraints, and reference material into one shared starting point.",
    preview: "brief",
    icon: FileText,
  },
  {
    number: "02",
    title: "Invite the right people",
    description:
      "Give collaborators the context they need before the conversation begins.",
    preview: "invite",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Move with confidence",
    description:
      "Record the decision, make the next move, and keep progress visible.",
    preview: "decision",
    icon: Check,
  },
];

export type HowItWorksHorizontalOptions = {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  steps?: HowItWorksHorizontalStepData[];
};
export type HowItWorksHorizontalProps = Omit<
  React.ComponentProps<"section">,
  keyof HowItWorksHorizontalOptions
> &
  HowItWorksHorizontalOptions;

function useHowItWorksHorizontalModel({
  eyebrow,
  title = "From first thought to a useful next step.",
  description = "A simple rhythm gives every project enough shape to start, enough room to change, and a visible way to finish.",
  steps = defaultSteps,
  children,
  className,
  ...rootProps
}: HowItWorksHorizontalProps) {
  return { eyebrow, title, description, steps, children, className, rootProps };
}
const HowItWorksHorizontalContext = React.createContext<ReturnType<
  typeof useHowItWorksHorizontalModel
> | null>(null);
function useHowItWorksHorizontal() {
  const context = React.useContext(HowItWorksHorizontalContext);
  if (!context)
    throw new Error(
      "HowItWorksHorizontal parts must be inside HowItWorksHorizontal.",
    );
  return context;
}

export const HowItWorksHorizontal = React.forwardRef<
  HTMLElement,
  HowItWorksHorizontalProps
>(function HowItWorksHorizontal(props, ref) {
  const model = useHowItWorksHorizontalModel(props);
  const { children, className, rootProps } = model;
  return (
    <HowItWorksHorizontalContext.Provider value={model}>
      <section
        ref={ref}
        data-slot="how-it-works-horizontal"
        {...rootProps}
        className={cn("border-y border-border py-14 md:py-24", className)}
      >
        {children === undefined ? (
          <>
            <HowItWorksHorizontalHeaderContent />
            <HowItWorksHorizontalSteps />
          </>
        ) : (
          children
        )}
      </section>
    </HowItWorksHorizontalContext.Provider>
  );
});

export function HowItWorksHorizontalHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="how-it-works-horizontal-header"
      className={cn("max-w-2xl", className)}
      {...props}
    />
  );
}
export function HowItWorksHorizontalEyebrow({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-horizontal-eyebrow"
      className={cn(
        "text-xs font-medium uppercase tracking-[0.14em] text-primary",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="how-it-works-horizontal-title"
      className={cn(
        "mt-4 text-4xl leading-[1.04] tracking-[-0.04em] md:text-5xl",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-horizontal-description"
      className={cn(
        "mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalSteps({
  children,
  className,
  ...props
}: React.ComponentProps<"ol">) {
  const { steps } = useHowItWorksHorizontal();
  return (
    <ol
      data-slot="how-it-works-horizontal-steps"
      className={cn(
        "mt-12 grid gap-0 border-t border-border md:mt-16 md:grid-cols-3",
        className,
      )}
      {...props}
    >
      {children === undefined
        ? steps.map((step, index) => (
            <HowItWorksHorizontalStep key={`${step.number}-${index}`}>
              <HowItWorksHorizontalStepNumber>
                {step.number}
              </HowItWorksHorizontalStepNumber>
              <HowItWorksHorizontalStepIcon icon={step.icon} />
              <HowItWorksHorizontalStepTitle>
                {step.title}
              </HowItWorksHorizontalStepTitle>
              <HowItWorksHorizontalStepDescription>
                {step.description}
              </HowItWorksHorizontalStepDescription>
              <HowItWorksHorizontalStepMedia variant={step.preview}>
                {step.media}
              </HowItWorksHorizontalStepMedia>
              {index < steps.length - 1 ? (
                <HowItWorksHorizontalConnector />
              ) : null}
            </HowItWorksHorizontalStep>
          ))
        : children}
    </ol>
  );
}
export function HowItWorksHorizontalStep({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="how-it-works-horizontal-step"
      className={cn(
        "relative border-b border-border py-7 last:border-b-0 md:border-b-0 md:px-8 md:py-8 md:first:pl-0 md:last:pr-0",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalStepNumber({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="how-it-works-horizontal-step-number"
      className={cn(
        "text-xs font-medium tabular-nums text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalStepIcon({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  icon?: React.ElementType<{ size?: number; strokeWidth?: number }>;
}) {
  return (
    <span
      aria-hidden="true"
      data-slot="how-it-works-horizontal-step-icon"
      className={cn(
        "mt-7 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      {Icon ? <Icon size={17} strokeWidth={1.8} /> : null}
    </span>
  );
}
export function HowItWorksHorizontalStepTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="how-it-works-horizontal-step-title"
      className={cn("mt-7 text-xl tracking-tight", className)}
      {...props}
    />
  );
}
export function HowItWorksHorizontalStepDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-horizontal-step-description"
      className={cn(
        "mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalStepMedia({
  variant = "brief",
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "brief" | "invite" | "decision";
}) {
  return (
    <div
      data-slot="how-it-works-horizontal-step-media"
      className={cn(
        "mt-7 min-h-40 overflow-hidden rounded-lg border border-border bg-muted p-4",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : variant === "brief" ? (
        <div className="rounded-md border border-border bg-background p-3">
          <div className="flex items-center justify-between border-b border-border pb-2 text-xs font-medium">
            <span>Project brief</span>
            <span className="text-primary">Draft</span>
          </div>
          <div className="mt-4 h-2 w-4/5 rounded-full bg-foreground/15" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-foreground/8" />
          <div className="mt-5 flex gap-1.5">
            <span className="h-5 w-10 rounded bg-primary/15" />
            <span className="h-5 w-14 rounded bg-primary/10" />
          </div>
        </div>
      ) : variant === "invite" ? (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium">
            <span>Share the context</span>
            <span className="rounded-full bg-primary px-2 py-1 text-primary-foreground">
              Invite
            </span>
          </div>
          <div className="mt-6 flex -space-x-2">
            {["LM", "AP", "NK"].map((initials, index) => (
              <span
                key={initials}
                className={cn(
                  "grid size-9 place-items-center rounded-full border-2 border-muted text-xs font-medium",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-background",
                )}
              >
                {initials}
              </span>
            ))}
            <span className="grid size-9 place-items-center rounded-full border-2 border-muted bg-background text-xs text-muted-foreground">
              +2
            </span>
          </div>
          <p className="mt-5 border-t border-border pt-3 text-xs text-muted-foreground">
            5 people can see this decision
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between rounded-md bg-primary p-4 text-primary-foreground">
          <div className="flex items-center justify-between text-xs font-medium">
            <span>Decision recorded</span>
            <Check size={14} />
          </div>
          <p className="mt-7 text-sm leading-snug">
            Ship the focused project overview.
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-primary-foreground/20 pt-3 text-xs text-primary-foreground/70">
            <span>Next: release review</span>
            <span>Today</span>
          </div>
        </div>
      )}
    </div>
  );
}
export function HowItWorksHorizontalConnector({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="how-it-works-horizontal-connector"
      className={cn(
        "absolute right-0 top-8 hidden h-px w-5 bg-border md:block",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksHorizontalHeaderContent({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HowItWorksHorizontalHeader>> & {
  children?: React.ReactNode;
}) {
  const { eyebrow, title, description } = useHowItWorksHorizontal();
  return (
    <HowItWorksHorizontalHeader {...props}>
      {children === undefined ? (
        <>
          {eyebrow ? (
            <HowItWorksHorizontalEyebrow>{eyebrow}</HowItWorksHorizontalEyebrow>
          ) : null}
          <HowItWorksHorizontalTitle>{title}</HowItWorksHorizontalTitle>
          <HowItWorksHorizontalDescription>
            {description}
          </HowItWorksHorizontalDescription>
        </>
      ) : (
        children
      )}
    </HowItWorksHorizontalHeader>
  );
}
export function HowItWorksHorizontalAction({
  asChild,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="how-it-works-horizontal-action"
      className={cn(
        "mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </Comp>
  );
}
