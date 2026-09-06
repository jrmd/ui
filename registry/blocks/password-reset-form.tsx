"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { LockKeyhole } from "lucide-react";
import { Input } from "../ui/input";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
export type PasswordResetFormOptions = {
  className?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void>;
  heading?: React.ReactNode;
  mode?: "request" | "new-password";
};
export type PasswordResetFormProps = Omit<
  React.ComponentProps<"form">,
  keyof PasswordResetFormOptions
> &
  PasswordResetFormOptions;

function usePasswordResetFormModel({
  heading,
  mode = "request",
  className,
  onSubmit,
  children,
  ...rootProps
}: PasswordResetFormProps) {
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  return {
    heading:
      heading ??
      (mode === "new-password"
        ? "Choose a new password."
        : "Forgot your password?"),
    mode,
    className,
    onSubmit,
    children,
    rootProps,
    status,
    setStatus,
    error,
    setError,
    busy,
    setBusy,
  };
}
const PasswordResetFormCompositionContext = React.createContext<ReturnType<
  typeof usePasswordResetFormModel
> | null>(null);
function usePasswordResetFormComposition() {
  const context = React.useContext(PasswordResetFormCompositionContext);
  if (!context)
    throw new Error(
      "PasswordResetForm parts must be inside PasswordResetForm.",
    );
  return context;
}
export function PasswordResetForm(props: PasswordResetFormProps) {
  const model = usePasswordResetFormModel(props);
  const {
    className,
    onSubmit,
    rootProps,
    setStatus,
    setError,
    setBusy,
    children,
    mode,
  } = model;
  return (
    <PasswordResetFormCompositionContext.Provider value={model}>
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
          if (
            mode === "new-password" &&
            data.password !== data.passwordConfirmation
          ) {
            setError(true);
            setStatus(
              "Passwords do not match. Check both fields and try again.",
            );
            return;
          }
          setBusy(true);
          setError(false);
          try {
            await onSubmit?.(data);
            setStatus(
              onSubmit
                ? mode === "new-password"
                  ? "Password updated."
                  : "Request complete."
                : mode === "new-password"
                  ? "Demo complete. No password was changed."
                  : "Demo complete. No account or email was created.",
            );
          } catch {
            setError(true);
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
            <PasswordResetFormIntro />
            {mode === "request" ? (
              <PasswordResetFormEmailField />
            ) : (
              <PasswordResetFormPasswordFields />
            )}
            <PasswordResetFormSubmit />
            <PasswordResetFormStatus />
          </>
        )}
      </form>
    </PasswordResetFormCompositionContext.Provider>
  );
}

export function PasswordResetFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="password-reset-form-content"
      className={cn("mb-2", className)}
      {...props}
    />
  );
}
export function PasswordResetFormTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="password-reset-form-title"
      className={cn("font-display text-2xl", className)}
      {...props}
    />
  );
}

export function PasswordResetFormIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof PasswordResetFormContent>> & {
  children?: React.ReactNode;
}) {
  const { heading, mode } = usePasswordResetFormComposition();
  return (
    <PasswordResetFormContent {...props}>
      {children === undefined ? (
        <>
          <span className="mb-5 grid size-10 place-items-center rounded-xl border border-border bg-muted/30">
            <LockKeyhole size={18} />
          </span>
          <PasswordResetFormTitle>{heading}</PasswordResetFormTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {mode === "new-password"
              ? "Choose a new password for your account."
              : "Enter the email address associated with your account."}
          </p>
        </>
      ) : (
        children
      )}
    </PasswordResetFormContent>
  );
}
export function PasswordResetFormEmailField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const {} = usePasswordResetFormComposition();
  return (
    <FormField label="Email" {...props}>
      {children === undefined ? (
        <Input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      ) : (
        children
      )}
    </FormField>
  );
}
export function PasswordResetFormSubmit({
  children,
  ...props
}: Partial<React.ComponentProps<typeof Button>> & {
  children?: React.ReactNode;
}) {
  const { busy, mode } = usePasswordResetFormComposition();
  return (
    <Button type="submit" loading={busy} {...props}>
      {children === undefined
        ? mode === "new-password"
          ? "Update password"
          : "Send reset link"
        : children}
    </Button>
  );
}
export function PasswordResetFormPasswordFields({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="password-reset-form-password-fields"
      className={cn("grid gap-4", className)}
      {...props}
    >
      {children === undefined ? (
        <>
          <FormField label="New password">
            <Input
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </FormField>
          <FormField label="Confirm new password">
            <Input
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              required
            />
          </FormField>
        </>
      ) : (
        children
      )}
    </div>
  );
}
export function PasswordResetFormStatus({ children }: React.PropsWithChildren) {
  const { status, error } = usePasswordResetFormComposition();
  return children === undefined
    ? status && (
        <p
          role={error ? "alert" : "status"}
          className={cn("text-sm", error && "text-danger")}
        >
          {status}
        </p>
      )
    : children;
}
