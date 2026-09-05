"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export function FeatureComparison({
  className,
  title = "Compare the details.",
  onSelect,
}: {
  className?: string;
  title?: string;
  onSelect?: (plan: string) => void;
}) {
  const [message, setMessage] = React.useState("");
  return (
    <section className={cn("py-8", className)}>
      <h2 className="text-4xl tracking-tight">{title}</h2>
      <p className="mt-4 text-sm text-muted-foreground">
        Illustrative plans · GBP per workspace, billed monthly.
      </p>
      <div
        role="region"
        aria-label="Plan features"
        tabIndex={0}
        className="mt-8 overflow-x-auto"
      >
        <table className="w-full min-w-[540px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Personal and Studio pricing and feature comparison
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="p-4">
                Included
              </th>
              {["Personal", "Studio"].map((p, i) => (
                <th
                  scope="col"
                  key={p}
                  className={cn("p-4", i === 1 && "bg-muted")}
                >
                  <span className="block text-lg">{p}</span>
                  <span className="mt-2 block text-3xl font-normal">
                    £{i ? 32 : 8}
                    <span className="text-xs"> / month</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Workspace", "Projects", "3", "Unlimited"],
              ["", "Collaborators", "1", "Unlimited"],
              ["Publishing", "Custom domains", "1", "Unlimited"],
              ["", "Remove branding", "No", "Yes"],
              ["Support", "Version history", "7 days", "Unlimited"],
              ["", "Support channel", "Community", "Priority email"],
            ].map((r, i) => (
              <tr key={i} className="border-b border-border">
                <th scope="row" className="p-4 font-normal">
                  {r[0] && (
                    <span className="mb-2 block font-semibold">{r[0]}</span>
                  )}
                  {r[1]}
                </th>
                <td className="p-4">{r[2]}</td>
                <td className="bg-muted p-4">{r[3]}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td className="p-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    onSelect
                      ? onSelect("Personal")
                      : setMessage(
                          "Personal selected. Demo only; no purchase made.",
                        )
                  }
                >
                  Choose Personal
                </Button>
              </td>
              <td className="bg-muted p-4">
                <Button
                  onClick={() =>
                    onSelect
                      ? onSelect("Studio")
                      : setMessage(
                          "Studio selected. Demo only; no purchase made.",
                        )
                  }
                >
                  Choose Studio
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p role="status" className="mt-4 text-sm">
        {message}
      </p>
    </section>
  );
}
