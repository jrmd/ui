"use client";
import * as React from "react";
import { Check, CreditCard } from "lucide-react";
import { useAsyncAction } from "../ui/use-async-action";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useControllable } from "../ui/use-controllable";
export type BillingSettingsOptions = {
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  plans?: typeof BillingSettingsDefaultPlans;
  heading?: React.ReactNode;
  onSave?: (value: string) => void | Promise<void>;
};
export type BillingSettingsProps = Omit<
  React.ComponentProps<"section">,
  keyof BillingSettingsOptions
> &
  BillingSettingsOptions;
const BillingSettingsDefaultPlans = [
  { name: "Personal", price: 0, detail: "For your own projects" },
  { name: "Team", price: 12, detail: "For teams building together" },
  { name: "Studio", price: 24, detail: "For a growing practice" },
];
export function BillingSettings({
  plans = BillingSettingsDefaultPlans,
  heading = <>Plan & billing</>,
  className,
  value: controlledValue,
  defaultValue = "Team",
  onValueChange,
  onSave,
  children,
  ...rootProps
}: BillingSettingsProps) {
  const action = useAsyncAction();
  const [plan, setPlan] = useControllable<string>(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const [choice, setChoice] = React.useState(plan);
  const [status, setStatus] = React.useState("");
  React.useEffect(() => setChoice(plan), [plan]);
  return (
    <section {...rootProps} className={cn("grid max-w-2xl gap-6", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          {action.error && <p role="alert">{action.error}</p>}
          <div>
            <BillingSettingsTitle>{heading}</BillingSettingsTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose the space your team needs.
            </p>
          </div>
          <fieldset>
            <legend className="sr-only">Choose plan</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {plans.map((p) => (
                <BillingSettingsItem
                  key={p.name}
                  className={cn(
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
                </BillingSettingsItem>
              ))}
            </div>
          </fieldset>
          <BillingSettingsContent>
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="font-medium">Workspace storage</span>
              <span className="text-muted-foreground">2.4 GB of 10 GB</span>
            </div>
            <Progress value={24} label="Storage used" showLabel={false} />
            <p className="mt-3 text-xs text-muted-foreground">
              Illustrative usage for the {plan} plan.
            </p>
          </BillingSettingsContent>
          <BillingSettingsHeader>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <CreditCard size={16} />
              Preview pricing · no payment connected
            </span>
            <Button
              disabled={action.pending}
              loading={action.pending}
              onClick={() => {
                void action.run(async () => {
                  await onSave?.(choice);
                  setPlan(choice);
                  setStatus(
                    onSave
                      ? `${choice} selected.`
                      : `${choice} selected locally. No charge was made.`,
                  );
                });
              }}
            >
              Update plan
            </Button>
          </BillingSettingsHeader>
          {status && (
            <p role="status" className="text-sm">
              {status}
            </p>
          )}
        </>
      )}
    </section>
  );
}

export function BillingSettingsTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="billing-settings-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
export function BillingSettingsContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="billing-settings-content"
      className={cn("rounded-xl border border-border p-5", className)}
      {...props}
    />
  );
}
export function BillingSettingsHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="billing-settings-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5",
        className,
      )}
      {...props}
    />
  );
}

export function BillingSettingsItem({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="billing-settings-item"
      className={cn("relative cursor-pointer rounded-xl border p-5", className)}
      {...props}
    />
  );
}
