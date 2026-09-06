"use client";
import * as React from "react";
import {
  GripVertical,
  Plus,
  Circle,
  CircleDashed,
  CircleCheck,
  RotateCcw,
} from "lucide-react";
import { cn } from "../ui/utils";
import { useControllable } from "../ui/use-controllable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export type DemoTask = { id: string; title: string; status: string };
export const initialTasks: DemoTask[] = [
  { id: "1", title: "Explore homepage directions", status: "To do" },
  { id: "2", title: "Build the component preview", status: "In progress" },
  { id: "3", title: "Review keyboard navigation", status: "In progress" },
  { id: "4", title: "Write the project brief", status: "Done" },
];
const defaultStatuses = ["To do", "In progress", "Done"];
const statusIcons = [CircleDashed, Circle, CircleCheck];
export type KanbanBoardOptions = {
  className?: string;
  value?: DemoTask[];
  defaultValue?: DemoTask[];
  onValueChange?: (value: DemoTask[]) => void;
  statuses?: typeof defaultStatuses;
};
export type KanbanBoardProps = Omit<
  React.ComponentProps<"section">,
  keyof KanbanBoardOptions
> &
  KanbanBoardOptions;

function useKanbanBoardModel({
  statuses = defaultStatuses,
  className,
  value: controlledValue,
  defaultValue = initialTasks,
  onValueChange,
  children,
  ...rootProps
}: KanbanBoardProps) {
  const [tasks, setTasks] = useControllable<DemoTask[]>(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const reset = () => setTasks(defaultValue);
  const [title, setTitle] = React.useState("");
  const [dragging, setDragging] = React.useState<string>();
  const [over, setOver] = React.useState<string>();
  const [announcement, setAnnouncement] = React.useState("");
  function move(id: string, status: string) {
    if (!statuses.includes(status) || !tasks.some((t) => t.id === id)) return;
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, status } : x)));
    setAnnouncement(
      `${tasks.find((t) => t.id === id)?.title} moved to ${status}.`,
    );
    setDragging(undefined);
    setOver(undefined);
  }
  return {
    statuses,
    className,
    controlledValue,
    defaultValue,
    onValueChange,
    children,
    rootProps,
    tasks,
    setTasks,
    reset,
    title,
    setTitle,
    dragging,
    setDragging,
    over,
    setOver,
    announcement,
    setAnnouncement,
    move,
  };
}
const KanbanBoardCompositionContext = React.createContext<ReturnType<
  typeof useKanbanBoardModel
> | null>(null);
function useKanbanBoardComposition() {
  const context = React.useContext(KanbanBoardCompositionContext);
  if (!context)
    throw new Error("KanbanBoard parts must be inside KanbanBoard.");
  return context;
}
export function KanbanBoard(props: KanbanBoardProps) {
  const model = useKanbanBoardModel(props);
  const { className, rootProps, children } = model;
  return (
    <KanbanBoardCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("grid gap-5", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <KanbanBoardComposer />
            <KanbanBoardColumns />
            <KanbanBoardFooter />
            <KanbanBoardStatus />
          </>
        )}
      </section>
    </KanbanBoardCompositionContext.Provider>
  );
}

export function KanbanBoardForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="kanban-board-form"
      className={cn("flex max-w-xl gap-2", className)}
      {...props}
    />
  );
}
export function KanbanBoardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban-board-content"
      className={cn("grid gap-5 lg:grid-cols-3", className)}
      {...props}
    />
  );
}
export function KanbanBoardItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="kanban-board-itemtitle"
      className={cn(
        "mb-4 flex items-center gap-2 px-1 py-1 text-sm font-medium",
        className,
      )}
      {...props}
    />
  );
}
export function KanbanBoardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban-board-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className,
      )}
      {...props}
    />
  );
}
export function KanbanBoardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="kanban-board-description"
      className={cn("sr-only", className)}
      {...props}
    />
  );
}

