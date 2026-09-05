"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { LockKeyhole } from "lucide-react";
import { PasswordInput } from "../ui/password-input";
import { Input } from "../ui/input";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
export function SignInForm({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void>;
}) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return (
    <form
      className={cn(
        "grid w-full max-w-md gap-5 rounded-2xl border border-border bg-background p-7 sm:p-9",
        className,
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(
          new FormData(e.currentTarget),
        ) as Record<string, string>;
        setBusy(true);
        try {
          await onSubmit?.(data);
          setStatus(
            onSubmit
              ? "Request complete."
              : "Demo complete. No account or email was created.",
          );
        } catch {
          setStatus("Unable to continue. Check your details and try again.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="mb-2">
        <span className="mb-5 grid size-10 place-items-center rounded-xl border border-border bg-muted/30">
          <LockKeyhole size={18} />
        </span>
        <h2 className="font-display text-2xl">Welcome back.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sign in to pick up where you left off.
        </p>
      </div>
      <FormField label="Email">
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </FormField>
      <FormField label="Password">
        <PasswordInput
          name="password"
          required
          minLength={8}
          autoComplete="current-password"
        />
      </FormField>
      <Button type="submit" loading={busy}>
        Sign in
      </Button>
      {status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )}
    </form>
  );
}
