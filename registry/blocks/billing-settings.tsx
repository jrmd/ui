"use client";
import * as React from "react";
import { Check, CreditCard } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useDemoState } from "./demo-state";
export function BillingSettings({ className }: { className?: string }) {
  const [plan, setPlan] = useDemoState("plan", "Team");
  const [choice, setChoice] = React.useState(plan);
  const [status, setStatus] = React.useState("");
  React.useEffect(() => setChoice(plan), [plan]);
  return (
    <section className={cn("grid max-w-2xl gap-6", className)}>
      <div>
        <h2 className="text-lg font-semibold">Plan & billing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the space your team needs.
        </p>
      </div>
      <fieldset>
        <legend className="sr-only">Choose plan</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { name: "Personal", price: 0, detail: "For your own projects" },
            { name: "Team", price: 12, detail: "For teams building together" },
            { name: "Studio", price: 24, detail: "For a growing practice" },
          ].map((p) => (
            <label
              key={p.name}
              className={cn(
                "relative cursor-pointer rounded-xl border p-5",
                choice === p.name
                  ? "border-primary bg-primary/4"
                  : "border-border",
              )}
            >
              <input
                type="radio"
                name="plan"
                className="sr-only peer"
                checked={choice === p.name}
                onChange={() => setChoice(p.name)}
              />
              <span className="block text-sm font-medium peer-focus-visible:underline">
                {p.name}
              </span>
              {choice === p.name && (
                <Check
                  size={15}
                  className="absolute right-4 top-5 text-primary"
                />
              )}
              <span className="mt-5 block font-display text-3xl">
                £{p.price}
                <span className="ml-1 font-sans text-xs text-muted-foreground">
                  / month
                </span>
              </span>
              <span className="mt-3 block text-xs leading-relaxed text-muted-foreground">
                {p.detail}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="rounded-xl border border-border p-5">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-medium">Workspace storage</span>
          <span className="text-muted-foreground">2.4 GB of 10 GB</span>
        </div>
        <Progress value={24} label="Storage used" showLabel={false} />
        <p className="mt-3 text-xs text-muted-foreground">
          Illustrative usage for the {plan} plan.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <CreditCard size={16} />
          Preview pricing · no payment connected
        </span>
        <Button
          onClick={() => {
            setPlan(choice);
            setStatus(`${choice} selected for this demo. No charge was made.`);
          }}
        >
          Update demo plan
        </Button>
      </div>
      {status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )}
    </section>
  );
}
