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
};
export type PasswordResetFormProps = Omit<
  React.ComponentProps<"form">,
  keyof PasswordResetFormOptions
> &
  PasswordResetFormOptions;

function usePasswordResetFormModel({
  heading = "Forgot your password?",
  className,
  onSubmit,
  children,
  ...rootProps
}: PasswordResetFormProps) {
  const [status, setStatus] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  return {
    heading,
    className,
    onSubmit,
    children,
    rootProps,
    status,
    setStatus,
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
  const { className, onSubmit, rootProps, setStatus, setBusy, children } =
    model;
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
            <PasswordResetFormIntro />
            <PasswordResetFormEmailField />
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
  const { heading } = usePasswordResetFormComposition();
  return (
    <PasswordResetFormContent {...props}>
      {children === undefined ? (
        <>
          <span className="mb-5 grid size-10 place-items-center rounded-xl border border-border bg-muted/30">
            <LockKeyhole size={18} />
          </span>
          <PasswordResetFormTitle>{heading}</PasswordResetFormTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enter the email address associated with your account.
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
  const { busy } = usePasswordResetFormComposition();
  return (
    <Button type="submit" loading={busy} {...props}>
      {children === undefined ? "Send reset link" : children}
    </Button>
  );
}
export function PasswordResetFormStatus({ children }: React.PropsWithChildren) {
  const { status } = usePasswordResetFormComposition();
  return children === undefined
    ? status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )
    : children;
}
