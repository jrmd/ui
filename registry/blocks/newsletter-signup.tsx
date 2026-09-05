"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { ArrowUpRight, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export type NewsletterSignupOptions = {
  className?: string;
  onSubmit?: (email: string) => Promise<void>;
  heading?: React.ReactNode;
  description?: React.ReactNode;
};
export type NewsletterSignupProps = Omit<
  React.ComponentProps<"form">,
  keyof NewsletterSignupOptions
> &
  NewsletterSignupOptions;

export function NewsletterSignup({
  heading = (
    <>
      Good work starts
      <br />
      with a good read.
    </>
  ),
  description = (
    <>
      A monthly edit of design discoveries, work in progress, and things worth
      keeping. Written by people who make things.
    </>
  ),
  className,
  onSubmit,
  children,
  ...rootProps
}: NewsletterSignupProps) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return (
    <form
      {...rootProps}
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
      {children !== undefined ? (
        children
      ) : (
        <>
          <NewsletterSignupContent>
            <Mail size={15} />
            The studio dispatch
          </NewsletterSignupContent>
          <NewsletterSignupTitle>{heading}</NewsletterSignupTitle>
          <NewsletterSignupDescription>
            {description}
          </NewsletterSignupDescription>
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
        </>
      )}
    </form>
  );
}

export function NewsletterSignupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="newsletter-signup-content"
      className={cn(
        "flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function NewsletterSignupTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="newsletter-signup-title"
      className={cn(
        "max-w-lg font-display text-3xl leading-tight sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
export function NewsletterSignupDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="newsletter-signup-description"
      className={cn(
        "max-w-md text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
