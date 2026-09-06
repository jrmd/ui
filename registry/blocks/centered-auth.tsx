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
type CenteredAuthOptions = LoginHandlers &
  LoginPresentation & {
    mode?: AuthMode;
    defaultMode?: AuthMode;
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
    resetFormProps?: PasswordResetFormProps;
    footer?: React.ReactNode;
    onModeChange?: (mode: AuthMode) => void;
  };
export type CenteredAuthProps = Omit<
  React.ComponentProps<"section">,
  keyof CenteredAuthOptions
> &
  CenteredAuthOptions;
function useModel({
  className,
  brand = "FIELD NOTES",
  title,
  description,
  mode = "sign-in",
  defaultMode: _defaultMode,
  onSubmit,
  onSSO,
  form,
  formProps,
  resetFormProps,
  footer,
  onModeChange,
  children,
  ...rootProps
}: CenteredAuthProps) {
  return {
    className,
    brand,
    title:
      title ??
      (mode === "sign-up"
        ? "Make room for what matters."
        : mode === "reset-request"
          ? "Find your way back."
          : mode === "reset-password"
            ? "Set a new password."
            : "Welcome back."),
    description:
      description ??
      (mode === "sign-up"
        ? "Create your account and start with a clear workspace."
        : mode.startsWith("reset")
          ? "A few secure steps, then you can continue."
          : "Sign in to continue where you left off."),
    mode,
    onSubmit,
    onSSO,
    form,
    formProps,
    resetFormProps,
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
  if (!context)
    throw new Error("CenteredAuth parts must be inside CenteredAuth.");
  return context;
}
export function CenteredAuth(props: CenteredAuthProps) {
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
          "grid min-h-[680px] place-items-center overflow-hidden rounded-xl border border-border bg-muted/30 px-5 py-12",
          model.className,
        )}
      >
        {model.children === undefined ? <CenteredAuthPanel /> : model.children}
      </section>
    </Context.Provider>
  );
}
export const CenteredAuthPanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { children?: React.ReactNode }
>(function CenteredAuthPanel({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="centered-auth-panel"
      className={cn(
        "w-full max-w-md rounded-2xl bg-background p-7 shadow-[0_18px_44px_#17181712] sm:p-10",
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <CenteredAuthHeader />
          <CenteredAuthForm />
          <CenteredAuthFooter />
        </>
      ) : (
        children
      )}
    </div>
  );
});
export const CenteredAuthHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { children?: React.ReactNode }
>(function CenteredAuthHeader({ className, children, ...props }, ref) {
  const { brand, title, description } = useAuth();
  return (
    <div
      ref={ref}
      data-slot="centered-auth-header"
      className={cn("mb-8", className)}
      {...props}
    >
      {children === undefined ? (
        <>
          <p className="mb-6 text-xs font-semibold tracking-[.2em] text-muted-foreground">
            {brand}
          </p>
          <CenteredAuthTitle>{title}</CenteredAuthTitle>
          <CenteredAuthDescription>{description}</CenteredAuthDescription>
        </>
      ) : (
        children
      )}
    </div>
  );
});
export const CenteredAuthTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h1">
>(function CenteredAuthTitle({ className, ...props }, ref) {
  return (
    <h1
      ref={ref}
      data-slot="centered-auth-title"
      className={cn("font-display text-3xl tracking-tight", className)}
      {...props}
    />
  );
});
export const CenteredAuthDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function CenteredAuthDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="centered-auth-description"
      className={cn(
        "mt-3 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
export function CenteredAuthForm({
  children,
  ...props
}: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  const { mode, onSubmit, onSSO, form, formProps, resetFormProps } = useAuth();
  return (
    <div data-slot="centered-auth-form" {...props}>
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
export function CenteredAuthFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"p"> & { children?: React.ReactNode }) {
  const { footer, mode, onModeChange } = useAuth();
  return (
    <p
      data-slot="centered-auth-footer"
      className={cn(
        "mt-7 text-center text-xs text-muted-foreground",
        className,
      )}
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
                Create an account
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
