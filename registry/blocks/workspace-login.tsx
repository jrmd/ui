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
export function WorkspaceLogin({
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
  return (
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
          <WorkspaceLoginContent
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(var(--color-muted-foreground) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-7 shadow-[0_16px_64px_#0000000a] md:p-10">
            <div className="mb-8">
              <p className="mb-7 text-xs font-semibold tracking-[.25em]">
                {brand ?? "COMMON / WORKSPACE"}
              </p>
              <WorkspaceLoginTitle>
                {title ?? <>Your team is in here.</>}
              </WorkspaceLoginTitle>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description ?? (
                  <>
                    Use your company email to continue with your organisation’s
                    identity provider.
                  </>
                )}
              </p>
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
          </div>
          <WorkspaceLoginDescription>
            Single sign-on for your whole organisation.
          </WorkspaceLoginDescription>
        </>
      )}
    </section>
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
