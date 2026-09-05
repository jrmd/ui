"use client";
import * as React from "react";
import {
  Search,
  LayoutDashboard,
  FolderOpen,
  Settings,
  Users,
  MessageSquare,
  ChartNoAxesCombined,
  PanelLeftClose,
  PanelLeftOpen,
  ListTodo,
  Library,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "../ui/utils";
const icons: Record<string, typeof Search> = {
  Overview: LayoutDashboard,
  Projects: FolderOpen,
  Settings,
  Team: Users,
  Customers: Users,
  Reports: ChartNoAxesCombined,
  Board: LayoutDashboard,
  List: ListTodo,
  Library,
  Menu,
  X,
  ChevronRight,
  "Conversation Demo": MessageSquare,
};
export type ApplicationShellOptions = {
  children: React.ReactNode;
  brand?: string;
  items?: { label: string; href: string }[];
  className?: string;
  currentPath?: string;
};
export type ApplicationShellProps = Omit<
  React.ComponentProps<"div">,
  keyof ApplicationShellOptions
> &
  ApplicationShellOptions;
export function ApplicationShell({
  children,
  brand = "Workspace",
  items = [
    { label: "Overview", href: "#overview" },
    { label: "Projects", href: "#projects" },
    { label: "Settings", href: "#settings" },
  ],
  className,
  currentPath,
  ...rootProps
}: ApplicationShellProps) {
  const [path, setPath] = React.useState(currentPath ?? "");
  const [search, setSearch] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (currentPath !== undefined) {
      setPath(currentPath);
      return;
    }
    const update = () =>
      setPath(window.location.pathname + window.location.hash);
    update();
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, [currentPath]);
  const cleanPath = path.replace(/\/$/, "");
  const active = items
    .filter(
      (i) =>
        (i.href.startsWith("#") && path.endsWith(i.href)) ||
        cleanPath === i.href.replace(/\/$/, "") ||
        (i.href !== items[0]?.href &&
          cleanPath.startsWith(i.href.replace(/\/$/, "") + "/")),
    )
    .sort((a, b) => b.href.length - a.href.length)[0];
  const page = active?.label ?? items[0]?.label ?? brand;
  return (
    <div
      {...rootProps}
      className={cn(
        "min-h-screen bg-muted/45 md:grid md:p-2 md:pl-0",
        collapsed
          ? "md:grid-cols-[72px_minmax(0,1fr)]"
          : "md:grid-cols-[224px_minmax(0,1fr)]",
        className,
      )}
    >
      <ApplicationShellAside>
        <div className="flex h-16 items-center justify-between gap-2 px-4">
          <a
            href={items[0]?.href}
            aria-label={brand}
            className="flex min-w-0 items-center gap-2.5"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-foreground font-display text-sm text-background">
              {brand.slice(0, 1)}
            </span>
            {!collapsed && (
              <span className="truncate text-sm font-semibold">{brand}</span>
            )}
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 hover:bg-muted md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {!collapsed && (
          <label
            className={cn(
              "mx-3 mb-5 items-center gap-2 rounded-lg border border-border bg-background px-2.5 text-muted-foreground",
              mobileOpen ? "flex" : "hidden md:flex",
            )}
          >
            <Search size={14} />
            <input
              aria-label="Find a page"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a page…"
              className="min-w-0 flex-1 bg-transparent py-2 text-xs text-foreground"
            />
          </label>
        )}
        {!collapsed && (
          <p
            className={cn(
              "mb-2 px-5 text-xs font-medium text-muted-foreground",
              mobileOpen ? "block" : "hidden md:block",
            )}
          >
            Workspace
          </p>
        )}
        <nav
          aria-label="Workspace"
          className={cn(
            "gap-1 px-3 pb-3 md:grid md:content-start",
            mobileOpen ? "grid" : "hidden",
          )}
        >
          {items
            .filter(
              (i) =>
                collapsed ||
                i.label.toLowerCase().includes(search.toLowerCase()),
            )
            .map((i) => {
              const Icon = icons[i.label] ?? FolderOpen;
              const selected = active?.href === i.href;
              return (
                <ApplicationShellItem
                  key={i.href}
                  href={i.href}
                  title={collapsed ? i.label : undefined}
                  onClick={() => setMobileOpen(false)}
                  aria-label={i.label}
                  aria-current={selected ? "page" : undefined}
                  className={cn(
                    selected
                      ? "bg-background font-medium text-foreground shadow-xs ring-1 ring-border/60"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon size={16} strokeWidth={1.7} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{i.label}</span>
                      {selected && (
                        <ChevronRight
                          size={13}
                          className="text-muted-foreground"
                        />
                      )}
                    </>
                  )}
                </ApplicationShellItem>
              );
            })}
          {!collapsed &&
            !items.some((i) =>
              i.label.toLowerCase().includes(search.toLowerCase()),
            ) && (
              <p className="px-2 py-3 text-xs text-muted-foreground">
                No matching pages.
              </p>
            )}
        </nav>
        <div className="mt-auto hidden p-3 md:block">
          {!collapsed && (
            <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background/50 p-3">
              <span className="grid size-7 place-items-center rounded-full bg-muted text-xs">
                AM
              </span>
              <div>
                <p className="text-xs font-medium">Alex Morgan</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Personal account
                </p>
              </div>
            </div>
          )}
        </div>
      </ApplicationShellAside>
      <ApplicationShellContent>
        <header className="flex h-14 items-center justify-between gap-4 border-b border-border px-5 md:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden rounded-md p-1.5 text-muted-foreground hover:bg-muted md:block"
            >
              {collapsed ? (
                <PanelLeftOpen size={16} />
              ) : (
                <PanelLeftClose size={16} />
              )}
            </button>
            <p className="text-xs">
              <span className="text-muted-foreground">
                {brand}
                <span className="mx-3 text-border">/</span>
              </span>
              {page}
            </p>
          </div>
          <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-primary" />
            Personal workspace
          </span>
        </header>
        <main className="mx-auto min-w-0 max-w-[1440px] p-5 md:p-7">
          {children}
        </main>
      </ApplicationShellContent>
    </div>
  );
}

export function ApplicationShellAside({
  className,
  ...props
}: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="application-shell-aside"
      className={cn(
        "flex flex-col md:sticky md:top-2 md:h-[calc(100vh-16px)]",
        className,
      )}
      {...props}
    />
  );
}
export function ApplicationShellContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="application-shell-content"
      className={cn(
        "min-w-0 bg-background md:rounded-xl md:border md:border-border md:shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

export function ApplicationShellItem({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="application-shell-item"
      className={cn(
        "flex items-center gap-2.5 whitespace-nowrap rounded-md px-2.5 py-2 text-sm transition-colors",
        className,
      )}
      {...props}
    />
  );
}
