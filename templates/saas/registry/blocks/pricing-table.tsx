"use client";
import * as React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
export type PricingPlan = {
  name: string;
  price: number;
  annualPrice?: number;
  text: React.ReactNode;
  features: React.ReactNode[];
};
const defaultPlans: PricingPlan[] = [
  {
    name: "Personal",
    price: 0,
    text: "For your own projects and the occasional collaborator.",
    features: [
      "3 active projects",
      "1 guest",
      "7-day version history",
      "Community support",
    ],
  },
  {
    name: "Team",
    price: 15,
    text: "For a team planning, reviewing, and shipping together.",
    features: [
      "Unlimited projects",
      "10 guests",
      "90-day version history",
      "Email support",
    ],
  },
  {
    name: "Studio",
    price: 35,
    text: "For several teams and a longer view of the work.",
    features: [
      "Unlimited projects",
      "Unlimited guests",
      "Unlimited version history",
      "Priority support",
    ],
  },
];
export type PricingTableOptions = {
  annual?: boolean;
  defaultAnnual?: boolean;
  onAnnualChange?: (annual: boolean) => void;
  annualDiscount?: number;
  formatPrice?: (amount: number) => React.ReactNode;
  renderAction?: (plan: PricingPlan, annual: boolean) => React.ReactNode;
  className?: string;
  href?: string;
  plans?: typeof defaultPlans;
  heading?: React.ReactNode;
  description?: React.ReactNode;
};
export type PricingTableProps = Omit<
  React.ComponentProps<"section">,
  keyof PricingTableOptions
> &
  PricingTableOptions;

export function PricingTable({
  annual: controlledAnnual,
  defaultAnnual = false,
  onAnnualChange,
  annualDiscount = 0.2,
  formatPrice = (amount) => `£${amount}`,
  renderAction,
  plans = defaultPlans,
  heading = <>Room for your team.</>,
  description = <>Illustrative pricing. No purchase is processed.</>,
  className,
  href = "#contact",
  children,
  ...rootProps
}: PricingTableProps) {
  const [annual, setAnnual] = useControllable(
    controlledAnnual,
    defaultAnnual,
    onAnnualChange,
  );
  return (
    <section {...rootProps} className={cn("py-12 md:py-16", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <PricingTableHeader>
            <div>
              <PricingTableTitle>{heading}</PricingTableTitle>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Start with a project. Choose a plan around the people and the
                history you need to keep.
              </p>
            </div>
            <label className="flex items-center gap-3 text-xs">
              <Switch checked={annual} onCheckedChange={setAnnual} />
              Annual billing
              <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                Save {Math.round(annualDiscount * 100)}%
              </span>
            </label>
          </PricingTableHeader>
          <PricingTableContent>
            {plans.map((p, i) => (
              <PricingTableItem
                key={p.name}
                className={cn(i === 1 && "bg-muted/55")}
              >
                <div className="flex items-center justify-between">
                  <PricingTableItemTitle>{p.name}</PricingTableItemTitle>
                  {i === 1 && (
                    <span className="text-[11px] text-primary">For teams</span>
                  )}
                </div>
                <p className="mb-6 mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
                <p className="text-5xl tabular-nums" aria-live="polite">
                  {formatPrice(
                    annual
                      ? (p.annualPrice ?? p.price * (1 - annualDiscount))
                      : p.price,
                  )}
                  <span className="ml-1 text-xs text-muted-foreground">
                    / month
                  </span>
                </p>
                <p className="mb-7 mt-2 text-xs text-muted-foreground">
                  {p.price === 0 ? (
                    "Free, with no billing details"
                  ) : annual ? (
                    <>
                      {formatPrice(
                        (p.annualPrice ?? p.price * (1 - annualDiscount)) * 12,
                      )}{" "}
                      billed annually
                    </>
                  ) : (
                    "Billed monthly"
                  )}
                </p>
                {renderAction ? (
                  renderAction(p, annual)
                ) : (
                  <Button
                    asChild
                    variant={i === 1 ? "primary" : "outline"}
                    className="w-full justify-between"
                  >
                    <a href={href}>
                      Choose {p.name}
                      <ArrowUpRight size={15} />
                    </a>
                  </Button>
                )}
                <ul className="mt-7 grid gap-4 border-t border-border pt-6 text-xs">
                  {p.features.map((f) => (
                    <li
                      key={typeof f === "string" ? f : p.features.indexOf(f)}
                      className="flex items-center gap-2.5"
                    >
                      <Check size={14} className="text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </PricingTableItem>
            ))}
          </PricingTableContent>
          <PricingTableDescription>{description}</PricingTableDescription>
        </>
      )}
    </section>
  );
}

export function PricingTableHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pricing-table-header"
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-7",
        className,
      )}
      {...props}
    />
  );
}
export function PricingTableTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="pricing-table-title"
      className={cn("text-4xl md:text-5xl", className)}
      {...props}
    />
  );
}
export function PricingTableContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pricing-table-content"
      className={cn(
        "grid overflow-hidden rounded-xl border border-border md:grid-cols-3",
        className,
      )}
      {...props}
    />
  );
}
export function PricingTableItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="pricing-table-itemtitle"
      className={cn("text-lg font-medium", className)}
      {...props}
    />
  );
}
export function PricingTableDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="pricing-table-description"
      className={cn("mt-4 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export function PricingTableItem({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="pricing-table-item"
      className={cn(
        "flex flex-col border-b border-border p-6 last:border-0 md:border-r md:border-b-0 md:p-8",
        className,
      )}
      {...props}
    />
  );
}
