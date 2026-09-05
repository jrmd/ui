"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export function UsagePricing({
  className,
  title = "A plan that grows with your team.",
  onSelect,
}: {
  className?: string;
  title?: string;
  onSelect?: (plan: string, seats: number) => void;
}) {
  const [seats, setSeats] = React.useState(5),
    [message, setMessage] = React.useState("");
  const id = React.useId();
  return (
    <section
      className={cn(
        "grid overflow-hidden rounded-xl border border-border md:grid-cols-2",
        className,
      )}
    >
      <div className="p-7 md:p-10">
        <h2 className="text-4xl leading-tight tracking-tight">{title}</h2>
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
          min="1"
          max="50"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="mt-5 w-full accent-primary"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          1–50 people · Adjust to compare monthly totals.
        </p>
      </div>
      <div className="bg-muted p-7 md:p-10">
        {[
          {
            name: "Flexible",
            price: seats * 12,
            note: "£12 per person / month",
          },
          {
            name: "Workspace",
            price: 240,
            note: "£240 per workspace / month, up to 50 people",
          },
        ].map((p) => (
          <div key={p.name} className="border-b border-border py-6 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl">{p.name}</h3>
              <p className="text-3xl tabular-nums">
                £{p.price}
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
          </div>
        ))}
        <p aria-live="polite" className="mt-5 text-sm">
          {seats * 12 === 240
            ? "Both plans cost the same."
            : `${seats * 12 < 240 ? "Flexible" : "Workspace"} saves £${Math.abs(240 - seats * 12)} per month.`}
        </p>
        <p role="status" className="mt-3 text-sm">
          {message}
        </p>
      </div>
    </section>
  );
}
