"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDemoState } from "./demo-state";
const initial = [
  { email: "alex@example.com", role: "Owner" },
  { email: "sam@example.com", role: "Editor" },
];
export function TeamManagement({ className }: { className?: string }) {
  const [team, setTeam, reset] = useDemoState("team", initial);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");
  return (
    <section
      className={cn(
        "grid gap-5 rounded-xl border border-border p-6",
        className,
      )}
    >
      <div>
        <h2 className="text-lg font-semibold">
          Team members{" "}
          <span className="ml-1 text-sm text-muted-foreground">
            {team.length}
          </span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage who has access to this workspace.
        </p>
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (team.some((t) => t.email === email)) {
            setStatus("This person is already on the team.");
            return;
          }
          setTeam((t) => [...t, { email, role: "Invited" }]);
          setEmail("");
          setStatus("Added to the demo. No invitation email was sent.");
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
        <Button type="submit">Invite</Button>
      </form>
      {team.map((t) => (
        <div
          key={t.email}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3 text-sm"
        >
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
            {["Owner", "Editor", "Viewer", "Invited"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      ))}
      {status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )}
      <Button variant="ghost" className="justify-self-start" onClick={reset}>
        Reset demo
      </Button>
    </section>
  );
}
