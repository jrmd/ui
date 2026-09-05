"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type ComparisonPlan = {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
};
const defaults: ComparisonPlan[] = [
  {
    name: "Personal",
    monthly: 8,
    annual: 80,
    features: ["3 projects", "1 collaborator", "7-day history"],
  },
  {
    name: "Team",
    monthly: 18,
    annual: 180,
    features: ["Unlimited projects", "10 collaborators", "90-day history"],
  },
  {
    name: "Studio",
    monthly: 32,
    annual: 320,
    features: [
      "Unlimited projects",
      "Unlimited collaborators",
      "Unlimited history",
    ],
  },
];
export function PlanComparison({
  className,
  title = "Room for your next chapter.",
  plans = defaults,
  onSelect,
}: {
  className?: string;
  title?: string;
  plans?: ComparisonPlan[];
  onSelect?: (plan: string, billing: "monthly" | "annual") => void;
}) {
  const [annual, setAnnual] = React.useState(false),
    [message, setMessage] = React.useState("");
  return (
    <section className={cn("py-8", className)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-lg text-4xl tracking-tight">{title}</h2>
        <div aria-label="Billing period" className="flex gap-2">
          {[false, true].map((v) => (
            <Button
              key={String(v)}
              variant={annual === v ? "primary" : "outline"}
              aria-pressed={annual === v}
              onClick={() => setAnnual(v)}
            >
              {v ? "Annual" : "Monthly"}
            </Button>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        Illustrative prices in GBP, per workspace.{" "}
        {annual ? "Billed annually." : "Billed monthly."}
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {plans.map((p, i) => (
          <article
            key={p.name}
            className={cn(
              "flex flex-col rounded-xl p-6",
              i === 1 ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            <h3 className="text-xl">{p.name}</h3>
            <p className="mt-6 text-4xl tabular-nums">
              £{annual ? p.annual : p.monthly}
              <span className="text-sm"> / {annual ? "year" : "month"}</span>
            </p>
            <ul className="my-8 flex-1 space-y-4 text-sm">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="bg-background text-foreground"
              onClick={() =>
                onSelect
                  ? onSelect(p.name, annual ? "annual" : "monthly")
                  : setMessage(
                      `${p.name} selected. Demo only; no purchase made.`,
                    )
              }
            >
              Choose {p.name}
            </Button>
          </article>
        ))}
      </div>
      <p role="status" className="mt-4 text-sm">
        {message}
      </p>
    </section>
  );
}
