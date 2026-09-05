"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginPresentation,
  type LoginHandlers,
} from "./login-fields";
export type SplitLoginOptions = LoginHandlers &
  LoginPresentation & {
    heading?: React.ReactNode;
  } & {
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
  };
export type SplitLoginProps = Omit<
  React.ComponentProps<"section">,
  keyof SplitLoginOptions
> &
  SplitLoginOptions;

export function SplitLogin({
  heading = (
    <>
      Good work
      <br />
      starts with
      <br />
      <em>good company.</em>
    </>
  ),
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
}: SplitLoginProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "grid min-h-svh overflow-hidden rounded-xl border border-border bg-background md:grid-cols-2",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <SplitLoginContent>
            <span className="font-display text-xl">{brand ?? "Common."}</span>
            <div
              aria-hidden
              className="absolute -right-24 top-24 size-[420px] rounded-full border-[56px] border-[#9db18a]/20"
            />
            <div className="relative">
              <p className="mb-6 text-xs uppercase tracking-widest text-[#aabca3]">
                A little more space to think
              </p>
              <SplitLoginTitle>{heading}</SplitLoginTitle>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#bbc9b4]">
                Bring your projects, your people, and your next big idea
                together.
              </p>
            </div>
            <span className="text-xs text-[#aabca3]">
              Built for the way you work.
            </span>
          </SplitLoginContent>
          <div className="flex flex-col justify-center px-7 py-12 md:px-12">
            <div className="mx-auto w-full max-w-sm">
              <p className="mb-8 font-display text-lg md:hidden">
                {brand ?? "Common."}
              </p>
              <h1 className="font-display text-3xl tracking-tight">
                {title ?? <>Welcome back.</>}
              </h1>
              <p className="mb-8 mt-2 text-sm text-muted-foreground">
                {description ?? <>Pick up where you left off.</>}
              </p>
              {form !== undefined ? (
                form
              ) : (
                <LoginFields onSubmit={onSubmit} onSSO={onSSO} {...formProps} />
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function SplitLoginContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="split-login-content"
      className={cn(
        "relative hidden flex-col justify-between overflow-hidden bg-[#26362c] p-10 text-[#e7eddf] md:flex",
        className,
      )}
      {...props}
    />
  );
}
export function SplitLoginTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="split-login-title"
      className={cn("font-serif text-5xl leading-tight", className)}
      {...props}
    />
  );
}
