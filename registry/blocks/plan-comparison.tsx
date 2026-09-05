"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type ComparisonPlan = {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
};
const defaults: ComparisonPlan[] = [
  {
    name: "Personal",
    monthly: 8,
    annual: 80,
    features: ["3 projects", "1 collaborator", "7-day history"],
  },
  {
    name: "Team",
    monthly: 18,
    annual: 180,
    features: ["Unlimited projects", "10 collaborators", "90-day history"],
  },
  {
    name: "Studio",
    monthly: 32,
    annual: 320,
    features: [
      "Unlimited projects",
      "Unlimited collaborators",
      "Unlimited history",
    ],
  },
];
export type PlanComparisonOptions = {
  className?: string;
  title?: string;
  plans?: ComparisonPlan[];
  onSelect?: (plan: string, billing: "monthly" | "annual") => void;
  billingPeriods?: typeof PlanComparisonDefaultBillingPeriods;
};
export type PlanComparisonProps = Omit<
  React.ComponentProps<"section">,
  keyof PlanComparisonOptions
> &
  PlanComparisonOptions;
const PlanComparisonDefaultBillingPeriods = [false, true];
export function PlanComparison({
  billingPeriods = PlanComparisonDefaultBillingPeriods,
  className,
  title = "Room for your next chapter.",
  plans = defaults,
  onSelect,
  children,
  ...rootProps
}: PlanComparisonProps) {
  const [annual, setAnnual] = React.useState(false),
    [message, setMessage] = React.useState("");
  return (
    <section {...rootProps} className={cn("py-8", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <PlanComparisonHeader>
            <PlanComparisonTitle>{title}</PlanComparisonTitle>
            <div aria-label="Billing period" className="flex gap-2">
              {billingPeriods.map((v) => (
                <Button
                  key={String(v)}
                  variant={annual === v ? "primary" : "outline"}
                  aria-pressed={annual === v}
                  onClick={() => setAnnual(v)}
                >
                  {v ? "Annual" : "Monthly"}
                </Button>
              ))}
            </div>
          </PlanComparisonHeader>
          <PlanComparisonDescription>
            Illustrative prices in GBP, per workspace.{" "}
            {annual ? "Billed annually." : "Billed monthly."}
          </PlanComparisonDescription>
          <PlanComparisonContent>
            {plans.map((p, i) => (
              <PlanComparisonItem
                key={p.name}
                className={cn(
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                <PlanComparisonItemTitle>{p.name}</PlanComparisonItemTitle>
                <p className="mt-6 text-4xl tabular-nums">
                  £{annual ? p.annual : p.monthly}
                  <span className="text-sm">
                    {" "}
                    / {annual ? "year" : "month"}
                  </span>
                </p>
                <ul className="my-8 flex-1 space-y-4 text-sm">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="bg-background text-foreground"
                  onClick={() =>
                    onSelect
                      ? onSelect(p.name, annual ? "annual" : "monthly")
                      : setMessage(
                          `${p.name} selected. Demo only; no purchase made.`,
                        )
                  }
                >
                  Choose {p.name}
                </Button>
              </PlanComparisonItem>
            ))}
          </PlanComparisonContent>
          <p role="status" className="mt-4 text-sm">
            {message}
          </p>
        </>
      )}
    </section>
  );
}

export function PlanComparisonHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="plan-comparison-header"
      className={cn(
        "flex flex-wrap billingPeriods-end justify-between gap-6",
        className,
      )}
      {...props}
    />
  );
}
export function PlanComparisonTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="plan-comparison-title"
      className={cn("max-w-lg text-4xl tracking-tight", className)}
      {...props}
    />
  );
}
export function PlanComparisonDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="plan-comparison-description"
      className={cn("mt-5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export function PlanComparisonContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="plan-comparison-content"
      className={cn("mt-8 grid gap-5 md:grid-cols-3", className)}
      {...props}
    />
  );
}
export function PlanComparisonItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="plan-comparison-itemtitle"
      className={cn("text-xl", className)}
      {...props}
    />
  );
}

export function PlanComparisonItem({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="plan-comparison-item"
      className={cn("flex flex-col rounded-xl p-6", className)}
      {...props}
    />
  );
}
