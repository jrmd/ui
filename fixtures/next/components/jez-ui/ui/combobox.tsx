"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "./utils";
import { Popover as P } from "radix-ui";
import { useControllable } from "./use-controllable";
import { Input } from "./input";
import { Button } from "./button";
export function Combobox({
  options,
  value,
  defaultValue = "",
  onValueChange,
  label = "Choose item",
  className,
}: {
  options: { label: string; value: string; description?: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
}) {
  const [selected, setSelected] = useControllable(
    value,
    defaultValue,
    onValueChange,
  );
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const id = React.useId();
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );
  React.useEffect(() => {
    if (open)
      document
        .getElementById(`${id}-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);
  return (
    <P.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setQuery("");
          setActive(
            Math.max(
              0,
              options.findIndex((o) => o.value === selected),
            ),
          );
        }
      }}
    >
      <P.Trigger asChild>
        <Button
          variant="outline"
          className={cn("min-w-48 justify-between", className)}
          aria-label={label}
        >
          {options.find((o) => o.value === selected)?.label ?? label}
          <ChevronsUpDown
            size={15}
            className="ml-4 shrink-0 text-muted-foreground"
          />
        </Button>
      </P.Trigger>
      <P.Portal>
        <P.Content
          align="start"
          collisionPadding={16}
          sideOffset={6}
          className="jez-popover z-50 w-72 max-w-[calc(100vw-32px)] rounded-xl border border-border bg-background p-1.5 text-foreground shadow-xl"
        >
          <div className="relative border-b border-border pb-1.5">
            <Search
              size={16}
              className="absolute left-3 top-3 text-muted-foreground"
            />
            <Input
              placeholder="Search options…"
              className="border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              role="combobox"
              aria-label={`Search ${label}`}
              aria-expanded={open}
              aria-controls={id}
              aria-activedescendant={
                filtered[active] ? `${id}-${active}` : undefined
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((i) => Math.min(i + 1, filtered.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((i) => Math.max(0, i - 1));
                }
                if (e.key === "Home" || e.key === "End") {
                  e.preventDefault();
                  setActive(e.key === "Home" ? 0 : filtered.length - 1);
                }
                if (e.key === "Enter" && filtered[active]) {
                  setSelected(filtered[active].value);
                  setOpen(false);
                }
              }}
            />
          </div>
          <div
            id={id}
            role="listbox"
            aria-label={label}
            className="mt-2 max-h-52 overflow-auto"
          >
            {filtered.map((o, i) => (
              <div
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={selected === o.value}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setSelected(o.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm",
                  i === active && "bg-muted",
                )}
                onPointerMove={() => setActive(i)}
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{o.label}</span>
                  {o.description && (
                    <span className="text-xs text-muted-foreground">
                      {o.description}
                    </span>
                  )}
                </span>
                {selected === o.value && <Check size={16} />}
              </div>
            ))}
            {!filtered.length && (
              <p className="p-3 text-sm text-muted-foreground">
                No matching items.
              </p>
            )}
          </div>
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
