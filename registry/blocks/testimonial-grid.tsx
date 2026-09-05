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
export function TestimonialGrid({
  items = TestimonialGridDefaultItems,
  heading = <>Room for your customers’ stories.</>,
  description = <>Sample quotes for layout demonstration.</>,
  className,
  children,
  ...rootProps
}: TestimonialGridProps) {
  return (
    <section {...rootProps} className={cn("py-8", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <TestimonialGridTitle>{heading}</TestimonialGridTitle>
          <TestimonialGridDescription>{description}</TestimonialGridDescription>
          <TestimonialGridContent>
            {items.map((q, i) => (
              <figure key={q} className="m-0 border-t border-border pt-5">
                <blockquote className="text-xl leading-relaxed">
                  “{q}”
                </blockquote>
                <figcaption className="mt-5 text-xs text-muted-foreground">
                  Sample customer {i + 1} · Illustrative quote
                </figcaption>
              </figure>
            ))}
          </TestimonialGridContent>
        </>
      )}
    </section>
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
