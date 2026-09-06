"use client";
import * as React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
type PricingTableState = {
  annual: boolean;
  setAnnual: (annual: boolean) => void;
  annualDiscount: number;
  formatPrice: (amount: number) => React.ReactNode;
};
const PricingTableContext = React.createContext<PricingTableState | null>(null);
function usePricingTable() {
  const context = React.useContext(PricingTableContext);
  if (!context)
    throw new Error(
      "PricingTableBillingToggle and PricingTablePrice must be inside PricingTable.",
    );
  return context;
}
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
      <PricingTableContext.Provider
        value={{ annual, setAnnual, annualDiscount, formatPrice }}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <PricingTableHeader>
              <div>
                <PricingTableTitle>{heading}</PricingTableTitle>
                <PricingTableLead>
                  Start with a project. Choose a plan around the people and the
                  history you need to keep.
                </PricingTableLead>
              </div>
              <PricingTableBillingToggle />
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
                      <span className="text-[11px] text-primary">
                        For teams
                      </span>
                    )}
                  </div>
                  <PricingTableItemDescription>
                    {p.text}
                  </PricingTableItemDescription>
                  <PricingTablePrice
                    amount={p.price}
                    annualAmount={p.annualPrice}
                  />
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
                  <PricingTableFeatures>
                    {p.features.map((f) => (
                      <li
                        key={typeof f === "string" ? f : p.features.indexOf(f)}
                        className="flex items-center gap-2.5"
                      >
                        <Check size={14} className="text-primary" />
                        {f}
                      </li>
                    ))}
                  </PricingTableFeatures>
                </PricingTableItem>
              ))}
            </PricingTableContent>
            <PricingTableDescription>{description}</PricingTableDescription>
          </>
        )}
      </PricingTableContext.Provider>
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

export function PricingTableLead({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="pricing-table-lead"
      className={cn(
        "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function PricingTableItemDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="pricing-table-item-description"
      className={cn(
        "mb-6 mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function PricingTableFeatures({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pricing-table-features"
      className={cn(
        "mt-7 grid gap-4 border-t border-border pt-6 text-xs",
        className,
      )}
      {...props}
    />
  );
}
export function PricingTableBillingToggle({
  className,
  children,
  ...props
}: React.ComponentProps<"label">) {
  const { annual, setAnnual, annualDiscount } = usePricingTable();
  return (
    <label
      data-slot="pricing-table-billing-toggle"
      className={cn("flex items-center gap-3 text-xs", className)}
      {...props}
    >
      <Switch checked={annual} onCheckedChange={setAnnual} />
      {children === undefined ? (
        <>
          Annual billing
          <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
            Save {Math.round(annualDiscount * 100)}%
          </span>
        </>
      ) : (
        children
      )}
    </label>
  );
}
export function PricingTablePrice({
  amount,
  annualAmount,
  suffix = "/ month",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  amount: number;
  annualAmount?: number;
  suffix?: React.ReactNode;
}) {
  const { annual, annualDiscount, formatPrice } = usePricingTable();
  const monthly = annual
    ? (annualAmount ?? amount * (1 - annualDiscount))
    : amount;
  return (
    <div
      data-slot="pricing-table-price"
      aria-live="polite"
      className={className}
      {...props}
    >
      <p className="text-5xl tabular-nums">
        {formatPrice(monthly)}
        <span className="ml-1 text-xs text-muted-foreground">{suffix}</span>
      </p>
      <p className="mb-7 mt-2 text-xs text-muted-foreground">
        {children === undefined ? (
          amount === 0 ? (
            "Free, with no billing details"
          ) : annual ? (
            <>{formatPrice(monthly * 12)} billed annually</>
          ) : (
            "Billed monthly"
          )
        ) : (
          children
        )}
      </p>
    </div>
  );
}