export function KanbanBoardItem({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="kanban-board-item"
      className={cn(
        "min-h-72 rounded-xl border border-transparent bg-muted/35 p-3 transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function KanbanBoardComposer({
  children,
  ...props
}: Partial<React.ComponentProps<typeof KanbanBoardForm>> & {
  children?: React.ReactNode;
}) {
  const { statuses, setTasks, title, setTitle } = useKanbanBoardComposition();
  const defaultonSubmit: NonNullable<
    React.ComponentProps<typeof KanbanBoardForm>["onSubmit"]
  > = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTasks((t) => [
        ...t,
        {
          id: crypto.randomUUID(),
          title: title.trim(),
          status: statuses[0] ?? "To do",
        },
      ]);
      setTitle("");
    }
  };
  return (
    <KanbanBoardForm
      {...props}
      onSubmit={(event) => {
        props.onSubmit?.(event);
        if (!event.defaultPrevented) defaultonSubmit(event);
      }}
    >
      {children === undefined ? (
        <>
          <Input
            aria-label="New task title"
            placeholder="What needs doing?"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit">
            <Plus size={16} />
            Add task
          </Button>
        </>
      ) : (
        children
      )}
    </KanbanBoardForm>
  );
}
export function KanbanBoardColumns({
  children,
  ...props
}: Partial<React.ComponentProps<typeof KanbanBoardContent>> & {
  children?: React.ReactNode;
}) {
  const {
    statuses,
    tasks,
    setTasks,
    dragging,
    setDragging,
    over,
    setOver,
    move,
  } = useKanbanBoardComposition();
  return (
    <KanbanBoardContent {...props}>
      {children === undefined
        ? statuses.map((status, index) => {
            const Icon = statusIcons[index] ?? Circle;
            const column = tasks.filter((t) => t.status === status);
            return (
              <KanbanBoardItem
                key={status}
                aria-label={status}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  setOver(status);
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node))
                    setOver(undefined);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  move(e.dataTransfer.getData("text/plain"), status);
                }}
                className={cn(
                  over === status && "border-primary/40 bg-primary/5",
                )}
              >
                <KanbanBoardItemTitle>
                  <Icon
                    size={16}
                    className={cn(
                      index === 1 ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {status}
                  <span className="ml-1 text-xs text-muted-foreground">
                    {column.length}
                  </span>
                </KanbanBoardItemTitle>
                <div className="grid gap-2.5">
                  {column.map((t) => (
                    <article
                      key={t.id}
                      className={cn(
                        "group rounded-lg border border-border bg-background p-3.5 shadow-xs transition-opacity",
                        dragging === t.id && "opacity-40",
                      )}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-mono text-xs text-muted-foreground">
                          PRJ-
                          {t.id.length > 6
                            ? t.id.slice(0, 4).toUpperCase()
                            : String(Number(t.id) + 100)}
                        </span>
                        <button
                          type="button"
                          draggable
                          aria-label={`Drag ${t.title}`}
                          title="Drag to another column, or use the status menu below"
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", t.id);
                            e.dataTransfer.effectAllowed = "move";
                            setDragging(t.id);
                          }}
                          onDragEnd={() => {
                            setDragging(undefined);
                            setOver(undefined);
                          }}
                          className="-m-1 cursor-grab rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing"
                        >
                          <GripVertical size={16} />
                        </button>
                      </div>
                      <input
                        aria-label={`Edit task ${t.title}`}
                        value={t.title}
                        onChange={(e) =>
                          setTasks((v) =>
                            v.map((x) =>
                              x.id === t.id
                                ? { ...x, title: e.target.value }
                                : x,
                            ),
                          )
                        }
                        className="mb-4 w-full min-w-0 rounded bg-transparent py-1 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-3">
                        <select
                          aria-label={`Status for ${t.title}`}
                          value={t.status}
                          onChange={(e) => move(t.id, e.target.value)}
                          className="max-w-full cursor-pointer rounded-md border-0 bg-muted/70 px-2 py-1 text-xs text-muted-foreground"
                        >
                          {statuses.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                        <span
                          className="grid size-6 place-items-center rounded-full border border-border bg-muted text-xs"
                          title="Alex Morgan"
                        >
                          AM
                        </span>
                      </div>
                    </article>
                  ))}
                  {!column.length && (
                    <div
                      className={cn(
                        "grid min-h-40 place-items-center rounded-lg border border-dashed border-border text-sm text-muted-foreground",
                        dragging && "border-primary/40",
                      )}
                    >
                      Drop a task here
                    </div>
                  )}
                </div>
              </KanbanBoardItem>
            );
          })
        : children}
    </KanbanBoardContent>
  );
}
export function KanbanBoardFooter({
  children,
  ...props
}: Partial<React.ComponentProps<typeof KanbanBoardHeader>> & {
  children?: React.ReactNode;
}) {
  const { reset } = useKanbanBoardComposition();
  return (
    <KanbanBoardHeader {...props}>
      {children === undefined ? (
        <>
          <p className="text-xs text-muted-foreground">
            Drag using the grip, or change a task’s status from its menu.
          </p>
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw size={13} />
            Reset changes
          </Button>
        </>
      ) : (
        children
      )}
    </KanbanBoardHeader>
  );
}
export function KanbanBoardStatus({
  children,
  ...props
}: Partial<React.ComponentProps<typeof KanbanBoardDescription>> & {
  children?: React.ReactNode;
}) {
  const { announcement } = useKanbanBoardComposition();
  return (
    <KanbanBoardDescription role="status" {...props}>
      {children === undefined ? announcement : children}
    </KanbanBoardDescription>
  );
}
