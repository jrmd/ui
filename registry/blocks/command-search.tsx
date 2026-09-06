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
function useCommandSearchModel({
  commands = CommandSearchDefaultCommands,
  className,
  children,
  ...rootProps
}: CommandSearchProps) {
  const [message, setMessage] = React.useState("");
  return { commands, className, children, rootProps, message, setMessage };
}
const CommandSearchCompositionContext = React.createContext<ReturnType<
  typeof useCommandSearchModel
> | null>(null);
function useCommandSearchComposition() {
  const context = React.useContext(CommandSearchCompositionContext);
  if (!context)
    throw new Error("CommandSearch parts must be inside CommandSearch.");
  return context;
}
export function CommandSearch(props: CommandSearchProps) {
  const model = useCommandSearchModel(props);
  const { className, rootProps, children } = model;
  return (
    <CommandSearchCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("grid gap-4", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <CommandSearchPalette />
            <CommandSearchStatus />
          </>
        )}
      </section>
    </CommandSearchCompositionContext.Provider>
  );
}

export function CommandSearchPalette({
  children,
  ...props
}: Partial<React.ComponentProps<typeof CommandPalette>> & {
  children?: React.ReactNode;
}) {
  const { commands, setMessage } = useCommandSearchComposition();
  return children === undefined ? (
    <CommandPalette
      items={commands.map((label) => ({
        label,
        group: "Workspace",
        onSelect: () => setMessage(`${label} selected in this demo.`),
      }))}
      {...props}
    />
  ) : (
    children
  );
}
export function CommandSearchStatus({ children }: React.PropsWithChildren) {
  const { message } = useCommandSearchComposition();
  return children === undefined
    ? message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )
    : children;
}
