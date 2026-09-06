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
type InsetAuthOptions = LoginHandlers &
  LoginPresentation & {
    mode?: AuthMode;
    defaultMode?: AuthMode;
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
    resetFormProps?: PasswordResetFormProps;
    footer?: React.ReactNode;
    onModeChange?: (mode: AuthMode) => void;
  };
export type InsetAuthProps = Omit<
  React.ComponentProps<"section">,
  keyof InsetAuthOptions
> &
  InsetAuthOptions;
function useModel({
  className,
  brand = "STUDIO / 27",
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
}: InsetAuthProps) {
  return {
    className,
    brand,
    title:
      title ??
      (mode === "sign-up"
        ? "Join the studio."
        : mode.startsWith("reset")
          ? "Restore your access."
          : "Back to the studio."),
    description: description ?? "Everything you need, held in one quiet place.",
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
  if (!context) throw new Error("InsetAuth parts must be inside InsetAuth.");
  return context;
}
export function InsetAuth(props: InsetAuthProps) {
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
          "relative min-h-[680px] overflow-hidden rounded-xl bg-foreground p-4 sm:p-7",
          model.className,
        )}
      >
        {model.children === undefined ? (
          <>
            <InsetAuthFrame />
            <InsetAuthPanel />
          </>
        ) : (
          model.children
        )}
      </section>
    </Context.Provider>
  );
}
export const InsetAuthFrame = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function InsetAuthFrame({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      data-slot="inset-auth-frame"
      className={cn(
        "absolute inset-4 rounded-lg border border-primary-foreground/25 sm:inset-7",
        className,
      )}
      {...props}
    />
  );
});
export const InsetAuthPanel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { children?: React.ReactNode }
>(function InsetAuthPanel({ className, children, ...props }, ref) {
  const { brand } = useAuth();
  return (
    <div
      ref={ref}
      data-slot="inset-auth-panel"
      className={cn(
        "relative mx-auto flex min-h-[648px] w-full max-w-xl flex-col justify-center bg-background px-7 py-12 sm:px-14",
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <p className="absolute left-7 top-8 text-xs font-semibold tracking-[.2em] sm:left-14">
            {brand}
          </p>
          <div className="w-full">
            <InsetAuthHeader />
            <InsetAuthForm />
            <InsetAuthFooter />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
});
export function InsetAuthHeader({
  children,
  ...props
}: React.ComponentProps<"header"> & { children?: React.ReactNode }) {
  const { title, description } = useAuth();
  return (
    <header data-slot="inset-auth-header" className="mb-8" {...props}>
      {children === undefined ? (
        <>
          <InsetAuthTitle>{title}</InsetAuthTitle>
          <InsetAuthDescription>{description}</InsetAuthDescription>
        </>
      ) : (
        children
      )}
    </header>
  );
}
export const InsetAuthTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h1">
>(function InsetAuthTitle({ className, ...props }, ref) {
  return (
    <h1
      ref={ref}
      data-slot="inset-auth-title"
      className={cn("max-w-sm font-display text-4xl tracking-tight", className)}
      {...props}
    />
  );
});
export const InsetAuthDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function InsetAuthDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="inset-auth-description"
      className={cn(
        "mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
});
export function InsetAuthForm({
  children,
  ...props
}: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  const { mode, onSubmit, onSSO, form, formProps, resetFormProps } = useAuth();
  return (
    <div data-slot="inset-auth-form" {...props}>
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
export function InsetAuthFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"p"> & { children?: React.ReactNode }) {
  const { footer, mode, onModeChange } = useAuth();
  return (
    <p
      data-slot="inset-auth-footer"
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
                Create your account
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
