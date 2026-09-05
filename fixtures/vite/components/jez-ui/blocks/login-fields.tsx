"use client";
import * as React from "react";
import { Github, ArrowRight, KeyRound, Building2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";
export type LoginPresentation = {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  brand?: string;
};
export type LoginHandlers = {
  onSubmit?: (credentials: {
    email: string;
    password: string;
  }) => Promise<void> | void;
  onSSO?: (
    provider: "google" | "github" | "saml",
    email?: string,
  ) => Promise<void> | void;
};
export function LoginFields({
  onSubmit,
  onSSO,
  enterprise = false,
}: LoginHandlers & { enterprise?: boolean }) {
  const [pending, setPending] = React.useState<string | null>(null),
    [message, setMessage] = React.useState(""),
    [error, setError] = React.useState(false);
  async function run(key: string, action?: () => Promise<void> | void) {
    setPending(key);
    setMessage("");
    setError(false);
    try {
      if (action) {
        await action();
        setMessage("Sign-in request completed.");
      } else
        setMessage(
          "Demo only. Connect your authentication provider to sign in.",
        );
    } catch (e) {
      setError(true);
      setMessage(
        e instanceof Error ? e.message : "Sign-in failed. Please try again.",
      );
    } finally {
      setPending(null);
    }
  }
  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Button
          disabled={!!pending}
          loading={pending === "google"}
          variant="outline"
          className="w-full"
          onClick={() =>
            run("google", onSSO ? () => onSSO("google") : undefined)
          }
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
            <path
              fill="currentColor"
              d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36ZM12 22c2.7 0 4.96-.9 6.61-2.41l-3.23-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H3.08v2.59A10 10 0 0 0 12 22ZM6.42 13.92A6 6 0 0 1 6.1 12c0-.67.11-1.32.32-1.92V7.49H3.08A10 10 0 0 0 2 12c0 1.61.39 3.14 1.08 4.51l3.34-2.59ZM12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.92 5.49l3.34 2.59A5.99 5.99 0 0 1 12 5.96Z"
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          disabled={!!pending}
          loading={pending === "github"}
          variant="outline"
          className="w-full"
          onClick={() =>
            run("github", onSSO ? () => onSSO("github") : undefined)
          }
        >
          <Github size={16} />
          Continue with GitHub
        </Button>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with {enterprise ? "SSO" : "email"}
        <span className="h-px flex-1 bg-border" />
      </div>
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget),
            email = String(data.get("email")),
            password = String(data.get("password") ?? "");
          void run(
            "email",
            enterprise
              ? onSSO
                ? () => onSSO("saml", email)
                : undefined
              : onSubmit
                ? () => onSubmit({ email, password })
                : undefined,
          );
        }}
      >
        <label className="grid gap-2 text-xs font-medium">
          {enterprise ? "Work email" : "Email address"}
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={enterprise ? "you@company.com" : "you@example.com"}
          />
        </label>
        {!enterprise && (
          <label className="grid gap-2 text-xs font-medium">
            Password
            <PasswordInput
              name="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
            />
          </label>
        )}
        <Button
          type="submit"
          disabled={!!pending}
          loading={pending === "email"}
          className="mt-1 w-full"
        >
          {enterprise ? (
            <>
              <Building2 size={16} />
              Continue with SSO
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>
      {message && (
        <p
          role={error ? "alert" : "status"}
          className={
            error
              ? "text-xs text-danger"
              : "text-xs leading-relaxed text-muted-foreground"
          }
        >
          {message}
        </p>
      )}
      <p className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <KeyRound size={12} />
        Your workspace. Your secure way in.
      </p>
    </div>
  );
}
