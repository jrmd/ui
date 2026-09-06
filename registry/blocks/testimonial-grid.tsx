"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type TestimonialGridOptions = {
  className?: string;
  items?: typeof TestimonialGridDefaultItems;
  heading?: React.ReactNode;
  description?: React.ReactNode;
};
export type TestimonialGridProps = Omit<
  React.ComponentProps<"section">,
  keyof TestimonialGridOptions
> &
  TestimonialGridOptions;
const TestimonialGridDefaultItems = [
  "The best part is knowing where everything belongs.",
  "It gave our small team a little more room to think.",
  "A calmer way to get from the first idea to the finished thing.",
];
function useTestimonialGridModel({
  items = TestimonialGridDefaultItems,
  heading = "Room for your customers’ stories.",
  description = "Sample quotes for layout demonstration.",
  className,
  children,
  ...rootProps
}: TestimonialGridProps) {
  return { items, heading, description, className, children, rootProps };
}
const TestimonialGridCompositionContext = React.createContext<ReturnType<
  typeof useTestimonialGridModel
> | null>(null);
function useTestimonialGridComposition() {
  const context = React.useContext(TestimonialGridCompositionContext);
  if (!context)
    throw new Error("TestimonialGrid parts must be inside TestimonialGrid.");
  return context;
}
export function TestimonialGrid(props: TestimonialGridProps) {
  const model = useTestimonialGridModel(props);
  const { className, rootProps, children } = model;
  return (
    <TestimonialGridCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("py-8", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <TestimonialGridHeading />
            <TestimonialGridLead />
            <TestimonialGridQuotes />
          </>
        )}
      </section>
    </TestimonialGridCompositionContext.Provider>
  );
}

export function TestimonialGridTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="testimonial-grid-title"
      className={cn("text-3xl", className)}
      {...props}
    />
  );
}
export function TestimonialGridDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="testimonial-grid-description"
      className={cn("mt-2 mb-7 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export function TestimonialGridContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="testimonial-grid-content"
      className={cn("grid gap-8 md:grid-cols-3", className)}
      {...props}
    />
  );
}

export function TestimonialGridHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TestimonialGridTitle>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useTestimonialGridComposition();
  return (
    <TestimonialGridTitle {...props}>
      {children === undefined ? heading : children}
    </TestimonialGridTitle>
  );
}
export function TestimonialGridLead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TestimonialGridDescription>> & {
  children?: React.ReactNode;
}) {
  const { description } = useTestimonialGridComposition();
  return (
    <TestimonialGridDescription {...props}>
      {children === undefined ? description : children}
    </TestimonialGridDescription>
  );
}
export function TestimonialGridQuotes({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TestimonialGridContent>> & {
  children?: React.ReactNode;
}) {
  const { items } = useTestimonialGridComposition();
  return (
    <TestimonialGridContent {...props}>
      {children === undefined
        ? items.map((q, i) => (
            <TestimonialGridQuote key={q}>
              <TestimonialGridQuotation>“{q}”</TestimonialGridQuotation>
              <TestimonialGridAttribution>
                Sample customer {i + 1} · Illustrative quote
              </TestimonialGridAttribution>
            </TestimonialGridQuote>
          ))
        : children}
    </TestimonialGridContent>
  );
}

export function TestimonialGridQuote({
  className,
  ...props
}: React.ComponentProps<"figure">) {
  return (
    <figure
      data-slot="testimonial-grid-quote"
      className={cn("m-0 border-t border-border pt-5", className)}
      {...props}
    />
  );
}
export function TestimonialGridQuotation({
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      data-slot="testimonial-grid-quotation"
      className={cn("text-xl leading-relaxed", className)}
      {...props}
    />
  );
}
export function TestimonialGridAttribution({
  className,
  ...props
}: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      data-slot="testimonial-grid-attribution"
      className={cn("mt-5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
