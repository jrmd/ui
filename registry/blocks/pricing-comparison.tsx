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
export function PricingComparison({
  plans = PricingComparisonDefaultPlans,
  features = PricingComparisonDefaultFeatures,
  className,
  children,
  ...rootProps
}: PricingComparisonProps) {
  return (
    <div {...rootProps} className={cn("overflow-x-auto py-8", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <PricingComparisonList>
            <caption className="mb-5 text-left font-display text-3xl">
              Find your fit.
            </caption>
            <thead>
              <tr>
                {plans.map((h) => (
                  <th className="p-3" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  {r.map((v, i) => (
                    <td key={i} className="p-3">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </PricingComparisonList>
        </>
      )}
    </div>
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
