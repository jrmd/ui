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

function useSignUpFormModel({
  heading = "Your next chapter.",
  className,
  onSubmit,
  children,
  ...rootProps
}: SignUpFormProps) {
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
const SignUpFormCompositionContext = React.createContext<ReturnType<
  typeof useSignUpFormModel
> | null>(null);
function useSignUpFormComposition() {
  const context = React.useContext(SignUpFormCompositionContext);
  if (!context) throw new Error("SignUpForm parts must be inside SignUpForm.");
  return context;
}
export function SignUpForm(props: SignUpFormProps) {
  const model = useSignUpFormModel(props);
  const { className, onSubmit, rootProps, setStatus, setBusy, children } =
    model;
  return (
    <SignUpFormCompositionContext.Provider value={model}>
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
            <SignUpFormIntro />
            <SignUpFormNameField />
            <SignUpFormEmailField />
            <SignUpFormPasswordField />
            <SignUpFormSubmit />
            <SignUpFormStatus />
          </>
        )}
      </form>
    </SignUpFormCompositionContext.Provider>
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

export function SignUpFormIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SignUpFormContent>> & {
  children?: React.ReactNode;
}) {
  const { heading } = useSignUpFormComposition();
  return (
    <SignUpFormContent {...props}>
      {children === undefined ? (
        <>
          <span className="mb-5 grid size-10 place-items-center rounded-xl border border-border bg-muted/30">
            <LockKeyhole size={18} />
          </span>
          <SignUpFormTitle>{heading}</SignUpFormTitle>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Create an account and give your work a home.
          </p>
        </>
      ) : (
        children
      )}
    </SignUpFormContent>
  );
}
export function SignUpFormNameField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const {} = useSignUpFormComposition();
  return (
    <FormField label="Name" {...props}>
      {children === undefined ? (
        <Input name="name" type="text" required autoComplete="name" />
      ) : (
        children
      )}
    </FormField>
  );
}
export function SignUpFormEmailField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const {} = useSignUpFormComposition();
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
export function SignUpFormPasswordField({
  children,
  ...props
}: Partial<React.ComponentProps<typeof FormField>> & {
  children?: React.ReactNode;
}) {
  const {} = useSignUpFormComposition();
  return (
    <FormField label="Password" hint="Use at least 8 characters." {...props}>
      {children === undefined ? (
        <PasswordInput
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      ) : (
        children
      )}
    </FormField>
  );
}
export function SignUpFormSubmit({
  children,
  ...props
}: Partial<React.ComponentProps<typeof Button>> & {
  children?: React.ReactNode;
}) {
  const { busy } = useSignUpFormComposition();
  return (
    <Button type="submit" loading={busy} {...props}>
      {children === undefined ? "Create account" : children}
    </Button>
  );
}
export function SignUpFormStatus({ children }: React.PropsWithChildren) {
  const { status } = useSignUpFormComposition();
  return children === undefined
    ? status && (
        <p role="status" className="text-sm">
          {status}
        </p>
      )
    : children;
}
