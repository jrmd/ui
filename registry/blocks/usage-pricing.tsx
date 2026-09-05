"use client";
import * as React from "react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type UsagePricingOptions = {
  seats?: number;
  defaultSeats?: number;
  onSeatsChange?: (seats: number) => void;
  minSeats?: number;
  maxSeats?: number;
  plans?: {
    name: string;
    price: (seats: number) => number;
    note: React.ReactNode;
  }[];
  formatPrice?: (amount: number) => React.ReactNode;
  summary?: React.ReactNode;
  className?: string;
  title?: string;
  onSelect?: (plan: string, seats: number) => void;
};
export type UsagePricingProps = Omit<
  React.ComponentProps<"section">,
  keyof UsagePricingOptions
> &
  UsagePricingOptions;
const defaultPlans = [
  {
    name: "Flexible",
    price: (seats: number) => seats * 12,
    note: "£12 per person / month",
  },
  {
    name: "Workspace",
    price: () => 240,
    note: "£240 per workspace / month, up to 50 people",
  },
];
export function UsagePricing({
  seats: controlledSeats,
  defaultSeats = 5,
  onSeatsChange,
  minSeats = 1,
  maxSeats = 50,
  plans = defaultPlans,
  formatPrice = (amount) => `£${amount}`,
  summary,
  className,
  title = "A plan that grows with your team.",
  onSelect,
  children,
  ...rootProps
}: UsagePricingProps) {
  const [seats, setSeats] = useControllable(
      controlledSeats,
      defaultSeats,
      onSeatsChange,
    ),
    [message, setMessage] = React.useState("");
  const id = React.useId();
  return (
    <section
      {...rootProps}
      className={cn(
        "grid overflow-hidden rounded-xl border border-border md:grid-cols-2",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <UsagePricingContent>
            <UsagePricingTitle>{title}</UsagePricingTitle>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Compare a flexible seat-based plan with a flat workspace price.
              Illustrative GBP pricing, billed monthly.
            </p>
            <label htmlFor={id} className="mt-10 flex justify-between text-sm">
              Team size <span className="tabular-nums">{seats} people</span>
            </label>
            <input
              id={id}
              type="range"
              min={minSeats}
              max={maxSeats}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="mt-5 w-full accent-primary"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              {minSeats}–{maxSeats} people · Adjust to compare monthly totals.
            </p>
          </UsagePricingContent>
          <div className="bg-muted p-7 md:p-10">
            {plans
              .map((plan) => ({ ...plan, price: plan.price(seats) }))
              .map((p) => (
                <UsagePricingItem key={p.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <UsagePricingItemTitle>{p.name}</UsagePricingItemTitle>
                    <p className="text-3xl tabular-nums">
                      {formatPrice(p.price)}
                      <span className="text-xs"> / month</span>
                    </p>
                  </div>
                  <p className="my-3 text-xs text-muted-foreground">{p.note}</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      onSelect
                        ? onSelect(p.name, seats)
                        : setMessage(
                            `${p.name} selected for ${seats} people. Demo only.`,
                          )
                    }
                  >
                    Choose {p.name}
                  </Button>
                </UsagePricingItem>
              ))}
            <p aria-live="polite" className="mt-5 text-sm">
              {summary !== undefined
                ? summary
                : plans === defaultPlans
                  ? seats * 12 === 240
                    ? "Both plans cost the same."
                    : `${seats * 12 < 240 ? "Flexible" : "Workspace"} saves £${Math.abs(240 - seats * 12)} per month.`
                  : null}
            </p>
            <p role="status" className="mt-3 text-sm">
              {message}
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export function UsagePricingContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="usage-pricing-content"
      className={cn("p-7 md:p-10", className)}
      {...props}
    />
  );
}
export function UsagePricingTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="usage-pricing-title"
      className={cn("text-4xl leading-tight tracking-tight", className)}
      {...props}
    />
  );
}
export function UsagePricingItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="usage-pricing-itemtitle"
      className={cn("text-xl", className)}
      {...props}
    />
  );
}

export function UsagePricingItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="usage-pricing-item"
      className={cn("border-b border-border py-6 first:pt-0", className)}
      {...props}
    />
  );
}
