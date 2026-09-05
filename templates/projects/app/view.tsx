"use client";
import * as React from "react";
import { MarketingNavigation } from "@registry/blocks/marketing-navigation";
import { MarketingFooter } from "@registry/blocks/marketing-footer";
import { ApplicationShell } from "@registry/blocks/application-shell";
export type TemplateProps = {
  route?: string;
  basePath?: string;
  assetBase?: string;
};
function name(p: string) {
  return p
    .split("/")[0]
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
function Marketing({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  const items = nav.map((p) => ({ label: name(p), href: basePath + "/" + p }));
  return (
    <div className="template-design template-design-projects template-marketing mx-auto max-w-7xl px-5 md:px-10">
      <MarketingNavigation brand={brand} home={basePath + "/"} items={items} />
      {children}
      <MarketingFooter brand={brand} items={items} />
    </div>
  );
}
function Workspace({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  return (
    <ApplicationShell
      className="template-design template-design-projects"
      brand={brand}
      items={[
        { label: "Overview", href: basePath + "/" },
        ...nav.map((p) => ({ label: name(p), href: basePath + "/" + p })),
      ]}
    >
      {children}
    </ApplicationShell>
  );
}
function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <header className="pb-7 pt-2">
      <h1 className="font-display text-2xl tracking-tight sm:text-3xl">
        {title}
      </h1>
      {text && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{text}</p>
      )}
    </header>
  );
}
import { KanbanBoard, initialTasks } from "@registry/blocks/kanban-board";
import { TaskList } from "@registry/blocks/task-list";
import { TeamManagement } from "@registry/blocks/team-management";
import { ProfileSettings } from "@registry/blocks/profile-settings";
import { ActivityFeed } from "@registry/blocks/activity-feed";
import { useDemoState } from "@registry/blocks/demo-state";
import { Input } from "@registry/ui/input";
import { Button } from "@registry/ui/button";
export function TemplateView({ route = "", basePath = "" }: TemplateProps) {
  const [tasks, setTasks] = useDemoState("tasks", initialTasks);
  const [saved, setSaved] = React.useState(false);
  const task = tasks.find((t) => t.id === "1");
  return (
    <Workspace
      brand="Common"
      basePath={basePath}
      nav={["board", "list", "task/1", "team", "settings"]}
    >
      <PageTitle
        title={
          route === "board"
            ? "Website refresh"
            : route === "list"
              ? "All tasks"
              : route === "team"
                ? "Team"
                : route === "settings"
                  ? "Settings"
                  : route.startsWith("task/")
                    ? "Task details"
                    : "Good morning, Alex."
        }
        text="Your projects, decisions, and next steps in one place."
      />
      {route === "board" ? (
        <KanbanBoard />
      ) : route === "list" ? (
        <TaskList />
      ) : route === "team" ? (
        <TeamManagement />
      ) : route === "settings" ? (
        <ProfileSettings />
      ) : route.startsWith("task/") ? (
        <form
          className="grid max-w-xl gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <label className="grid gap-2 text-sm">
            Task title
            <Input
              required
              value={task?.title ?? ""}
              onChange={(e) => {
                setTasks((t) =>
                  t.map((x) =>
                    x.id === "1" ? { ...x, title: e.target.value } : x,
                  ),
                );
                setSaved(false);
              }}
            />
          </label>
          <label className="grid gap-2 text-sm">
            Status
            <select
              className="rounded-xl border border-border bg-background p-3"
              value={task?.status}
              onChange={(e) =>
                setTasks((t) =>
                  t.map((x) =>
                    x.id === "1" ? { ...x, status: e.target.value } : x,
                  ),
                )
              }
            >
              {["To do", "In progress", "Done"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <Button type="submit">Save task</Button>
          {saved && <p role="status">Saved on this device.</p>}
        </form>
      ) : (
        <>
          <div className="template-project-shortcuts mb-10 grid gap-5 md:grid-cols-[1.4fr_1fr]">
            <a
              href={basePath + "/board"}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <h2 className="text-xl font-medium">Website refresh</h2>
              <p className="mt-3 text-sm">
                {tasks.filter((t) => t.status !== "Done").length} tasks in
                motion →
              </p>
            </a>
            <a
              href={basePath + "/list"}
              className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/50"
            >
              <h2 className="text-xl font-medium">Your task list</h2>
              <p className="mt-3 text-sm">A clear view of every next step →</p>
            </a>
          </div>
          <div className="grid gap-7 xl:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="mb-4 text-sm font-semibold">Assigned to you</h2>
              <TaskList />
            </div>
            <ActivityFeed />
          </div>
        </>
      )}
    </Workspace>
  );
}
