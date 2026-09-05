"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function ProductComparison({ className }: { className?: string }) {
  return (
    <section className={cn("overflow-x-auto py-8", className)}>
      <h2 className="mb-6 text-3xl">A clearer way to work.</h2>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Workflow comparison</caption>
        <thead>
          <tr className="border-b border-border">
            <th className="p-3">Task</th>
            <th className="p-3">Scattered workflow</th>
            <th className="p-3">Shared workspace</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Find context", "Search multiple tools", "Open the project"],
            ["Track a decision", "Ask in a message", "Read the decision log"],
            [
              "Plan next week",
              "Rebuild a spreadsheet",
              "Update the shared plan",
            ],
          ].map((r) => (
            <tr key={r[0]} className="border-b border-border">
              {r.map((c, i) => (
                <td key={i} className="p-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
