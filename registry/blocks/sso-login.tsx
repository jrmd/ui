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
function useSSOLoginModel({
  title,
  description,
  brand,
  className,
  onSubmit,
  onSSO,
  children,
  ...rootProps
}: SSOLoginProps) {
  return {
    title,
    description,
    brand,
    className,
    onSubmit,
    onSSO,
    children,
    rootProps,
  };
}
const SSOLoginCompositionContext = React.createContext<ReturnType<
  typeof useSSOLoginModel
> | null>(null);
function useSSOLoginComposition() {
  const context = React.useContext(SSOLoginCompositionContext);
  if (!context) throw new Error("SSOLogin parts must be inside SSOLogin.");
  return context;
}
export function SSOLogin(props: SSOLoginProps) {
  const model = useSSOLoginModel(props);
  const { className, rootProps, children } = model;
  return (
    <SSOLoginCompositionContext.Provider value={model}>
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
            <SSOLoginIntro />
            <SSOLoginFields />
          </>
        )}
      </section>
    </SSOLoginCompositionContext.Provider>
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

export function SSOLoginIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SSOLoginContent>> & {
  children?: React.ReactNode;
}) {
  const { title, brand } = useSSOLoginComposition();
  return (
    <SSOLoginContent {...props}>
      {children === undefined ? (
        <>
          <span className="mb-7 grid size-10 place-items-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
            {brand ?? "c"}
          </span>
          <SSOLoginTitle>{title ?? "Welcome to Common"}</SSOLoginTitle>
          <SSOLoginDescription />
        </>
      ) : (
        children
      )}
    </SSOLoginContent>
  );
}
export function SSOLoginFields({
  children,
  ...props
}: Partial<React.ComponentProps<typeof LoginFields>> & {
  children?: React.ReactNode;
}) {
  const { onSubmit, onSSO } = useSSOLoginComposition();
  return (
    <LoginFields onSubmit={onSubmit} onSSO={onSSO} {...props}>
      {children}
    </LoginFields>
  );
}

export function SSOLoginDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useSSOLoginComposition();
  return (
    <p
      {...props}
      className={cn("mt-2 text-sm text-muted-foreground", props.className)}
    >
      {children === undefined
        ? (description ?? "Good to see you. Choose your way in.")
        : children}
    </p>
  );
}
