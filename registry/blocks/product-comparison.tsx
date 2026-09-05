"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type ProductComparisonOptions = {
  className?: string;
  features?: typeof ProductComparisonDefaultFeatures;
  heading?: React.ReactNode;
};
export type ProductComparisonProps = Omit<
  React.ComponentProps<"section">,
  keyof ProductComparisonOptions
> &
  ProductComparisonOptions;
const ProductComparisonDefaultFeatures = [
  ["Find context", "Search multiple tools", "Open the project"],
  ["Track a decision", "Ask in a message", "Read the decision log"],
  ["Plan next week", "Rebuild a spreadsheet", "Update the shared plan"],
];
export function ProductComparison({
  features = ProductComparisonDefaultFeatures,
  heading = <>A clearer way to work.</>,
  className,
  children,
  ...rootProps
}: ProductComparisonProps) {
  return (
    <section {...rootProps} className={cn("overflow-x-auto py-8", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <ProductComparisonTitle>{heading}</ProductComparisonTitle>
          <ProductComparisonList>
            <caption className="sr-only">Workflow comparison</caption>
            <thead>
              <tr className="border-b border-border">
                <th className="p-3">Task</th>
                <th className="p-3">Scattered workflow</th>
                <th className="p-3">Shared workspace</th>
              </tr>
            </thead>
            <tbody>
              {features.map((r) => (
                <tr key={r[0]} className="border-b border-border">
                  {r.map((c, i) => (
                    <td key={i} className="p-3">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </ProductComparisonList>
        </>
      )}
    </section>
  );
}

export function ProductComparisonTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="product-comparison-title"
      className={cn("mb-6 text-3xl", className)}
      {...props}
    />
  );
}
export function ProductComparisonList({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="product-comparison-list"
      className={cn("w-full text-left text-sm", className)}
      {...props}
    />
  );
}
