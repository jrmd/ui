"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
import { HeroArt } from "./hero-art";
export type RibbonLoginOptions = LoginHandlers &
  LoginPresentation & {
    animated?: boolean;
  } & {
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
  };
export type RibbonLoginProps = Omit<
  React.ComponentProps<"section">,
  keyof RibbonLoginOptions
> &
  RibbonLoginOptions;
export function RibbonLogin({
  className,
  brand = "Fold",
  title = "Back to making.",
  description = "Sign in to open your workspace.",
  animated = true,
  onSubmit,
  onSSO,
  form,
  formProps,
  children,
  ...rootProps
}: RibbonLoginProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#10151d] p-5 md:p-10",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <RibbonLoginHeader>
            <span className="text-2xl">{brand}</span>
            <span className="text-xs">A home for unfinished ideas.</span>
          </RibbonLoginHeader>
          <RibbonLoginContent>
            <div className="relative z-10 my-8 rounded-xl bg-background p-7 md:p-9">
              <RibbonLoginTitle>{title}</RibbonLoginTitle>
              <p className="mb-8 mt-3 text-sm text-muted-foreground">
                {description}
              </p>
              {form !== undefined ? (
                form
              ) : (
                <LoginFields onSubmit={onSubmit} onSSO={onSSO} {...formProps} />
              )}
            </div>
            <div className="min-w-0 pb-6">
              {animated ? (
                <HeroArt
                  kind="ribbons"
                  color="#8daed1"
                  className="h-80 md:h-[480px]"
                />
              ) : (
                <p className="py-16 text-center text-7xl text-[#8daed1]">
                  {brand}
                </p>
              )}
              <p className="mt-5 text-center text-xl text-[#dce5f2]">
                Give your next idea a little form.
              </p>
            </div>
          </RibbonLoginContent>
        </>
      )}
    </section>
  );
}

export function RibbonLoginHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ribbon-login-header"
      className={cn(
        "flex items-center justify-between text-[#dce5f2]",
        className,
      )}
      {...props}
    />
  );
}
export function RibbonLoginContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ribbon-login-content"
      className={cn(
        "grid items-center gap-8 md:grid-cols-[1fr_1.1fr]",
        className,
      )}
      {...props}
    />
  );
}
export function RibbonLoginTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="ribbon-login-title"
      className={cn("text-3xl tracking-tight", className)}
      {...props}
    />
  );
}
