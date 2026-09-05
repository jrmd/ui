"use client";
import * as React from "react";
import {
  Home,
  Inbox,
  Folder,
  Users,
  Settings,
  PanelLeftClose,
  Menu,
  X,
  Search,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import {
  OrganizationSwitcher,
  type Organization,
} from "./organization-switcher";
import { UserSwitcher, type SwitcherAccount } from "./user-switcher";
import { SidebarProvider } from "../ui/sidebar";
import { cn } from "../ui/utils";
const links = [
  { name: "Overview", icon: Home },
  { name: "Inbox", icon: Inbox },
  { name: "Projects", icon: Folder },
  { name: "Team", icon: Users },
  { name: "Settings", icon: Settings },
];
export function SidebarLayout({
  sidebar,
  organizations,
  accounts,
  onOrganizationChange,
  onAccountChange,
  onCreateOrganization,
  onAddAccount,
  onSignOut,
  variant = "workspace",
  className,
  children,
  onNavigate,
}: {
  sidebar?: React.ReactNode;
  organizations?: Organization[];
  accounts?: SwitcherAccount[];
  onOrganizationChange?: (id: string) => void;
  onAccountChange?: (id: string) => void;
  onCreateOrganization?: () => void;
  onAddAccount?: () => void;
  onSignOut?: () => void;
  variant?: "workspace" | "rail" | "inset";
  className?: string;
  children?: React.ReactNode;
  onNavigate?: (name: string) => void;
}) {
  const [current, setCurrent] = React.useState("Overview"),
    [mobile, setMobile] = React.useState(false),
    [collapsed, setCollapsed] = React.useState(false),
    [query, setQuery] = React.useState("");
  const rail = variant === "rail" || collapsed;
  return (
    <SidebarProvider
      open={!collapsed}
      onOpenChange={(open) => setCollapsed(!open)}
      openMobile={mobile}
      onOpenMobileChange={setMobile}
      className="contents"
    >
      <div
        className={cn(
          "relative flex min-h-[620px] overflow-hidden rounded-xl border border-border bg-muted/50",
          variant === "inset" && "md:p-2",
          className,
        )}
      >
        <aside
          data-state={rail && !mobile ? "collapsed" : "expanded"}
          className={cn(
            "group/sidebar absolute inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-background p-3 md:relative md:flex",
            mobile ? "flex w-64 shadow-xl" : "hidden",
            rail ? "md:w-[76px]" : "md:w-60",
            variant === "inset" && "md:border-0 md:bg-transparent",
          )}
        >
          {sidebar ?? (
            <>
              <OrganizationSwitcher
                items={organizations}
                onValueChange={onOrganizationChange}
                onCreate={onCreateOrganization}
                compact={rail && !mobile}
              />
              <button
                aria-label="Close sidebar"
                onClick={() => setMobile(false)}
                className="absolute right-1 top-1 rounded bg-background p-1 md:hidden"
              >
                <X size={14} />
              </button>
              {!rail && (
                <label className="mt-5 flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2">
                  <Search
                    size={14}
                    className="shrink-0 text-muted-foreground"
                  />
                  <input
                    aria-label="Filter navigation"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find a page…"
                    className="min-w-0 bg-transparent text-xs outline-none"
                  />
                </label>
              )}
              <nav aria-label="Workspace pages" className="mt-6 grid gap-1">
                {links
                  .filter(
                    (l) =>
                      rail ||
                      l.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map(({ name, icon: Icon }) => (
                    <button
                      key={name}
                      aria-label={name}
                      title={rail ? name : undefined}
                      aria-current={current === name ? "page" : undefined}
                      onClick={() => {
                        setCurrent(name);
                        setMobile(false);
                        onNavigate?.(name);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        rail && "justify-center px-2",
                        current === name
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon size={17} />
                      {!rail && (
                        <>
                          <span className="flex-1">{name}</span>
                          {name === "Inbox" && (
                            <span className="text-xs">4</span>
                          )}
                        </>
                      )}
                    </button>
                  ))}
                {!rail &&
                  !links.some((l) =>
                    l.name.toLowerCase().includes(query.toLowerCase()),
                  ) && (
                    <p className="p-3 text-xs text-muted-foreground">
                      No pages found.
                    </p>
                  )}
              </nav>
              {!rail && (
                <div className="mt-8 px-3">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Pinned projects
                  </p>
                  {["Website refresh", "Brand guidelines"].map((name, i) => (
                    <button
                      key={name}
                      onClick={() => {
                        setCurrent(name);
                        setMobile(false);
                        onNavigate?.(name);
                      }}
                      className="flex w-full items-center gap-2 py-2 text-left text-xs text-muted-foreground hover:text-foreground"
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-sm",
                          i ? "bg-[#b98d70]" : "bg-[#8c9d7a]",
                        )}
                      />
                      {name}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-auto border-t border-border pt-3">
                <UserSwitcher
                  items={accounts}
                  onValueChange={onAccountChange}
                  onAddAccount={onAddAccount}
                  onSignOut={onSignOut}
                  compact={rail && !mobile}
                />
              </div>
            </>
          )}
        </aside>
        {mobile && (
          <button
            aria-label="Dismiss sidebar"
            onClick={() => setMobile(false)}
            className="absolute inset-0 z-20 bg-black/25 md:hidden"
          />
        )}
        <div
          className={cn(
            "min-w-0 flex-1 bg-background",
            variant === "inset" && "rounded-lg border border-border shadow-sm",
          )}
        >
          <header className="flex h-16 items-center gap-3 border-b border-border px-5">
            <button
              aria-label="Open sidebar"
              onClick={() => setMobile(true)}
              className="p-1 md:hidden"
            >
              <Menu size={18} />
            </button>
            <button
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded p-1 text-muted-foreground hover:bg-muted md:block"
            >
              <PanelLeftClose size={17} />
            </button>
            <span className="text-xs text-muted-foreground">Workspace</span>
            <span className="text-border">/</span>
            <span className="truncate text-sm">{current}</span>
          </header>
          <main className="p-6 md:p-8">
            {children ?? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Your workspace, at a glance
                    </p>
                    <h1 className="mt-2 font-display text-2xl tracking-tight">
                      {current === "Overview"
                        ? "Make room for good work."
                        : current}
                    </h1>
                  </div>
                  <button
                    onClick={() => {
                      setCurrent("New project");
                      onNavigate?.("New project");
                    }}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs hover:bg-muted"
                  >
                    <Plus size={14} />
                    New project
                  </button>
                </div>
                {current === "New project" ? (
                  <form
                    className="mt-8 grid max-w-sm gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const name = new FormData(e.currentTarget)
                        .get("name")
                        ?.toString()
                        .trim();
                      if (name) setCurrent(name);
                    }}
                  >
                    <label className="grid gap-2 text-sm">
                      Project name
                      <input
                        name="name"
                        required
                        className="rounded-lg border border-border bg-background p-3"
                        placeholder="Untitled project"
                      />
                    </label>
                    <button className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                      Create project
                    </button>
                  </form>
                ) : (
                  <>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      A clear view of the projects and conversations moving your
                      team forward.
                    </p>
                    <div className="mt-9 divide-y divide-border border-y border-border">
                      {[
                        "Website refresh",
                        "Brand guidelines",
                        "Component library",
                      ].map((name, i) => (
                        <button
                          key={name}
                          onClick={() => {
                            setCurrent(name);
                            onNavigate?.(name);
                          }}
                          className="flex w-full items-center gap-4 py-5 text-left hover:bg-muted/40"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-xs">
                            0{i + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">
                              {name}
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              {
                                [
                                  "12 tasks · In progress",
                                  "8 tasks · In review",
                                  "24 tasks · Planning",
                                ][i]
                              }
                            </span>
                          </span>
                          <ArrowUpRight
                            size={16}
                            className="text-muted-foreground"
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
