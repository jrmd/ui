"use client";
import * as React from "react";
import { useAsyncAction } from "../ui/use-async-action";
import { cn } from "../ui/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useControllable } from "../ui/use-controllable";
const initial = [
  { email: "alex@example.com", role: "Owner" },
  { email: "sam@example.com", role: "Editor" },
];
export type TeamManagementOptions = {
  className?: string;
  value?: typeof initial;
  defaultValue?: typeof initial;
  onValueChange?: (value: typeof initial) => void;
  items?: typeof TeamManagementDefaultItems;
  onInvite?: (value: string) => void | Promise<void>;
};
export type TeamManagementProps = Omit<
  React.ComponentProps<"section">,
  keyof TeamManagementOptions
> &
  TeamManagementOptions;
const TeamManagementDefaultItems = ["Owner", "Editor", "Viewer", "Invited"];
export function TeamManagement({
  items = TeamManagementDefaultItems,
  className,
  value: controlledValue,
  defaultValue = initial,
  onValueChange,
  onInvite,
  children,
  ...rootProps
}: TeamManagementProps) {
  const action = useAsyncAction();
  const [team, setTeam] = useControllable<typeof initial>(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const reset = () => setTeam(defaultValue);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");
  return (
    <section
      {...rootProps}
      className={cn(
        "grid gap-5 rounded-xl border border-border p-6",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          {action.error && <p role="alert">{action.error}</p>}
          <div>
            <TeamManagementTitle>
              Team members{" "}
              <span className="ml-1 text-sm text-muted-foreground">
                {team.length}
              </span>
            </TeamManagementTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage who has access to this workspace.
            </p>
          </div>
          <TeamManagementForm
            onSubmit={(e) => {
              e.preventDefault();
              if (team.some((t) => t.email === email)) {
                setStatus("This person is already on the team.");
                return;
              }
              void action.run(async () => {
                await onInvite?.(email);
                setTeam((t) => [...t, { email, role: "Invited" }]);
                setEmail("");
                setStatus(
                  onInvite
                    ? "Invitation completed."
                    : "Added locally. No invitation email was sent.",
                );
              });
            }}
          >
            <Input
              type="email"
              required
              aria-label="Invite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@example.com"
            />
            <Button
              type="submit"
              disabled={action.pending}
              loading={action.pending}
            >
              Invite
            </Button>
          </TeamManagementForm>
          {team.map((t) => (
            <TeamManagementItem key={t.email}>
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">
                  {t.email.slice(0, 2).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {t.email.split("@")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.email}
                  </span>
                </span>
              </span>
              <select
                disabled={t.role === "Owner"}
                aria-label={`Role for ${t.email}`}
                value={t.role}
                onChange={(e) =>
                  setTeam((v) =>
                    v.map((x) =>
                      x.email === t.email ? { ...x, role: e.target.value } : x,
                    ),
                  )
                }
                className="rounded-lg border border-border bg-background px-3 py-2 text-xs"
              >
                {items.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </TeamManagementItem>
          ))}
          {status && (
            <p role="status" className="text-sm">
              {status}
            </p>
          )}
          <Button
            variant="ghost"
            className="justify-self-start"
            onClick={reset}
          >
            Reset changes
          </Button>
        </>
      )}
    </section>
  );
}

export function TeamManagementTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="team-management-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
export function TeamManagementForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="team-management-form"
      className={cn("flex gap-2", className)}
      {...props}
    />
  );
}

export function TeamManagementItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="team-management-item"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
