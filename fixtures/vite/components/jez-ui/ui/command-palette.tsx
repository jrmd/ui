"use client";
import * as React from "react";
import { Dialog as D } from "radix-ui";
import {
  Search,
  CornerDownLeft,
  Command,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
export function CommandPalette({
  items,
  className,
}: {
  items: {
    label: string;
    group?: string;
    onSelect: () => void;
    icon?: React.ReactNode;
    shortcut?: string;
  }[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const id = React.useId();
  const results = items.filter((i) =>
    `${i.label} ${i.group ?? ""}`.toLowerCase().includes(query.toLowerCase()),
  );
  function changeOpen(next: boolean) {
    setOpen(next);
    if (next) {
      setQuery("");
      setActive(0);
    }
  }
  React.useEffect(() => {
    function key(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  React.useEffect(() => {
    if (open)
      document
        .getElementById(`${id}-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);
  function choose(index: number) {
    const item = results[index];
    if (item) {
      changeOpen(false);
      item.onSelect();
    }
  }
  return (
    <D.Root open={open} onOpenChange={changeOpen}>
      <D.Trigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-64 justify-start text-muted-foreground",
            className,
          )}
        >
          <Search size={16} />
          Search commands
          <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 text-xs">
            ⌘ K
          </kbd>
        </Button>
      </D.Trigger>
      <D.Portal>
        <D.Overlay className="jez-overlay fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <D.Content className="jez-popover fixed left-1/2 top-[15%] z-50 w-[min(560px,calc(100%-32px))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-2xl">
          <D.Title className="sr-only">Commands</D.Title>
          <D.Description className="sr-only">
            Search commands and use the arrow keys to select an action.
          </D.Description>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search size={20} className="shrink-0 text-muted-foreground" />
            <input
              autoFocus
              role="combobox"
              aria-label="Search commands"
              aria-expanded={open}
              aria-controls={id}
              aria-activedescendant={
                results[active] ? `${id}-${active}` : undefined
              }
              value={query}
              placeholder="What do you need?"
              className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none"
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  setActive((i) =>
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? results.length - 1
                        : Math.max(
                            0,
                            Math.min(
                              results.length - 1,
                              i + (e.key === "ArrowDown" ? 1 : -1),
                            ),
                          ),
                  );
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  choose(active);
                }
              }}
            />
            <D.Close className="rounded border border-border px-1.5 py-1 text-xs text-muted-foreground">
              Esc
            </D.Close>
          </div>
          <div
            id={id}
            role="listbox"
            aria-label="Commands"
            className="max-h-80 overflow-y-auto p-2"
          >
            {results.map((item, i) => (
              <React.Fragment key={`${item.group}-${item.label}`}>
                {(i === 0 || item.group !== results[i - 1]?.group) && (
                  <p className="px-3 pb-2 pt-3 text-xs font-medium text-muted-foreground">
                    {item.group ?? "Actions"}
                  </p>
                )}
                <div
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={active === i}
                  onPointerMove={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm",
                    active === i && "bg-muted",
                  )}
                >
                  <span className="text-muted-foreground">
                    {item.icon ?? <Command size={16} />}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <kbd className="text-xs text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  )}
                  {active === i && (
                    <CornerDownLeft
                      size={14}
                      className="text-muted-foreground"
                    />
                  )}
                </div>
              </React.Fragment>
            ))}
            {!results.length && (
              <p className="px-3 py-12 text-center text-sm text-muted-foreground">
                No commands match “{query}”.
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 border-t border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowUp size={12} />
              <ArrowDown size={12} /> to navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft size={12} /> to select
            </span>
          </div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
