"use client";
import * as React from "react";
import {
  Check,
  Circle,
  CircleDashed,
  LayoutList,
  Rows3,
  Search,
  ArrowUpRight,
  X,
} from "lucide-react";
import { cn } from "../ui/utils";

const initialTasks = [
  {
    id: "FRM-24",
    title: "Map the first-run experience",
    owner: "Alex",
    initials: "AM",
    date: "Sep 08",
    status: "Done",
    team: "Design",
    note: "The first-run flow is ready for review. Account setup, workspace creation, and the empty project state are included.",
  },
  {
    id: "FRM-25",
    title: "Build the project switcher",
    owner: "Sam",
    initials: "SK",
    date: "Sep 09",
    status: "In progress",
    team: "Engineering",
    note: "Support recent projects, keyboard navigation, and searching by project name. Keep the current project visible in the trigger.",
  },
  {
    id: "FRM-26",
    title: "Review keyboard navigation",
    owner: "Jo",
    initials: "JL",
    date: "Sep 10",
    status: "In progress",
    team: "Design",
    note: "Check the complete journey without a mouse: create a project, add a task, assign an owner, and return to the project list.",
  },
  {
    id: "FRM-27",
    title: "Write the release notes",
    owner: "Alex",
    initials: "AM",
    date: "Sep 11",
    status: "Planned",
    team: "Product",
    note: "Cover the project switcher, new shortcuts, and improvements to the empty states. Include a short migration note for existing workspaces.",
  },
  {
    id: "FRM-28",
    title: "Ship the workspace update",
    owner: "Sam",
    initials: "SK",
    date: "Sep 12",
    status: "Planned",
    team: "Engineering",
    note: "Release after the keyboard review is complete. Check the sign-in journey and project creation after deployment.",
  },
];
const views = [
  { name: "List", icon: LayoutList },
  { name: "Timeline", icon: Rows3 },
];
export function ProjectPreview({ className }: { className?: string }) {
  const [tasks, setTasks] = React.useState(initialTasks);
  const [view, setView] = React.useState("List");
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>(null);
  const [mine, setMine] = React.useState(false);
  const active = tasks.find((t) => t.id === selected);
  const filtered = tasks.filter(
    (t) =>
      (!mine || t.owner === "Alex") &&
      `${t.title} ${t.id} ${t.owner}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const complete = tasks.filter((t) => t.status === "Done").length;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background text-foreground",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 text-xs">
        <span className="flex items-center gap-2 font-medium">
          <span className="grid size-5 place-items-center rounded bg-primary text-primary-foreground">
            F
          </span>{" "}
          Forma <span className="mx-2 text-border">/</span>
          <span className="text-muted-foreground">Workspace</span>
        </span>
        <span className="text-muted-foreground">Interactive demo</span>
      </div>
      <div className="grid md:grid-cols-[170px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border bg-muted/35 p-3 md:block">
          <div className="flex items-center gap-2 px-2 py-3 text-xs text-muted-foreground">
            <Rows3 size={14} /> Projects
          </div>
          <div className="rounded-md bg-muted px-2 py-2 text-xs font-medium">
            Workspace launch
          </div>
          <p className="mt-7 px-2 text-[11px] text-muted-foreground">
            Project team
          </p>
          {[
            ["AM", "Alex Morgan"],
            ["SK", "Sam Kim"],
            ["JL", "Jo Lee"],
          ].map(([initials, name]) => (
            <div
              key={name}
              className="mt-3 flex items-center gap-2 px-2 text-xs"
            >
              <span className="grid size-6 place-items-center rounded-full bg-muted text-[9px]">
                {initials}
              </span>
              {name}
            </div>
          ))}
          <div className="mt-12 border-t border-border px-2 pt-4 text-[11px] leading-relaxed text-muted-foreground">
            A sample project.
            <br />
            Changes stay in this preview.
          </div>
        </aside>
        <div className="min-w-0">
          <header className="flex flex-wrap items-start justify-between gap-4 px-5 pb-5 pt-7 md:px-7">
            <div>
              <h3 className="text-xl font-medium">Workspace launch</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                The next release, from first sketch to shipped.
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
              <Circle size={7} fill="currentColor" />{" "}
              {complete === tasks.length ? "Complete" : "In progress"}
            </span>
          </header>
          <div className="mx-5 mb-6 flex items-center gap-3 md:mx-7">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-[width] motion-reduce:transition-none"
                style={{ width: `${(complete / tasks.length) * 100}%` }}
              />
            </div>
            <span
              className="text-[11px] tabular-nums text-muted-foreground"
              aria-live="polite"
            >
              {complete} of {tasks.length} complete
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border px-5 py-2 md:px-7">
            <div className="flex items-center gap-1" aria-label="Project view">
              {views.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={view === name}
                  onClick={() => setView(name)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs",
                    view === name
                      ? "bg-muted font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon size={13} />
                  {name}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={mine}
              onClick={() => setMine(!mine)}
              className={cn(
                "rounded-md px-2 py-1.5 text-xs",
                mine
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              Assigned to me
            </button>
          </div>
          <label className="mx-5 my-3 flex items-center gap-2 text-muted-foreground md:mx-7">
            <Search size={14} />
            <input
              aria-label="Search project tasks"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks…"
              className="min-w-0 flex-1 bg-transparent py-1 text-xs text-foreground"
            />
          </label>
          <div className="min-h-[255px]" aria-label={`${view} view`}>
            {filtered.length === 0 ? (
              <div className="px-7 py-12 text-center">
                <p className="text-sm">No tasks match this view.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setMine(false);
                  }}
                  className="mt-2 text-xs text-primary underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((task) => (
                <div
                  key={task.id}
                  className="group flex flex-wrap items-center gap-3 border-t border-border/60 px-5 py-3 hover:bg-muted/40 md:px-7"
                >
                  <button
                    type="button"
                    aria-label={`${task.status === "Done" ? "Reopen" : "Complete"} ${task.title}`}
                    onClick={() =>
                      setTasks(
                        tasks.map((t) =>
                          t.id === task.id
                            ? {
                                ...t,
                                status:
                                  t.status === "Done" ? "Planned" : "Done",
                              }
                            : t,
                        ),
                      )
                    }
                    className={cn(
                      "-m-1.5 shrink-0 rounded-full p-1.5",
                      task.status === "Done"
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {task.status === "Done" ? (
                      <Check size={16} />
                    ) : task.status === "In progress" ? (
                      <CircleDashed size={16} />
                    ) : (
                      <Circle size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(task.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="mr-3 hidden text-[10px] tabular-nums text-muted-foreground lg:inline">
                      {task.id}
                    </span>
                    <span
                      className={cn(
                        "text-xs",
                        task.status === "Done" && "text-muted-foreground",
                      )}
                    >
                      {task.title}
                    </span>
                  </button>
                  {view === "Timeline" ? (
                    <div
                      className="order-last grid w-full grid-cols-5 gap-1 sm:order-none sm:w-36"
                      aria-label={`Due ${task.date}`}
                    >
                      {Array.from({ length: 5 }, (_, day) => (
                        <span
                          key={day}
                          className={cn(
                            "grid h-5 place-items-center rounded-sm text-[9px] text-foreground",
                            day <= tasks.indexOf(task) &&
                              day >= Math.max(0, tasks.indexOf(task) - 1)
                              ? "bg-primary/40"
                              : "bg-muted",
                          )}
                        >
                          {8 + day}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="hidden text-[10px] text-muted-foreground sm:inline">
                      {task.date}
                    </span>
                  )}
                  <span
                    title={task.owner}
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-[9px]"
                  >
                    {task.initials}
                  </span>
                  <button
                    type="button"
                    aria-label={`Open ${task.title}`}
                    onClick={() => setSelected(task.id)}
                    className="-m-1.5 rounded p-1.5 text-muted-foreground hover:text-primary"
                  >
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          {active && (
            <section
              aria-label="Task details"
              className="border-t border-border bg-muted/30 px-5 py-5 md:px-7"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {active.id} · {active.team} · {active.owner}
                  </p>
                  <h4 className="mt-2 text-sm font-medium">{active.title}</h4>
                </div>
                <button
                  type="button"
                  aria-label="Close task details"
                  onClick={() => setSelected(null)}
                  className="self-start rounded p-1 hover:bg-muted"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
                {active.note}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
