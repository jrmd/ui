"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function PricingComparison({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-x-auto py-8", className)}>
      <table className="w-full text-left text-sm">
        <caption className="mb-5 text-left font-display text-3xl">
          Find your fit.
        </caption>
        <thead>
          <tr>
            {["Included", "Personal", "Team", "Studio"].map((h) => (
              <th className="p-3" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Projects", "3", "Unlimited", "Unlimited"],
            ["Guests", "1", "10", "Unlimited"],
            ["Version history", "7 days", "90 days", "Unlimited"],
            ["Support", "Community", "Email", "Priority"],
          ].map((r) => (
            <tr key={r[0]} className="border-t border-border">
              {r.map((v, i) => (
                <td key={i} className="p-3">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
