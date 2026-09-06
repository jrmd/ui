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
function useTeamManagementModel({
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
  return {
    items,
    className,
    controlledValue,
    defaultValue,
    onValueChange,
    onInvite,
    children,
    rootProps,
    action,
    team,
    setTeam,
    reset,
    email,
    setEmail,
    status,
    setStatus,
  };
}
const TeamManagementCompositionContext = React.createContext<ReturnType<
  typeof useTeamManagementModel
> | null>(null);
function useTeamManagementComposition() {
  const context = React.useContext(TeamManagementCompositionContext);
  if (!context)
    throw new Error("TeamManagement parts must be inside TeamManagement.");
  return context;
}
export function TeamManagement(props: TeamManagementProps) {
  const model = useTeamManagementModel(props);
  const { className, rootProps, children } = model;
  return (
    <TeamManagementCompositionContext.Provider value={model}>
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
            <TeamManagementError />
            <TeamManagementHeading />
            <TeamManagementInviteForm />
            <TeamManagementMembers />
            <TeamManagementStatus />
            <TeamManagementReset />
          </>
        )}
      </section>
    </TeamManagementCompositionContext.Provider>
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

export function TeamManagementError({ children }: React.PropsWithChildren) {
  const { action } = useTeamManagementComposition();
  return children === undefined
    ? action.error && <p role="alert">{action.error}</p>
    : children;
}
export function TeamManagementHeading({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { team } = useTeamManagementComposition();
  return (
    <div {...props}>
      {children === undefined ? (
        <>
          <TeamManagementTitle>
            Team members{" "}
            <span className="ml-1 text-sm text-muted-foreground">
              {team.length}
            </span>
          </TeamManagementTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage who has access to this workspace.
          </p>
        </>
      ) : (
        children
      )}
    </div>
  );
}
export function TeamManagementInviteForm({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TeamManagementForm>> & {
  children?: React.ReactNode;
}) {
  const { onInvite, action, team, setTeam, email, setEmail, setStatus } =
    useTeamManagementComposition();
  const defaultonSubmit: NonNullable<
    React.ComponentProps<typeof TeamManagementForm>["onSubmit"]
  > = (e) => {
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
  };
  return (
    <TeamManagementForm
      {...props}
      onSubmit={(event) => {
        props.onSubmit?.(event);
        if (!event.defaultPrevented) defaultonSubmit(event);
      }}
    >
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </TeamManagementForm>
  );
}
export function TeamManagementMembers({ children }: React.PropsWithChildren) {
  const { items, team, setTeam } = useTeamManagementComposition();
  return children === undefined
    ? team.map((t) => (
        <TeamManagementItem key={t.email}>
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">
              {t.email.slice(0, 2).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-medium">
                {t.email.split("@")[0]}
              </span>
              <span className="text-xs text-muted-foreground">{t.email}</span>
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
      ))
    : children;
}
export function TeamManagementStatus({ children }: React.PropsWithChildren) {
  const { status } = useTeamManagementComposition();
  return children === undefined
    ? status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )
    : children;
}
export function TeamManagementReset({
  children,
  ...props
}: Partial<React.ComponentProps<typeof Button>> & {
  children?: React.ReactNode;
}) {
  const { reset } = useTeamManagementComposition();
  const defaultonClick: NonNullable<
    React.ComponentProps<typeof Button>["onClick"]
  > = reset;
  return (
    <Button
      variant="ghost"
      {...props}
      className={cn("justify-self-start", props.className)}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) defaultonClick(event);
      }}
    >
      {children === undefined ? "Reset changes" : children}
    </Button>
  );
}
