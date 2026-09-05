"use client";
import * as React from "react";
import { DropdownMenu as D } from "radix-ui";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
export type Organization = { id: string; name: string; plan: string };
const defaults: Organization[] = [
  { id: "common", name: "Common Studio", plan: "Team workspace" },
  { id: "personal", name: "Personal", plan: "Free workspace" },
  { id: "fieldwork", name: "Fieldwork", plan: "Team workspace" },
];
export function OrganizationSwitcher({
  items = defaults,
  onValueChange,
  onCreate,
  compact = false,
}: {
  items?: Organization[];
  onValueChange?: (id: string) => void;
  onCreate?: () => void;
  compact?: boolean;
}) {
  const [value, setValue] = React.useState(items[0]?.id);
  const [notice, setNotice] = React.useState("");
  const active = items.find((i) => i.id === value) ?? items[0];
  if (!active) return null;
  return (
    <div>
      <D.Root>
        <D.Trigger
          aria-label={`Workspace: ${active.name}`}
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-lg text-primary-foreground">
            {active.name[0]}
          </span>
          {!compact && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {active.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {active.plan}
                </span>
              </span>
              <ChevronsUpDown size={14} />
            </>
          )}
        </D.Trigger>
        <D.Portal>
          <D.Content
            sideOffset={8}
            align="start"
            collisionPadding={12}
            className="jez-popover z-50 w-64 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-xl"
          >
            <D.Label className="px-3 py-2 text-xs text-muted-foreground">
              Your workspaces
            </D.Label>
            <D.RadioGroup
              value={active.id}
              onValueChange={(id) => {
                setValue(id);
                onValueChange?.(id);
              }}
            >
              {items.map((item) => (
                <D.RadioItem
                  key={item.id}
                  value={item.id}
                  className="flex items-center justify-between gap-3 rounded-md p-3 text-sm outline-none data-[highlighted]:bg-muted"
                >
                  <span>
                    {item.name}
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {item.plan}
                    </span>
                  </span>
                  <D.ItemIndicator>
                    <Check size={14} />
                  </D.ItemIndicator>
                </D.RadioItem>
              ))}
            </D.RadioGroup>
            <D.Separator className="my-1 h-px bg-border" />
            <D.Item
              onSelect={() =>
                onCreate
                  ? onCreate()
                  : setNotice("Demo: connect your workspace creation flow.")
              }
              className="flex items-center gap-2 rounded-md p-3 text-sm outline-none data-[highlighted]:bg-muted"
            >
              <Plus size={15} />
              Create workspace
            </D.Item>
          </D.Content>
        </D.Portal>
      </D.Root>
      {notice && (
        <p role="status" className="p-2 text-xs">
          {notice}
        </p>
      )}
    </div>
  );
}
