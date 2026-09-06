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
function useProductComparisonModel({
  features = ProductComparisonDefaultFeatures,
  heading = "A clearer way to work.",
  className,
  children,
  ...rootProps
}: ProductComparisonProps) {
  return { features, heading, className, children, rootProps };
}
const ProductComparisonCompositionContext = React.createContext<ReturnType<
  typeof useProductComparisonModel
> | null>(null);
function useProductComparisonComposition() {
  const context = React.useContext(ProductComparisonCompositionContext);
  if (!context)
    throw new Error(
      "ProductComparison parts must be inside ProductComparison.",
    );
  return context;
}
export function ProductComparison(props: ProductComparisonProps) {
  const model = useProductComparisonModel(props);
  const { className, rootProps, children } = model;
  return (
    <ProductComparisonCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("overflow-x-auto py-8", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <ProductComparisonHeading />
            <ProductComparisonTable />
          </>
        )}
      </section>
    </ProductComparisonCompositionContext.Provider>
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

export function ProductComparisonHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ProductComparisonTitle>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useProductComparisonComposition();
  return (
    <ProductComparisonTitle {...props}>
      {children === undefined ? heading : children}
    </ProductComparisonTitle>
  );
}
export function ProductComparisonTable({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ProductComparisonList>> & {
  children?: React.ReactNode;
}) {
  const { features } = useProductComparisonComposition();
  return (
    <ProductComparisonList {...props}>
      {children === undefined ? (
        <>
          <caption className="sr-only">Workflow comparison</caption>
          <ProductComparisonTableHeader>
            <ProductComparisonRow>
              <ProductComparisonHead>Task</ProductComparisonHead>
              <ProductComparisonHead>Scattered workflow</ProductComparisonHead>
              <ProductComparisonHead>Shared workspace</ProductComparisonHead>
            </ProductComparisonRow>
          </ProductComparisonTableHeader>
          <ProductComparisonTableBody>
            {features.map((r) => (
              <ProductComparisonRow key={r[0]}>
                {r.map((c, i) => (
                  <ProductComparisonCell key={i}>{c}</ProductComparisonCell>
                ))}
              </ProductComparisonRow>
            ))}
          </ProductComparisonTableBody>
        </>
      ) : (
        children
      )}
    </ProductComparisonList>
  );
}

export function ProductComparisonTableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="product-comparison-tableheader"
      className={cn("", className)}
      {...props}
    />
  );
}
export function ProductComparisonRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="product-comparison-row"
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}
export function ProductComparisonHead({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="product-comparison-head"
      className={cn("p-3", className)}
      {...props}
    />
  );
}
export function ProductComparisonTableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="product-comparison-tablebody"
      className={cn("", className)}
      {...props}
    />
  );
}
export function ProductComparisonCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="product-comparison-cell"
      className={cn("p-3", className)}
      {...props}
    />
  );
}
