"use client";

import * as React from "react";
import { Check, Compass, Sparkles } from "lucide-react";
import { cn } from "../ui/utils";

export type HowItWorksVerticalStepData = {
  number: string;
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  detail: React.ReactNode;
  media?: React.ReactNode;
  preview?: "brief" | "review" | "release";
  icon?: React.ElementType<{ size?: number; strokeWidth?: number }>;
};
const defaultSteps: HowItWorksVerticalStepData[] = [
  {
    number: "01",
    label: "Start with a signal",
    title: "Turn a loose thought into a shared brief.",
    description:
      "Add the context, references, and outcome that make the work worth doing. The first page becomes a useful place to return to.",
    detail: "Brief complete · 4 references attached",
    preview: "brief",
    icon: Compass,
  },
  {
    number: "02",
    label: "Make the work visible",
    title: "Give every decision a home beside the work.",
    description:
      "Keep the conversation, alternatives, and handoffs together so people can contribute without rebuilding the context from scratch.",
    detail: "Design direction · Approved by 3 people",
    preview: "review",
    icon: Sparkles,
  },
  {
    number: "03",
    label: "Close the loop",
    title: "Finish with a decision everyone can find.",
    description:
      "Capture what changed and where to go next. The result is a trail that makes the next project faster to begin.",
    detail: "Release note · Ready to share",
    preview: "release",
    icon: Check,
  },
];
export type HowItWorksVerticalOptions = {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  steps?: HowItWorksVerticalStepData[];
};
export type HowItWorksVerticalProps = Omit<
  React.ComponentProps<"section">,
  keyof HowItWorksVerticalOptions
> &
  HowItWorksVerticalOptions;
function useHowItWorksVerticalModel({
  eyebrow,
  title = "The work gets clearer as you move through it.",
  description = "A guided sequence for teams that want momentum without losing the thinking that got them there.",
  steps = defaultSteps,
  children,
  className,
  ...rootProps
}: HowItWorksVerticalProps) {
  return { eyebrow, title, description, steps, children, className, rootProps };
}
const HowItWorksVerticalContext = React.createContext<ReturnType<
  typeof useHowItWorksVerticalModel
> | null>(null);
function useHowItWorksVertical() {
  const context = React.useContext(HowItWorksVerticalContext);
  if (!context)
    throw new Error(
      "HowItWorksVertical parts must be inside HowItWorksVertical.",
    );
  return context;
}
export const HowItWorksVertical = React.forwardRef<
  HTMLElement,
  HowItWorksVerticalProps
