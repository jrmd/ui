"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Accordion } from "../ui/accordion";
export type FaqOptions = {
  className?: string;
  heading?: React.ReactNode;
};
export type FaqProps = Omit<React.ComponentProps<"section">, keyof FaqOptions> &
  FaqOptions;

export function Faq({
  heading = <>Good questions.</>,
  className,
  children,
  ...rootProps
}: FaqProps) {
  return (
    <section {...rootProps} className={cn("py-8", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <FaqTitle>{heading}</FaqTitle>
          <Accordion
            type="single"
            collapsible
            items={[
              {
                value: "start",
                title: "How do I get started?",
                content:
                  "Choose a template, install its dependencies, and run the local development server. The included README walks through each step.",
              },
              {
                value: "source",
                title: "Can I change the source?",
                content:
                  "The source is designed to be edited. Adjust the theme and components to fit your product, subject to the distribution licence.",
              },
              {
                value: "backend",
                title: "Is a backend included?",
                content:
                  "These are frontend templates with demo data. Connect your own authentication, storage, and services at the documented integration points.",
              },
            ]}
          />
        </>
      )}
    </section>
  );
}

export function FaqTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="faq-title"
      className={cn("mb-5 text-3xl", className)}
      {...props}
    />
  );
}
