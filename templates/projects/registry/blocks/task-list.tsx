"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { useControllable } from "../ui/use-controllable";
import { initialTasks, type DemoTask } from "./kanban-board";
import { Checkbox } from "../ui/checkbox";
const TaskListContext = React.createContext<{
  tasks: DemoTask[];
  toggle: (id: string, checked: boolean) => void;
} | null>(null);
const TaskListItemContext = React.createContext<DemoTask | null>(null);
function useTaskListItem() {
  const list = React.useContext(TaskListContext);
  const task = React.useContext(TaskListItemContext);
  if (!list || !task)
    throw new Error(
      "TaskListCheckbox, TaskListTitle and TaskListStatus require a TaskListItem with taskId inside TaskList.",
    );
  return { ...list, task };
}
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
      <TaskListContext.Provider
        value={{
          tasks,
          toggle: (id, checked) =>
            setTasks((tasks) =>
              tasks.map((task) =>
                task.id === id
                  ? { ...task, status: checked ? "Done" : "To do" }
                  : task,
              ),
            ),
        }}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            {tasks.map((t) => (
              <TaskListItem key={t.id} taskId={t.id}>
                <TaskListCheckbox />
                <TaskListTitle />
                <TaskListStatus />
              </TaskListItem>
            ))}
          </>
        )}
      </TaskListContext.Provider>
    </ul>
  );
}

export function TaskListItem({
  className,
  taskId,
  ...props
}: React.ComponentProps<"li"> & { taskId?: string }) {
  const list = React.useContext(TaskListContext);
  const task = list?.tasks.find((task) => task.id === taskId);
  if (taskId !== undefined && !task)
    throw new Error(`TaskListItem could not find task ${taskId} in TaskList.`);
  return (
    <TaskListItemContext.Provider value={task ?? null}>
      <li
        data-slot="task-list-item"
        className={cn(
          "flex items-center gap-3 border-b border-border/60 px-4 py-4 last:border-0 hover:bg-muted/25",
          className,
        )}
        {...props}
      />
    </TaskListItemContext.Provider>
  );
}

export function TaskListCheckbox({
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof Checkbox>) {
  const { task, toggle } = useTaskListItem();
  return (
    <Checkbox
      aria-label={`Complete ${task.title}`}
      checked={task.status === "Done"}
      {...props}
      onCheckedChange={(checked) => {
        toggle(task.id, checked === true);
        onCheckedChange?.(checked);
      }}
    />
  );
}
export function TaskListTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { task } = useTaskListItem();
  return (
    <span
      data-slot="task-list-title"
      className={cn(
        "flex-1 text-sm",
        task.status === "Done" && "line-through text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children === undefined ? task.title : children}
    </span>
  );
}
export function TaskListStatus({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { task } = useTaskListItem();
  return (
    <span
      data-slot="task-list-status"
      className={cn(
        "hidden rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground sm:inline",
        className,
      )}
      {...props}
    >
      {children === undefined ? task.status : children}
    </span>
  );
}
