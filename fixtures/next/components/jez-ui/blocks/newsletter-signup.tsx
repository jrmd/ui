"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { ArrowUpRight, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export function NewsletterSignup({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit?: (email: string) => Promise<void>;
}) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return (
    <form
      className={cn(
        "relative grid gap-5 overflow-hidden rounded-2xl border border-border bg-muted/30 p-7 sm:p-10",
        className,
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const email = String(new FormData(e.currentTarget).get("email"));
        try {
          await onSubmit?.(email);
          setStatus(
            onSubmit
              ? "You’re on the list."
              : "Demo complete. No email was sent.",
          );
        } catch {
          setStatus("Unable to subscribe. Please try again.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        <Mail size={15} />
        The studio dispatch
      </div>
      <h2 className="max-w-lg font-display text-3xl leading-tight sm:text-4xl">
        Good work starts
        <br />
        with a good read.
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        A monthly edit of design discoveries, work in progress, and things worth
        keeping. Written by people who make things.
      </p>
      <div className="mt-2 flex max-w-lg flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          name="email"
          required
          aria-label="Email address"
          placeholder="you@example.com"
        />
        <Button type="submit" loading={busy}>
          Subscribe <ArrowUpRight size={16} />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        One email a month. Unsubscribe whenever you like.
      </p>
      {status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )}
    </form>
  );
}
