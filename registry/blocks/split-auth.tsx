"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
import {
  PasswordResetForm,
  PasswordResetFormEmailField,
  PasswordResetFormPasswordFields,
  PasswordResetFormStatus,
  PasswordResetFormSubmit,
  type PasswordResetFormProps,
} from "./password-reset-form";
type AuthMode = "sign-in" | "sign-up" | "reset-request" | "reset-password";
type SplitAuthOptions = LoginHandlers &
  LoginPresentation & {
    mode?: AuthMode;
    defaultMode?: AuthMode;
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
    resetFormProps?: PasswordResetFormProps;
    quote?: React.ReactNode;
    footer?: React.ReactNode;
    onModeChange?: (mode: AuthMode) => void;
  };
export type SplitAuthProps = Omit<
  React.ComponentProps<"section">,
  keyof SplitAuthOptions
> &
  SplitAuthOptions;
function useModel({
  className,
  brand = "COMMON GROUND",
  title,
  description,
  mode = "sign-in",
  defaultMode: _defaultMode,
  onSubmit,
  onSSO,
  form,
  formProps,
  resetFormProps,
  quote = "A considered start makes the work feel lighter.",
  footer,
  onModeChange,
  children,
  ...rootProps
}: SplitAuthProps) {
  return {
    className,
    brand,
    title:
      title ??
      (mode === "sign-up"
        ? "Build a place for your work."
        : mode.startsWith("reset")
          ? "Let’s get you back on track."
          : "Your work is waiting."),
    description: description ?? "A focused account space for the work ahead.",
    mode,
    onSubmit,
    onSSO,
    form,
    formProps,
    resetFormProps,
    quote,
    footer,
    onModeChange,
    children,
    rootProps,
  };
}
function useControllableMode(
  mode: AuthMode | undefined,
  defaultMode: AuthMode | undefined,
  onModeChange: ((mode: AuthMode) => void) | undefined,
) {
  const [uncontrolledMode, setUncontrolledMode] = React.useState(
    defaultMode ?? "sign-in",
  );
  const value = mode ?? uncontrolledMode;
  return [
    value,
    (nextMode: AuthMode) => {
      if (mode === undefined) setUncontrolledMode(nextMode);
      onModeChange?.(nextMode);
    },
  ] as const;
}
const Context = React.createContext<ReturnType<typeof useModel> | null>(null);
function useAuth() {
  const context = React.useContext(Context);
  if (!context) throw new Error("SplitAuth parts must be inside SplitAuth.");
  return context;
}
export function SplitAuth(props: SplitAuthProps) {
  const [mode, onModeChange] = useControllableMode(
    props.mode,
    props.defaultMode,
    props.onModeChange,
  );
  const model = useModel({ ...props, mode, onModeChange });
  return (
    <Context.Provider value={model}>
      <section
        {...model.rootProps}
        className={cn(
          "grid min-h-[680px] overflow-hidden rounded-xl border border-border bg-background md:grid-cols-[.95fr_1.05fr]",
          model.className,
        )}
      >
        {model.children === undefined ? (
          <>
            <SplitAuthAside />
            <SplitAuthMain />
          </>
        ) : (
          model.children
        )}
      </section>
    </Context.Provider>
  );
}
export const SplitAuthAside = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"aside"> & { children?: React.ReactNode }
>(function SplitAuthAside({ className, children, ...props }, ref) {
  const { brand, quote } = useAuth();
  return (
    <aside
      ref={ref}
      data-slot="split-auth-aside"
      className={cn(
        "flex min-h-64 flex-col justify-between bg-primary p-7 text-primary-foreground sm:p-10",
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <p className="text-xs font-semibold tracking-[.2em]">{brand}</p>
          <blockquote className="max-w-sm font-display text-3xl leading-tight tracking-tight">
            “{quote}”
          </blockquote>
          <p className="text-xs text-primary-foreground/70">
            A calm home for decisive work.
          </p>
        </>
      ) : (
        children
      )}
    </aside>
  );
});
export const SplitAuthMain = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { children?: React.ReactNode }
>(function SplitAuthMain({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="split-auth-main"
      className={cn("flex items-center px-7 py-14 sm:px-12", className)}
      {...props}
    >
      {children === undefined ? (
        <div className="mx-auto w-full max-w-sm">
          <SplitAuthHeader />
          <SplitAuthForm />
          <SplitAuthFooter />
        </div>
      ) : (
        children
      )}
    </div>
  );
});
export function SplitAuthHeader({
  children,
  ...props
}: React.ComponentProps<"header"> & { children?: React.ReactNode }) {
  const { title, description } = useAuth();
  return (
    <header data-slot="split-auth-header" className="mb-8" {...props}>
      {children === undefined ? (
        <>
          <SplitAuthTitle>{title}</SplitAuthTitle>
          <SplitAuthDescription>{description}</SplitAuthDescription>
        </>
      ) : (
        children
      )}
    </header>
  );
}
export const SplitAuthTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h1">
>(function SplitAuthTitle({ className, ...props }, ref) {
  return (
    <h1
      ref={ref}
      data-slot="split-auth-title"
      className={cn("font-display text-3xl tracking-tight", className)}
      {...props}
    />
  );
});
export const SplitAuthDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function SplitAuthDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="split-auth-description"
      className={cn(
        "mt-3 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
export function SplitAuthForm({
  children,
  ...props
}: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  const { mode, onSubmit, onSSO, form, formProps, resetFormProps } = useAuth();
  return (
    <div data-slot="split-auth-form" {...props}>
      {children === undefined
        ? (form ??
          (mode === "reset-request" || mode === "reset-password" ? (
            <PasswordResetForm
              key={mode}
              className="max-w-none border-0 p-0 sm:p-0"
              mode={mode === "reset-password" ? "new-password" : "request"}
              {...resetFormProps}
            >
              {mode === "reset-request" ? (
                <PasswordResetFormEmailField />
              ) : (
                <PasswordResetFormPasswordFields />
              )}
              <PasswordResetFormSubmit />
              <PasswordResetFormStatus />
            </PasswordResetForm>
          ) : (
            <LoginFields
              key={mode}
              mode={mode}
              onSubmit={onSubmit}
              onSSO={onSSO}
              {...formProps}
            />
          )))
        : children}
    </div>
  );
}
export function SplitAuthFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"p"> & { children?: React.ReactNode }) {
  const { footer, mode, onModeChange } = useAuth();
  return (
    <p
      data-slot="split-auth-footer"
      className={cn("mt-7 text-xs text-muted-foreground", className)}
      {...props}
    >
      {children === undefined
        ? (footer ??
          (mode === "sign-in" ? (
            <>
              <button
                type="button"
                className="underline underline-offset-4"
                onClick={() => onModeChange?.("reset-request")}
              >
                Forgot password?
              </button>
              <span aria-hidden="true"> · </span>
              <button
                type="button"
                className="underline underline-offset-4"
                onClick={() => onModeChange?.("sign-up")}
              >
                Sign up
              </button>
            </>
          ) : (
            <button
              type="button"
              className="underline underline-offset-4"
              onClick={() => onModeChange?.("sign-in")}
            >
              Sign in
            </button>
          )))
        : children}
    </p>
  );
}
