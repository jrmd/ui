"use client";
import * as React from "react";
import { Braces, Check, RotateCcw } from "lucide-react";
import { cn } from "../ui/utils";
import { Tabs } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { WorkspaceHeading } from "./workspace-parts";
export function ToolInspector({ className }: { className?: string }) {
  const [fail, setFail] = React.useState(false);
  return (
    <section className={cn("mx-auto w-full max-w-2xl", className)}>
      <WorkspaceHeading
        title="See what happened."
        description="Inspect a tool call without losing the conversation around it."
      />
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-muted/50 p-5">
          <div className="flex items-center gap-3">
            <Braces size={18} />
            <div>
              <h3 className="text-sm font-medium">search_workspace</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Local example · 3 results
              </p>
            </div>
          </div>
          <Badge tone={fail ? "warning" : "positive"}>
            {fail ? "Failed" : "Complete"}
          </Badge>
        </div>
        <div className="px-5">
          <Tabs
            items={[
              {
                value: "result",
                label: "Result",
                content: fail ? (
                  <div role="alert" className="py-4">
                    <p className="text-sm">The example search timed out.</p>
                    <button
                      className="mt-3 flex items-center gap-2 text-sm underline"
                      onClick={() => setFail(false)}
                    >
                      <RotateCcw size={13} />
                      Retry search
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {[
                      "Autumn launch brief",
                      "Brand voice notes",
                      "Release checklist",
                    ].map((t) => (
                      <li key={t} className="flex justify-between py-3 text-sm">
                        <span>{t}</span>
                        <Check size={14} />
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                value: "input",
                label: "Input",
                content: (
                  <pre
                    tabIndex={0}
                    className="overflow-auto rounded-lg bg-muted p-4 text-xs"
                  >
                    {
                      '{\n  "query": "autumn launch",\n  "limit": 3,\n  "scope": "workspace"\n}'
                    }
                  </pre>
                ),
              },
              {
                value: "log",
                label: "Log",
                content: (
                  <div className="grid gap-3 py-2 text-xs text-muted-foreground">
                    <p>Request validated</p>
                    <p>Workspace index searched</p>
                    <p>
                      {fail
                        ? "Response timed out"
                        : "3 matching documents returned"}
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <button
        onClick={() => setFail((v) => !v)}
        className="mt-4 text-xs text-muted-foreground underline"
      >
        {fail ? "Restore success state" : "Simulate a failed call"}
      </button>
    </section>
  );
}
