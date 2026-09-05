"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type FeatureComparisonPlan = {
  id: string;
  name: React.ReactNode;
  price: React.ReactNode;
  action?: React.ReactNode;
};
export type FeatureComparisonRow = {
  id: string;
  label: React.ReactNode;
  group?: React.ReactNode;
  values: Record<string, React.ReactNode>;
};
const defaultPlans: FeatureComparisonPlan[] = [
  {
    id: "Personal",
    name: "Personal",
    price: (
      <>
        £8<span className="text-xs"> / month</span>
      </>
    ),
  },
  {
    id: "Studio",
    name: "Studio",
    price: (
      <>
        £32<span className="text-xs"> / month</span>
      </>
    ),
  },
];
const defaultRows: FeatureComparisonRow[] = [
  {
    id: "projects",
    group: "Workspace",
    label: "Projects",
    values: { Personal: "3", Studio: "Unlimited" },
  },
  {
    id: "people",
    label: "Collaborators",
    values: { Personal: "1", Studio: "Unlimited" },
  },
  {
    id: "domains",
    group: "Publishing",
    label: "Custom domains",
    values: { Personal: "1", Studio: "Unlimited" },
  },
  {
    id: "branding",
    label: "Remove branding",
    values: { Personal: "No", Studio: "Yes" },
  },
  {
    id: "history",
    group: "Support",
    label: "Version history",
    values: { Personal: "7 days", Studio: "Unlimited" },
  },
  {
    id: "support",
    label: "Support channel",
    values: { Personal: "Community", Studio: "Priority email" },
  },
];
export type FeatureComparisonOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  plans?: FeatureComparisonPlan[];
  rows?: FeatureComparisonRow[];
  caption?: string;
  onSelect?: (plan: string) => void;
  highlightedPlan?: string;
};
export type FeatureComparisonProps = Omit<
  React.ComponentProps<"section">,
  keyof FeatureComparisonOptions
> &
  FeatureComparisonOptions;
export function FeatureComparison({
  className,
  title = "Compare the details.",
  description = "Illustrative plans · GBP per workspace, billed monthly.",
  plans = defaultPlans,
  rows = defaultRows,
  caption = "Plan features",
  highlightedPlan = "Studio",
  onSelect,
  children,
  ...props
}: FeatureComparisonProps) {
  const [message, setMessage] = React.useState("");
  return (
    <section {...props} className={cn("min-w-0 py-8", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <FeatureComparisonTitle>{title}</FeatureComparisonTitle>
          <FeatureComparisonDescription>
            {description}
          </FeatureComparisonDescription>
          <FeatureComparisonContent
            role="region"
            aria-label={caption}
            tabIndex={0}
          >
            <table className="w-full min-w-[540px] border-collapse text-left text-sm">
              <caption className="sr-only">{caption}</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-4">
                    Included
                  </th>
                  {plans.map((plan) => (
                    <th
                      scope="col"
                      key={plan.id}
                      className={cn(
                        "p-4",
                        plan.id === highlightedPlan && "bg-muted",
                      )}
                    >
                      <span className="block text-lg">{plan.name}</span>
                      <span className="mt-2 block text-3xl font-normal">
                        {plan.price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border">
                    <th scope="row" className="p-4 font-normal">
                      {row.group && (
                        <span className="mb-2 block font-semibold">
                          {row.group}
                        </span>
                      )}
                      {row.label}
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "p-4",
                          plan.id === highlightedPlan && "bg-muted",
                        )}
                      >
                        {row.values[plan.id] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn(
                        "p-4",
                        plan.id === highlightedPlan && "bg-muted",
                      )}
                    >
                      {plan.action !== undefined ? (
                        plan.action
                      ) : (
                        <Button
                          variant={
                            plan.id === highlightedPlan ? "primary" : "outline"
                          }
                          onClick={() =>
                            onSelect
                              ? onSelect(plan.id)
                              : setMessage(
                                  `${plan.id} selected. Demo only; no purchase made.`,
                                )
                          }
                        >
                          Choose {plan.name}
                        </Button>
                      )}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </FeatureComparisonContent>
          <p role="status" className="mt-4 text-sm">
            {message}
          </p>
        </>
      )}
    </section>
  );
}
export function FeatureComparisonTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="feature-comparison-title"
      className={cn("text-4xl tracking-tight", className)}
      {...props}
    />
  );
}
export function FeatureComparisonDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="feature-comparison-description"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
export function FeatureComparisonContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="feature-comparison-content"
      className={cn("mt-8 overflow-x-auto", className)}
      {...props}
    />
  );
}
