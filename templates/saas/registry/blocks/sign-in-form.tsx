"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { LockKeyhole } from "lucide-react";
import { PasswordInput } from "../ui/password-input";
import { Input } from "../ui/input";
import { FormField } from "../ui/form-field";
import { Button } from "../ui/button";
export type SignInFormOptions = {
  className?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void>;
  heading?: React.ReactNode;
};
export type SignInFormProps = Omit<
  React.ComponentProps<"form">,
  keyof SignInFormOptions
> &
  SignInFormOptions;

function useSignInFormModel({
  heading = "Welcome back.",
  className,
  onSubmit,
  children,
  ...rootProps
}: SignInFormProps) {
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
const SignInFormCompositionContext = React.createContext<ReturnType<
  typeof useSignInFormModel
> | null>(null);
function useSignInFormComposition() {
  const context = React.useContext(SignInFormCompositionContext);
  if (!context) throw new Error("SignInForm parts must be inside SignInForm.");
  return context;
}
export function SignInForm(props: SignInFormProps) {
  const model = useSignInFormModel(props);
  const { className, onSubmit, rootProps, setStatus, setBusy, children } =
    model;
  return (
    <SignInFormCompositionContext.Provider value={model}>
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
            <SignInFormIntro />
            <SignInFormEmailField />
            <SignInFormPasswordField />
            <SignInFormSubmit />
            <SignInFormStatus />
          </>
        )}
      </form>
    </SignInFormCompositionContext.Provider>
  );
}

export function SignInFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sign-in-form-content"
      className={cn("mb-2", className)}
      {...props}
    />
  );
}
export function SignInFormTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sign-in-form-title"
      className={cn("font-display text-2xl", className)}
      {...props}
    />
  );
}

export function SignInFormIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SignInFormContent>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useSignInFormComposition();
  return (
    <SignInFormContent {...props}>
      {children === undefined ? (
        <>
          <span className="mb-5 grid size-10 place-items-center rounded-xl border border-border bg-muted/30">
            <LockKeyhole size={18} />
          </span>
          <SignInFormTitle>{heading}</SignInFormTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sign in to pick up where you left off.
          </p>
        </>
      ) : (
        children
      )}
    </SignInFormContent>
  );
}
export function SignInFormEmailField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const {} = useSignInFormComposition();
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
export function SignInFormPasswordField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const {} = useSignInFormComposition();
  return (
    <FormField label="Password" {...props}>
      {children === undefined ? (
        <PasswordInput
          name="password"
          required
          minLength={8}
          autoComplete="current-password"
        />
      ) : (
        children
      )}
    </FormField>
  );
}
export function SignInFormSubmit({
  children,
  ...props
}: Partial<React.ComponentProps<typeof Button>> & {
  children?: React.ReactNode;
}) {
  const { busy } = useSignInFormComposition();
  return (
    <Button type="submit" loading={busy} {...props}>
      {children === undefined ? "Sign in" : children}
    </Button>
  );
}
export function SignInFormStatus({ children }: React.PropsWithChildren) {
  const { status } = useSignInFormComposition();
  return children === undefined
    ? status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )
    : children;
}
