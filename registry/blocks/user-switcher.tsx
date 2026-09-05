"use client";
import * as React from "react";
import { DropdownMenu as D } from "radix-ui";
import { Check, ChevronsUpDown, Plus, Settings, LogOut } from "lucide-react";
import { cn } from "../ui/utils";
export type SwitcherAccount = {
  id: string;
  name: string;
  detail: string;
  initials: string;
  color?: string;
};
const accounts: SwitcherAccount[] = [
  {
    id: "alex",
    name: "Alex Rivers",
    detail: "alex@common.example",
    initials: "AR",
    color: "#d5dec9",
  },
  {
    id: "jamie",
    name: "Jamie Chen",
    detail: "jamie@common.example",
    initials: "JC",
    color: "#e2cfc0",
  },
];
export type UserSwitcherOptions = {
  items?: SwitcherAccount[];
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  onAddAccount?: () => void;
  onSignOut?: () => void;
  settingsHref?: string;
  className?: string;
  compact?: boolean;
};
export type UserSwitcherProps = Omit<
  React.ComponentProps<"div">,
  keyof UserSwitcherOptions
> &
  UserSwitcherOptions;
export function UserSwitcher({
  items = accounts,
  defaultValue = items[0]?.id,
  onValueChange,
  onAddAccount,
  onSignOut,
  settingsHref = "/templates/projects/preview/settings",
  className,
  compact = false,
  children,
  ...rootProps
}: UserSwitcherProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [notice, setNotice] = React.useState("");
  const active = items.find((i) => i.id === value) ?? items[0];
  if (!active) return null;
  return (
    <div {...rootProps} className={cn("relative w-full max-w-xs", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <D.Root>
            <D.Trigger
              aria-label={`Account: ${active.name}`}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span
                style={{ background: active.color ?? "#d5dec9" }}
                className="grid size-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-[#263326]"
              >
                {active.initials}
              </span>
              {!compact && (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {active.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {active.detail}
                    </span>
                  </span>
                  <ChevronsUpDown
                    size={14}
                    className="shrink-0 text-muted-foreground"
                  />
                </>
              )}
            </D.Trigger>
            <D.Portal>
              <D.Content
                side="top"
                align="start"
                sideOffset={8}
                collisionPadding={12}
                className="jez-popover z-50 w-72 max-w-[calc(100vw-24px)] rounded-xl border border-border bg-background p-1.5 text-foreground shadow-xl"
              >
                <D.Label className="px-3 py-2 text-xs text-muted-foreground">
                  Switch account
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
                      className="flex cursor-default items-center gap-3 rounded-md px-3 py-2.5 outline-none data-[highlighted]:bg-muted"
                    >
                      <span
                        style={{ background: item.color ?? "#d5dec9" }}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-xs text-[#263326]"
                      >
                        {item.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">
                          {item.name}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {item.detail}
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
                    onAddAccount
                      ? onAddAccount()
                      : setNotice("Demo: connect your account sign-in flow.")
                  }
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-muted"
                >
                  <Plus size={15} />
                  Add an account
                </D.Item>
                <D.Item asChild>
                  <a
                    href={settingsHref}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-muted"
                  >
                    <Settings size={15} />
                    Account settings
                  </a>
                </D.Item>
                <D.Item
                  onSelect={() =>
                    onSignOut
                      ? onSignOut()
                      : setNotice("Demo: connect your sign-out handler.")
                  }
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-danger outline-none data-[highlighted]:bg-muted"
                >
                  <LogOut size={15} />
                  Sign out
                </D.Item>
              </D.Content>
            </D.Portal>
          </D.Root>
          {notice && (
            <p
              role="status"
              className="px-2 pt-2 text-xs text-muted-foreground"
            >
              {notice}
            </p>
          )}
        </>
      )}
    </div>
  );
}