>(function HowItWorksVertical(props, ref) {
  const model = useHowItWorksVerticalModel(props);
  const { children, className, rootProps } = model;
  return (
    <HowItWorksVerticalContext.Provider value={model}>
      <section
        ref={ref}
        data-slot="how-it-works-vertical"
        {...rootProps}
        className={cn("py-14 md:py-24", className)}
      >
        {children === undefined ? (
          <>
            <HowItWorksVerticalHeaderContent />
            <HowItWorksVerticalSteps />
          </>
        ) : (
          children
        )}
      </section>
    </HowItWorksVerticalContext.Provider>
  );
});
export function HowItWorksVerticalHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="how-it-works-vertical-header"
      className={cn(
        "max-w-2xl border-b border-border pb-10 md:pb-14",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalEyebrow({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-vertical-eyebrow"
      className={cn(
        "text-xs font-medium uppercase tracking-[0.14em] text-primary",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="how-it-works-vertical-title"
      className={cn(
        "mt-4 text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-vertical-description"
      className={cn(
        "mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalHeaderContent({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HowItWorksVerticalHeader>> & {
  children?: React.ReactNode;
}) {
  const { eyebrow, title, description } = useHowItWorksVertical();
  return (
    <HowItWorksVerticalHeader {...props}>
      {children === undefined ? (
        <>
          {eyebrow ? (
            <HowItWorksVerticalEyebrow>{eyebrow}</HowItWorksVerticalEyebrow>
          ) : null}
          <HowItWorksVerticalTitle>{title}</HowItWorksVerticalTitle>
          <HowItWorksVerticalDescription>
            {description}
          </HowItWorksVerticalDescription>
        </>
      ) : (
        children
      )}
    </HowItWorksVerticalHeader>
  );
}
export function HowItWorksVerticalSteps({
  children,
  className,
  ...props
}: React.ComponentProps<"ol">) {
  const { steps } = useHowItWorksVertical();
  return (
    <ol
      data-slot="how-it-works-vertical-steps"
      className={cn("mt-12 md:mt-20", className)}
      {...props}
    >
      {children === undefined
        ? steps.map((step, index) => (
            <HowItWorksVerticalStep key={`${step.number}-${index}`}>
              <HowItWorksVerticalStepCopy>
                <HowItWorksVerticalStepNumber>
                  {step.number}
                </HowItWorksVerticalStepNumber>
                <HowItWorksVerticalStepLabel>
                  {step.label}
                </HowItWorksVerticalStepLabel>
                <HowItWorksVerticalStepTitle>
                  {step.title}
                </HowItWorksVerticalStepTitle>
                <HowItWorksVerticalStepDescription>
                  {step.description}
                </HowItWorksVerticalStepDescription>
              </HowItWorksVerticalStepCopy>
              <HowItWorksVerticalStepMedia
                icon={step.icon}
                detail={step.detail}
                variant={step.preview}
              >
                {step.media}
              </HowItWorksVerticalStepMedia>
            </HowItWorksVerticalStep>
          ))
        : children}
    </ol>
  );
}
export function HowItWorksVerticalStep({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="how-it-works-vertical-step"
      className={cn(
        "grid gap-8 border-b border-border py-10 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-2 md:gap-16 md:py-20 md:odd:[&>[data-slot=how-it-works-vertical-step-media]]:order-first",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalStepCopy({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="how-it-works-vertical-step-copy"
      className={cn("flex flex-col justify-center", className)}
      {...props}
    />
  );
}
export function HowItWorksVerticalStepNumber({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="how-it-works-vertical-step-number"
      className={cn(
        "text-xs font-medium tabular-nums text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalStepLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-vertical-step-label"
      className={cn(
        "mt-8 text-xs font-medium uppercase tracking-[0.14em] text-primary",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalStepTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="how-it-works-vertical-step-title"
      className={cn(
        "mt-4 max-w-md text-3xl leading-[1.08] tracking-[-0.035em] md:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalStepDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="how-it-works-vertical-step-description"
      className={cn(
        "mt-5 max-w-md text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function HowItWorksVerticalStepMedia({
  icon: Icon,
  detail,
  variant = "brief",
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  icon?: React.ElementType<{ size?: number; strokeWidth?: number }>;
  detail?: React.ReactNode;
  variant?: "brief" | "review" | "release";
}) {
  return (
    <div
      data-slot="how-it-works-vertical-step-media"
      className={cn(
        "relative min-h-64 overflow-hidden rounded-xl border border-border bg-muted p-5 sm:p-7",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : variant === "brief" ? (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="text-xs font-medium">Project pulse</span>
            <span className="size-2 rounded-full bg-primary" />
          </div>
          <div className="rounded-lg border border-border bg-background p-5">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              {Icon ? <Icon size={16} strokeWidth={1.8} /> : null}
            </span>
            <div className="mt-8 h-2 w-4/5 rounded-full bg-foreground/12" />
            <div className="mt-3 h-2 w-3/5 rounded-full bg-foreground/8" />
            <p className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
              {detail}
            </p>
          </div>
        </div>
      ) : variant === "review" ? (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between border-b border-border pb-4 text-xs">
            <span className="font-medium">Review room</span>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
              3 notes
            </span>
          </div>
          <div className="mt-7 space-y-3">
            {[
              "Keep the active project pinned.",
              "Make recent work one click away.",
            ].map((note, index) => (
              <div
                key={note}
                className="flex gap-3 rounded-lg border border-border bg-background p-3"
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-full text-xs font-medium",
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                >
                  {index === 0 ? "JL" : "SK"}
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {note}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs font-medium text-primary">
            Direction agreed
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between rounded-lg bg-primary p-5 text-primary-foreground">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Ready to release</span>
            <Check size={16} />
          </div>
          <div className="mt-10">
            <p className="text-4xl tracking-[-0.06em]">100%</p>
            <p className="mt-2 text-xs text-primary-foreground/70">
              Acceptance criteria complete
            </p>
          </div>
          <div className="mt-8 border-t border-primary-foreground/20 pt-4 text-xs text-primary-foreground/75">
            {detail}
          </div>
        </div>
      )}
    </div>
  );
}
