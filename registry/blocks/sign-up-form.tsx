"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { LockKeyhole } from "lucide-react";
import { PasswordInput } from "../ui/password-input";
import { Input } from "../ui/input";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
export type SignUpFormOptions = {
  className?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void>;
  heading?: React.ReactNode;
};
export type SignUpFormProps = Omit<
  React.ComponentProps<"form">,
  keyof SignUpFormOptions
> &
  SignUpFormOptions;

export function SignUpForm({
  heading = <>Your next chapter.</>,
  className,
  onSubmit,
  children,
  ...rootProps
}: SignUpFormProps) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return (
    <form
      {...rootProps}
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
      {children !== undefined ? (
        children
      ) : (
        <>
          <SignUpFormContent>
            <span className="mb-5 grid size-10 place-items-center rounded-xl border border-border bg-muted/30">
              <LockKeyhole size={18} />
            </span>
            <SignUpFormTitle>{heading}</SignUpFormTitle>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Create an account and give your work a home.
            </p>
          </SignUpFormContent>
          <FormField label="Name">
            <Input name="name" type="text" required autoComplete="name" />
          </FormField>
          <FormField label="Email">
            <Input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </FormField>
          <FormField label="Password" hint="Use at least 8 characters.">
            <PasswordInput
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </FormField>
          <Button type="submit" loading={busy}>
            Create account
          </Button>
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

export function SignUpFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sign-up-form-content"
      className={cn("mb-2", className)}
      {...props}
    />
  );
}
export function SignUpFormTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sign-up-form-title"
      className={cn("font-display text-2xl", className)}
      {...props}
    />
  );
}
