"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginPresentation,
  type LoginHandlers,
} from "./login-fields";
export type SSOLoginOptions = LoginHandlers & LoginPresentation;
export type SSOLoginProps = Omit<
  React.ComponentProps<"section">,
  keyof SSOLoginOptions
> &
  SSOLoginOptions;
export function SSOLogin({
  title,
  description,
  brand,
  className,
  onSubmit,
  onSSO,
  children,
  ...rootProps
}: SSOLoginProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "mx-auto w-full max-w-md rounded-2xl border border-border bg-background p-7 shadow-sm md:p-10",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <SSOLoginContent>
            <span className="mb-7 grid size-10 place-items-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
              {brand ?? "c"}
            </span>
            <SSOLoginTitle>{title ?? <>Welcome to Common</>}</SSOLoginTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              {description ?? <>Good to see you. Choose your way in.</>}
            </p>
          </SSOLoginContent>
          <LoginFields onSubmit={onSubmit} onSSO={onSSO} />
        </>
      )}
    </section>
  );
}

export function SSOLoginContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sso-login-content"
      className={cn("mb-8", className)}
      {...props}
    />
  );
}
export function SSOLoginTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="sso-login-title"
      className={cn("font-display text-2xl tracking-tight", className)}
      {...props}
    />
  );
}
