"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { CommandPalette } from "../ui/command-palette";
export function CommandSearch({ className }: { className?: string }) {
  const [message, setMessage] = React.useState("");
  return (
    <section className={cn("grid gap-4", className)}>
      <CommandPalette
        items={[
          "Create project",
          "Open settings",
          "View notifications",
          "Export report",
        ].map((label) => ({
          label,
          group: "Workspace",
          onSelect: () => setMessage(`${label} selected in this demo.`),
        }))}
      />
      {message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )}
    </section>
  );
}
