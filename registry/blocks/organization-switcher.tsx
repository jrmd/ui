"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { DropdownMenu as D } from "radix-ui";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
export type Organization = { id: string; name: string; plan: string };
const defaults: Organization[] = [
  { id: "common", name: "Common Studio", plan: "Team workspace" },
  { id: "personal", name: "Personal", plan: "Free workspace" },
  { id: "fieldwork", name: "Fieldwork", plan: "Team workspace" },
];
export type OrganizationSwitcherOptions = {
  items?: Organization[];
  onValueChange?: (id: string) => void;
  onCreate?: () => void;
  compact?: boolean;
};
export type OrganizationSwitcherProps = Omit<
  React.ComponentProps<"div">,
  keyof OrganizationSwitcherOptions
> &
  OrganizationSwitcherOptions;
function useOrganizationSwitcherModel({
  items = defaults,
  onValueChange,
  onCreate,
  compact = false,
  children,
  ...rootProps
}: OrganizationSwitcherProps) {
  const [value, setValue] = React.useState(items[0]?.id);
  const [notice, setNotice] = React.useState("");
  const active = items.find((i) => i.id === value) ?? items[0];
  if (!active) return null;
  return {
    items,
    onValueChange,
    onCreate,
    compact,
    children,
    rootProps,
    value,
    setValue,
    notice,
    setNotice,
    active,
  };
}
const OrganizationSwitcherCompositionContext = React.createContext<ReturnType<
  typeof useOrganizationSwitcherModel
> | null>(null);
function useOrganizationSwitcherComposition() {
  const context = React.useContext(OrganizationSwitcherCompositionContext);
  if (!context)
    throw new Error(
      "OrganizationSwitcher parts must be inside OrganizationSwitcher.",
    );
  return context;
}
export function OrganizationSwitcher(props: OrganizationSwitcherProps) {
  const model = useOrganizationSwitcherModel(props);
  if (!model) return null;
  const { rootProps, children } = model;
  return (
    <OrganizationSwitcherCompositionContext.Provider value={model}>
      <div {...rootProps}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <OrganizationSwitcherMenu />
            <OrganizationSwitcherStatus />
          </>
        )}
      </div>
    </OrganizationSwitcherCompositionContext.Provider>
  );
}

export function OrganizationSwitcherMenu({
  children,
  ...props
}: Partial<React.ComponentProps<typeof D.Root>> & {
  children?: React.ReactNode;
}) {
  return (
    <D.Root {...props}>
      {children === undefined ? (
        <>
          <OrganizationSwitcherTrigger />
          <OrganizationSwitcherPopup />
        </>
      ) : (
        children
      )}
    </D.Root>
  );
}
export function OrganizationSwitcherStatus({
  children,
}: React.PropsWithChildren) {
  const { notice } = useOrganizationSwitcherComposition();
  return children === undefined
    ? notice && (
        <p role="status" className="p-2 text-xs">
          {notice}
        </p>
      )
    : children;
}

export function OrganizationSwitcherTrigger({
  children,
  ...props
}: Partial<React.ComponentProps<typeof D.Trigger>> & {
  children?: React.ReactNode;
}) {
  const { compact, active } = useOrganizationSwitcherComposition();
  return (
    <D.Trigger
      aria-label={`Workspace: ${active.name}`}
      {...props}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </D.Trigger>
  );
}
export function OrganizationSwitcherOptions({
  children,
  ...props
}: Partial<React.ComponentProps<typeof D.RadioGroup>> & {
  children?: React.ReactNode;
}) {
  const { items, onValueChange, setValue, active } =
    useOrganizationSwitcherComposition();
  return (
    <D.RadioGroup
      value={active.id}
      {...props}
      onValueChange={(value) => {
        ((id) => {
          setValue(id);
          onValueChange?.(id);
        })(value);
        props.onValueChange?.(value);
      }}
    >
      {children === undefined
        ? items.map((item) => (
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
          ))
        : children}
    </D.RadioGroup>
  );
}
export function OrganizationSwitcherPopup({
  children,
  ...props
}: Partial<React.ComponentProps<typeof D.Portal>> & {
  children?: React.ReactNode;
}) {
  const { onCreate, setNotice } = useOrganizationSwitcherComposition();
  return (
    <D.Portal {...props}>
      {children === undefined ? (
        <D.Content
          sideOffset={8}
          align="start"
          collisionPadding={12}
          className="jez-popover z-50 w-64 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-xl"
        >
          <D.Label className="px-3 py-2 text-xs text-muted-foreground">
            Your workspaces
          </D.Label>
          <OrganizationSwitcherOptions />
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
      ) : (
        children
      )}
    </D.Portal>
  );
}
