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
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
export function WorkspaceNavigation({
  className,
  onViewChange,
  onCreate,
}: {
  className?: string;
  onViewChange?: (view: string) => void;
  onCreate?: () => void;
}) {
  const [view, setView] = React.useState("Board");
  const [notice, setNotice] = React.useState("");
  return (
    <div
      className={cn("rounded-xl border border-border bg-background", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex min-w-0 items-center gap-2.5 text-sm">
          <Layers size={18} />
          <span className="text-muted-foreground">Acme</span>
          <ChevronRight size={13} className="text-muted-foreground" />
          <span className="truncate font-medium">Website refresh</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden -space-x-2 sm:flex">
            {["AM", "SP", "RL"].map((v) => (
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
      </div>
      <div
        role="tablist"
        aria-label="Project view"
        className="flex gap-5 overflow-x-auto border-t border-border px-5"
      >
        {[
          { label: "Board", icon: LayoutGrid },
          { label: "List", icon: List },
          { label: "Calendar", icon: CalendarDays },
          { label: "Settings", icon: Settings2 },
        ].map((item, i) => (
          <button
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
              "flex shrink-0 items-center gap-2 border-b-2 py-3 text-sm",
              view === item.label
                ? "border-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon size={15} />
            {item.label}
          </button>
        ))}
      </div>
      {notice && (
        <p
          role="status"
          className="border-t border-border p-4 text-xs text-muted-foreground"
        >
          {notice}
        </p>
      )}
    </div>
  );
}
