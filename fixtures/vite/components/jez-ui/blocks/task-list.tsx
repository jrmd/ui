"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { useDemoState } from "./demo-state";
import { initialTasks } from "./kanban-board";
import { Checkbox } from "../ui/checkbox";
export function TaskList({ className }: { className?: string }) {
  const [tasks, setTasks] = useDemoState("tasks", initialTasks);
  return (
    <ul
      className={cn(
        "grid overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      {tasks.map((t) => (
        <li
          key={t.id}
          className="flex items-center gap-3 border-b border-border/60 px-4 py-4 last:border-0 hover:bg-muted/25"
        >
          <Checkbox
            aria-label={`Complete ${t.title}`}
            checked={t.status === "Done"}
            onCheckedChange={(checked) =>
              setTasks((v) =>
                v.map((x) =>
                  x.id === t.id
                    ? { ...x, status: checked ? "Done" : "To do" }
                    : x,
                ),
              )
            }
          />
          <span
            className={cn(
              "flex-1 text-sm",
              t.status === "Done" && "line-through text-muted-foreground",
            )}
          >
            {t.title}
          </span>
          <span className="hidden rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground sm:inline">
            {t.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
