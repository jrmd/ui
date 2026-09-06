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
function useFeatureComparisonModel({
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
  return {
    className,
    title,
    description,
    plans,
    rows,
    caption,
    highlightedPlan,
    onSelect,
    children,
    props,
    message,
    setMessage,
  };
}
const FeatureComparisonCompositionContext = React.createContext<ReturnType<
  typeof useFeatureComparisonModel
> | null>(null);
function useFeatureComparisonComposition() {
  const context = React.useContext(FeatureComparisonCompositionContext);
  if (!context)
    throw new Error(
      "FeatureComparison parts must be inside FeatureComparison.",
    );
  return context;
}
export function FeatureComparison(props: FeatureComparisonProps) {
  const model = useFeatureComparisonModel(props);
  const { className, props: rootProps, children } = model;
  return (
    <FeatureComparisonCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("min-w-0 py-8", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <FeatureComparisonHeading />
            <FeatureComparisonLead />
            <FeatureComparisonMatrix />
            <FeatureComparisonStatus />
          </>
        )}
      </section>
    </FeatureComparisonCompositionContext.Provider>
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

export function FeatureComparisonHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FeatureComparisonTitle>> & {
  children?: React.ReactNode;
}) {
  const { title } = useFeatureComparisonComposition();
  return (
    <FeatureComparisonTitle {...props}>
      {children === undefined ? title : children}
    </FeatureComparisonTitle>
  );
}
export function FeatureComparisonLead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FeatureComparisonDescription>> & {
  children?: React.ReactNode;
}) {
  const { description } = useFeatureComparisonComposition();
  return (
    <FeatureComparisonDescription {...props}>
      {children === undefined ? description : children}
    </FeatureComparisonDescription>
  );
}
export function FeatureComparisonMatrix({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FeatureComparisonContent>> & {
  children?: React.ReactNode;
}) {
  const { plans, rows, caption, highlightedPlan, onSelect, setMessage } =
    useFeatureComparisonComposition();
  return (
    <FeatureComparisonContent
      role="region"
      aria-label={caption}
      tabIndex={0}
      {...props}
    >
      {children === undefined ? (
        <FeatureComparisonTable>
          <caption className="sr-only">{caption}</caption>
          <FeatureComparisonTableHeader>
            <FeatureComparisonRow>
              <FeatureComparisonHead scope="col">
                Included
              </FeatureComparisonHead>
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
            </FeatureComparisonRow>
          </FeatureComparisonTableHeader>
          <FeatureComparisonTableBody>
            {rows.map((row) => (
              <FeatureComparisonRow key={row.id}>
                <FeatureComparisonHead scope="row" className="p-4 font-normal">
                  {row.group && (
                    <span className="mb-2 block font-semibold">
                      {row.group}
                    </span>
                  )}
                  {row.label}
                </FeatureComparisonHead>
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
              </FeatureComparisonRow>
            ))}
          </FeatureComparisonTableBody>
          <tfoot>
            <FeatureComparisonRow>
              <FeatureComparisonCell />
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
            </FeatureComparisonRow>
          </tfoot>
        </FeatureComparisonTable>
      ) : (
        children
      )}
    </FeatureComparisonContent>
  );
}
export function FeatureComparisonStatus({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { message } = useFeatureComparisonComposition();
  return (
    <p role="status" {...props} className={cn("mt-4 text-sm", props.className)}>
      {children === undefined ? message : children}
    </p>
  );
}

export function FeatureComparisonTable({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="feature-comparison-table"
      className={cn(
        "w-full min-w-[540px] border-collapse text-left text-sm",
        className,
      )}
      {...props}
    />
  );
}
export function FeatureComparisonTableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="feature-comparison-tableheader"
      className={cn("", className)}
      {...props}
    />
  );
}
export function FeatureComparisonRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="feature-comparison-row"
      className={cn("border-b border-border", className)}
      {...props}
    />
  );
}
export function FeatureComparisonHead({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="feature-comparison-head"
      className={cn("p-4", className)}
      {...props}
    />
  );
}
export function FeatureComparisonTableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="feature-comparison-tablebody"
      className={cn("", className)}
      {...props}
    />
  );
}
export function FeatureComparisonCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="feature-comparison-cell"
      className={cn("", className)}
      {...props}
    />
  );
}
