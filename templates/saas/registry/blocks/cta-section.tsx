"use client";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type CtaSectionOptions = {
  className?: string;
  href?: string;
  title?: React.ReactNode;
  action?: React.ReactNode;
};
export type CtaSectionProps = Omit<
  React.ComponentProps<"section">,
  keyof CtaSectionOptions
> &
  CtaSectionOptions;
export function CtaSection({
  className,
  href = "#start",
  title = "Bring your next project into focus.",
  action = "Talk to the team",
  children,
  ...rootProps
}: CtaSectionProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "flex flex-wrap items-end justify-between gap-8 border-t border-border py-12 md:py-16",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <CtaSectionContent>
            <CtaSectionTitle>{title}</CtaSectionTitle>
            <CtaSectionDescription>
              Tell us how your team works. We’ll help you find a useful starting
              point.
            </CtaSectionDescription>
          </CtaSectionContent>
          <CtaSectionAction asChild>
            <a href={href}>
              {action}
              <ArrowUpRight size={17} />
            </a>
          </CtaSectionAction>
        </>
      )}
    </section>
  );
}

export function CtaSectionTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="cta-section-title"
      className={cn("max-w-xl text-4xl leading-tight md:text-5xl", className)}
      {...props}
    />
  );
}

export function CtaSectionContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-section-content"
      className={cn("min-w-0", className)}
      {...props}
    />
  );
}
export function CtaSectionDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="cta-section-description"
      className={cn(
        "mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function CtaSectionAction(props: React.ComponentProps<typeof Button>) {
  return <Button data-slot="cta-section-action" size="lg" {...props} />;
}
