"use client";
import * as React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
const plans = [
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
export function PricingTable({
  className,
  href = "#contact",
}: {
  className?: string;
  href?: string;
}) {
  const [annual, setAnnual] = React.useState(false);
  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-7">
        <div>
          <h2 className="text-4xl md:text-5xl">Room for your team.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Start with a project. Choose a plan around the people and the
            history you need to keep.
          </p>
        </div>
        <label className="flex items-center gap-3 text-xs">
          <Switch checked={annual} onCheckedChange={setAnnual} />
          Annual billing
          <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
            Save 20%
          </span>
        </label>
      </div>
      <div className="grid overflow-hidden rounded-xl border border-border md:grid-cols-3">
        {plans.map((p, i) => (
          <article
            key={p.name}
            className={cn(
              "flex flex-col border-b border-border p-6 last:border-0 md:border-r md:border-b-0 md:p-8",
              i === 1 && "bg-muted/55",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{p.name}</h3>
              {i === 1 && (
                <span className="text-[11px] text-primary">For teams</span>
              )}
            </div>
            <p className="mb-6 mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
              {p.text}
            </p>
            <p className="text-5xl tabular-nums" aria-live="polite">
              £{annual ? p.price * 0.8 : p.price}
              <span className="ml-1 text-xs text-muted-foreground">
                / month
              </span>
            </p>
            <p className="mb-7 mt-2 text-xs text-muted-foreground">
              {p.price === 0
                ? "Free, with no billing details"
                : annual
                  ? `£${p.price * 0.8 * 12} billed annually`
                  : "Billed monthly"}
            </p>
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
            <ul className="mt-7 grid gap-4 border-t border-border pt-6 text-xs">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check size={14} className="text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Illustrative pricing. No purchase is processed.
      </p>
    </section>
  );
}
