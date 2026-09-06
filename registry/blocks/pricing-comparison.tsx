"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type PricingComparisonOptions = {
  className?: string;
  plans?: typeof PricingComparisonDefaultPlans;
  features?: typeof PricingComparisonDefaultFeatures;
};
export type PricingComparisonProps = Omit<
  React.ComponentProps<"div">,
  keyof PricingComparisonOptions
> &
  PricingComparisonOptions;
const PricingComparisonDefaultPlans = [
  "Included",
  "Personal",
  "Team",
  "Studio",
];
const PricingComparisonDefaultFeatures = [
  ["Projects", "3", "Unlimited", "Unlimited"],
  ["Guests", "1", "10", "Unlimited"],
  ["Version history", "7 days", "90 days", "Unlimited"],
  ["Support", "Community", "Email", "Priority"],
];
function usePricingComparisonModel({
  plans = PricingComparisonDefaultPlans,
  features = PricingComparisonDefaultFeatures,
  className,
  children,
  ...rootProps
}: PricingComparisonProps) {
  return { plans, features, className, children, rootProps };
}
const PricingComparisonCompositionContext = React.createContext<ReturnType<
  typeof usePricingComparisonModel
> | null>(null);
function usePricingComparisonComposition() {
  const context = React.useContext(PricingComparisonCompositionContext);
  if (!context)
    throw new Error(
      "PricingComparison parts must be inside PricingComparison.",
    );
  return context;
}
export function PricingComparison(props: PricingComparisonProps) {
  const model = usePricingComparisonModel(props);
  const { className, rootProps, children } = model;
  return (
    <PricingComparisonCompositionContext.Provider value={model}>
      <div {...rootProps} className={cn("overflow-x-auto py-8", className)}>
        {children !== undefined ? children : <PricingComparisonTable />}
      </div>
    </PricingComparisonCompositionContext.Provider>
  );
}

export function PricingComparisonList({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="pricing-comparison-list"
      className={cn("w-full text-left text-sm", className)}
      {...props}
    />
  );
}

export function PricingComparisonTable({
  children,
  ...props
}: Partial<React.ComponentProps<typeof PricingComparisonList>> & {
  children?: React.ReactNode;
}) {
  const { plans, features } = usePricingComparisonComposition();
  return (
    <PricingComparisonList {...props}>
      {children === undefined ? (
        <>
          <caption className="mb-5 text-left font-display text-3xl">
            Find your fit.
          </caption>
          <PricingComparisonTableHeader>
            <PricingComparisonRow>
              {plans.map((h) => (
                <PricingComparisonHead key={h}>{h}</PricingComparisonHead>
              ))}
            </PricingComparisonRow>
          </PricingComparisonTableHeader>
          <PricingComparisonTableBody>
            {features.map((r) => (
              <PricingComparisonRow
                key={r[0]}
                className="border-t border-border"
              >
                {r.map((v, i) => (
                  <PricingComparisonCell key={i}>{v}</PricingComparisonCell>
                ))}
              </PricingComparisonRow>
            ))}
          </PricingComparisonTableBody>
        </>
      ) : (
        children
      )}
    </PricingComparisonList>
  );
}

export function PricingComparisonTableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="pricing-comparison-tableheader"
      className={cn("", className)}
      {...props}
    />
  );
}
export function PricingComparisonRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="pricing-comparison-row"
      className={cn("", className)}
      {...props}
    />
  );
}
export function PricingComparisonHead({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="pricing-comparison-head"
      className={cn("p-3", className)}
      {...props}
    />
  );
}
export function PricingComparisonTableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="pricing-comparison-tablebody"
      className={cn("", className)}
      {...props}
    />
  );
}
export function PricingComparisonCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="pricing-comparison-cell"
      className={cn("p-3", className)}
      {...props}
    />
  );
}
