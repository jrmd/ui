"use client";
import * as React from "react";
import { Check, ArrowUpRight, X } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useDemoState } from "./demo-state";
import { WorkspaceHeading, DemoReset } from "./workspace-parts";
const seed = [
  {
    id: "1",
    title: "Publish the release notes",
    detail: "Make the prepared draft visible to the workspace.",
    scope: "Workspace / Release notes",
    state: "Pending",
  },
  {
    id: "2",
    title: "Archive completed tasks",
    detail: "Move 8 completed tasks out of the active board.",
    scope: "Project / Autumn launch",
    state: "Pending",
  },
];
export function ApprovalQueue({
  className,
  onDecision,
}: {
  className?: string;
  onDecision?: (id: string, decision: string) => void;
}) {
  const [items, setItems, reset] = useDemoState("jez-approvals", seed);
  const decide = (id: string, state: string) => {
    setItems((v) => v.map((i) => (i.id === id ? { ...i, state } : i)));
    onDecision?.(id, state);
  };
  return (
    <section className={cn("mx-auto w-full max-w-2xl", className)}>
      <WorkspaceHeading
        title="You have the final say."
        description="Review what is about to change. These approvals only update the local demo."
      />
      <div className="divide-y divide-border">
        {items.map((i) => (
          <article key={i.id} className="py-6 first:pt-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-medium">{i.title}</h3>
              <Badge tone={i.state === "Approved" ? "positive" : "neutral"}>
                {i.state}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{i.detail}</p>
            <details className="mt-4 text-xs">
              <summary className="cursor-pointer">
                Review scope <ArrowUpRight size={12} className="inline" />
              </summary>
              <p className="mt-3 rounded-lg bg-muted p-3">
                {i.scope}. No external action is performed by this example.
              </p>
            </details>
            {i.state === "Pending" && (
              <div className="mt-5 flex gap-2">
                <Button size="sm" onClick={() => decide(i.id, "Approved")}>
                  <Check size={14} />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => decide(i.id, "Declined")}
                >
                  <X size={14} />
                  Decline
                </Button>
              </div>
            )}
          </article>
        ))}
      </div>
      <DemoReset onReset={reset} />
    </section>
  );
}
