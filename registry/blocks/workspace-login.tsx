"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginPresentation,
  type LoginHandlers,
} from "./login-fields";
export type WorkspaceLoginOptions = LoginHandlers &
  LoginPresentation & {
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
  };
export type WorkspaceLoginProps = Omit<
  React.ComponentProps<"section">,
  keyof WorkspaceLoginOptions
> &
  WorkspaceLoginOptions;
function useWorkspaceLoginModel({
  title,
  description,
  brand,
  className,
  onSubmit,
  onSSO,
  form,
  formProps,
  children,
  ...rootProps
}: WorkspaceLoginProps) {
  return {
    title,
    description,
    brand,
    className,
    onSubmit,
    onSSO,
    form,
    formProps,
    children,
    rootProps,
  };
}
const WorkspaceLoginCompositionContext = React.createContext<ReturnType<
  typeof useWorkspaceLoginModel
> | null>(null);
function useWorkspaceLoginComposition() {
  const context = React.useContext(WorkspaceLoginCompositionContext);
  if (!context)
    throw new Error("WorkspaceLogin parts must be inside WorkspaceLogin.");
  return context;
}
export function WorkspaceLogin(props: WorkspaceLoginProps) {
  const model = useWorkspaceLoginModel(props);
  const { className, rootProps, children } = model;
  return (
    <WorkspaceLoginCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative grid min-h-[740px] place-items-center overflow-hidden rounded-xl bg-muted p-6",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <WorkspaceLoginBackdrop />
            <WorkspaceLoginFormPanel />
            <WorkspaceLoginFooter />
          </>
        )}
      </section>
    </WorkspaceLoginCompositionContext.Provider>
  );
}

export function WorkspaceLoginContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="workspace-login-content"
      className={cn("absolute inset-0 opacity-30", className)}
      {...props}
    />
  );
}
export function WorkspaceLoginTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="workspace-login-title"
      className={cn("font-display text-2xl tracking-tight", className)}
      {...props}
    />
  );
}
export function WorkspaceLoginDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="workspace-login-description"
      className={cn(
        "relative mt-5 text-center text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function WorkspaceLoginBackdrop({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WorkspaceLoginContent>> & {
  children?: React.ReactNode;
}) {
  const {} = useWorkspaceLoginComposition();
  return children === undefined ? (
    <WorkspaceLoginContent
      aria-hidden
      style={{
        backgroundImage:
          "radial-gradient(var(--color-muted-foreground) 1px,transparent 1px)",
        backgroundSize: "24px 24px",
      }}
      {...props}
    />
  ) : (
    children
  );
}
export function WorkspaceLoginFormPanel({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  return (
    <WorkspaceLoginCopyContent {...props}>{children}</WorkspaceLoginCopyContent>
  );
}
export function WorkspaceLoginFooter({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WorkspaceLoginDescription>> & {
  children?: React.ReactNode;
}) {
  const {} = useWorkspaceLoginComposition();
  return (
    <WorkspaceLoginDescription {...props}>
      {children === undefined
        ? "Single sign-on for your whole organisation."
        : children}
    </WorkspaceLoginDescription>
  );
}

export function WorkspaceLoginLead({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useWorkspaceLoginComposition();
  return (
    <p
      {...props}
      className={cn(
        "mt-2 text-sm leading-relaxed text-muted-foreground",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "Use your company email to continue with your organisation’s identity provider.")
        : children}
    </p>
  );
}
export function WorkspaceLoginCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title, brand, onSubmit, onSSO, form, formProps } =
    useWorkspaceLoginComposition();
  return (
    <div
      {...props}
      className={cn(
        cn(
          "relative w-full max-w-md rounded-2xl border border-border bg-background p-7 shadow-[0_16px_64px_#0000000a] md:p-10",
          props.className,
        ),
        props.className,
      )}
    >
      {children === undefined ? (
        children === undefined ? (
          <>
            <div className="mb-8">
              <p className="mb-7 text-xs font-semibold tracking-[.25em]">
                {brand ?? "COMMON / WORKSPACE"}
              </p>
              <WorkspaceLoginTitle>
                {title ?? "Your team is in here."}
              </WorkspaceLoginTitle>
              <WorkspaceLoginLead />
            </div>
            {form !== undefined ? (
              form
            ) : (
              <LoginFields
                enterprise
                onSubmit={onSubmit}
                onSSO={onSSO}
                {...formProps}
              />
            )}
          </>
        ) : (
          children
        )
      ) : (
        children
      )}
    </div>
  );
}
