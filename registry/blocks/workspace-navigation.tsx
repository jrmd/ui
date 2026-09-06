"use client";
import * as React from "react";
import {
  Layers,
  ChevronRight,
  Plus,
  LayoutGrid,
  List,
  CalendarDays,
  Settings2,
} from "lucide-react";
import { useControllable } from "../ui/use-controllable";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export type WorkspaceNavigationOptions = {
  className?: string;
  onViewChange?: (view: string) => void;
  onCreate?: () => void;
  items?: typeof WorkspaceNavigationDefaultItems;
  views?: typeof WorkspaceNavigationDefaultViews;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export type WorkspaceNavigationProps = Omit<
  React.ComponentProps<"div">,
  keyof WorkspaceNavigationOptions
> &
  WorkspaceNavigationOptions;
const WorkspaceNavigationDefaultItems = ["AM", "SP", "RL"];
const WorkspaceNavigationDefaultViews = [
  { label: "Board", icon: LayoutGrid },
  { label: "List", icon: List },
  { label: "Calendar", icon: CalendarDays },
  { label: "Settings", icon: Settings2 },
];
function useWorkspaceNavigationModel({
  value: suppliedValue,
  defaultValue = "Board",
  onValueChange,
  items = WorkspaceNavigationDefaultItems,
  views = WorkspaceNavigationDefaultViews,
  className,
  onViewChange,
  onCreate,
  children,
  ...rootProps
}: WorkspaceNavigationProps) {
  const [view, setView] = useControllable<string>(
    suppliedValue,
    defaultValue,
    onValueChange,
  );
  const [notice, setNotice] = React.useState("");
  return {
    suppliedValue,
    defaultValue,
    onValueChange,
    items,
    views,
    className,
    onViewChange,
    onCreate,
    children,
    rootProps,
    view,
    setView,
    notice,
    setNotice,
  };
}
const WorkspaceNavigationCompositionContext = React.createContext<ReturnType<
  typeof useWorkspaceNavigationModel
> | null>(null);
function useWorkspaceNavigationComposition() {
  const context = React.useContext(WorkspaceNavigationCompositionContext);
  if (!context)
    throw new Error(
      "WorkspaceNavigation parts must be inside WorkspaceNavigation.",
    );
  return context;
}
export function WorkspaceNavigation(props: WorkspaceNavigationProps) {
  const model = useWorkspaceNavigationModel(props);
  const { className, rootProps, children } = model;
  return (
    <WorkspaceNavigationCompositionContext.Provider value={model}>
      <div
        {...rootProps}
        className={cn(
          "rounded-xl border border-border bg-background",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <WorkspaceNavigationToolbar />
            <WorkspaceNavigationViews />
            <WorkspaceNavigationStatus />
          </>
        )}
      </div>
    </WorkspaceNavigationCompositionContext.Provider>
  );
}

export function WorkspaceNavigationHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="workspace-navigation-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 px-5 py-4",
        className,
      )}
      {...props}
    />
  );
}
export function WorkspaceNavigationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="workspace-navigation-content"
      className={cn(
        "flex gap-5 overflow-x-auto border-t border-border px-5",
        className,
      )}
      {...props}
    />
  );
}

export function WorkspaceNavigationItem({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="workspace-navigation-item"
      className={cn(
        "flex shrink-0 items-center gap-2 border-b-2 py-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function WorkspaceNavigationToolbar({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WorkspaceNavigationHeader>> & {
  children?: React.ReactNode;
}) {
  const { items, onCreate, setNotice } = useWorkspaceNavigationComposition();
  return (
    <WorkspaceNavigationHeader {...props}>
      {children === undefined ? (
        <>
          <div className="flex min-w-0 items-center gap-2.5 text-sm">
            <Layers size={18} />
            <span className="text-muted-foreground">Acme</span>
            <ChevronRight size={13} className="text-muted-foreground" />
            <span className="truncate font-medium">Website refresh</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden -space-x-2 sm:flex">
              {items.map((v) => (
                <span
                  key={v}
                  className="grid size-7 place-items-center rounded-full border-2 border-background bg-muted text-xs"
                >
                  {v}
                </span>
              ))}
            </div>
            <Button
              size="sm"
              onClick={() => {
                if (onCreate) onCreate();
                else setNotice("New project action selected.");
              }}
            >
              <Plus size={14} />
              New project
            </Button>
          </div>
        </>
      ) : (
        children
      )}
    </WorkspaceNavigationHeader>
  );
}
export function WorkspaceNavigationViews({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WorkspaceNavigationContent>> & {
  children?: React.ReactNode;
}) {
  const { views, onViewChange, view, setView } =
    useWorkspaceNavigationComposition();
  return (
    <WorkspaceNavigationContent
      role="tablist"
      aria-label="Project view"
      {...props}
    >
      {children === undefined
        ? views.map((item, i) => (
            <WorkspaceNavigationItem
              key={item.label}
              role="tab"
              aria-selected={view === item.label}
              tabIndex={view === item.label ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const siblings =
                    e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                      '[role="tab"]',
                    );
                  const next =
                    siblings?.[(i + (e.key === "ArrowRight" ? 1 : 3)) % 4];
                  next?.focus();
                  next?.click();
                }
              }}
              onClick={() => {
                setView(item.label);
                onViewChange?.(item.label);
              }}
              className={cn(
                view === item.label
                  ? "border-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon size={15} />
              {item.label}
            </WorkspaceNavigationItem>
          ))
        : children}
    </WorkspaceNavigationContent>
  );
}
export function WorkspaceNavigationStatus({
  children,
}: React.PropsWithChildren) {
  const { notice } = useWorkspaceNavigationComposition();
  return children === undefined
    ? notice && (
        <p
          role="status"
          className="border-t border-border p-4 text-xs text-muted-foreground"
        >
          {notice}
        </p>
      )
    : children;
}
