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

function useFaqModel({
  heading = "Good questions.",
  className,
  children,
  ...rootProps
}: FaqProps) {
  return { heading, className, children, rootProps };
}
const FaqCompositionContext = React.createContext<ReturnType<
  typeof useFaqModel
> | null>(null);
function useFaqComposition() {
  const context = React.useContext(FaqCompositionContext);
  if (!context) throw new Error("Faq parts must be inside Faq.");
  return context;
}
export function Faq(props: FaqProps) {
  const model = useFaqModel(props);
  const { className, rootProps, children } = model;
  return (
    <FaqCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("py-8", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <FaqHeading />
            <FaqQuestions />
          </>
        )}
      </section>
    </FaqCompositionContext.Provider>
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

export function FaqHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FaqTitle>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useFaqComposition();
  return (
    <FaqTitle {...props}>
      {children === undefined ? heading : children}
    </FaqTitle>
  );
}
export function FaqQuestions({
  children,
  ...props
}: Partial<
  Extract<React.ComponentProps<typeof Accordion>, { type: "single" }>
> & { children?: React.ReactNode }) {
  const {} = useFaqComposition();
  return (
    <Accordion
      type="single"
      collapsible
      {...props}
      items={
        children === undefined
          ? (props.items ?? [
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
            ])
          : undefined
      }
    >
      {children}
    </Accordion>
  );
}
