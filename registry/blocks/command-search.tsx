"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { CommandPalette } from "../ui/command-palette";
export type CommandSearchOptions = {
  className?: string;
  commands?: typeof CommandSearchDefaultCommands;
};
export type CommandSearchProps = Omit<
  React.ComponentProps<"section">,
  keyof CommandSearchOptions
> &
  CommandSearchOptions;
const CommandSearchDefaultCommands = [
  "Create project",
  "Open settings",
  "View notifications",
  "Export report",
];
export function CommandSearch({
  commands = CommandSearchDefaultCommands,
  className,
  children,
  ...rootProps
}: CommandSearchProps) {
  const [message, setMessage] = React.useState("");
  return (
    <section {...rootProps} className={cn("grid gap-4", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <CommandPalette
            items={commands.map((label) => ({
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
        </>
      )}
    </section>
  );
}
