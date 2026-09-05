"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { useControllable } from "../ui/use-controllable";
import { initialTasks, type DemoTask } from "./kanban-board";
import { Checkbox } from "../ui/checkbox";
export type TaskListOptions = {
  className?: string;
  value?: DemoTask[];
  defaultValue?: DemoTask[];
  onValueChange?: (value: DemoTask[]) => void;
};
export type TaskListProps = Omit<
  React.ComponentProps<"ul">,
  keyof TaskListOptions
> &
  TaskListOptions;
export function TaskList({
  className,
  value: controlledValue,
  defaultValue = initialTasks,
  onValueChange,
  children,
  ...rootProps
}: TaskListProps) {
  const [tasks, setTasks] = useControllable<DemoTask[]>(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  return (
    <ul
      {...rootProps}
      className={cn(
        "grid overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          {tasks.map((t) => (
            <TaskListItem key={t.id}>
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
            </TaskListItem>
          ))}
        </>
      )}
    </ul>
  );
}

export function TaskListItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="task-list-item"
      className={cn(
        "flex items-center gap-3 border-b border-border/60 px-4 py-4 last:border-0 hover:bg-muted/25",
        className,
      )}
      {...props}
    />
  );
}
