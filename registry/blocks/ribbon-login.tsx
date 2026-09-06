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
function useRibbonLoginModel({
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
  return {
    className,
    brand,
    title,
    description,
    animated,
    onSubmit,
    onSSO,
    form,
    formProps,
    children,
    rootProps,
  };
}
const RibbonLoginCompositionContext = React.createContext<ReturnType<
  typeof useRibbonLoginModel
> | null>(null);
function useRibbonLoginComposition() {
  const context = React.useContext(RibbonLoginCompositionContext);
  if (!context)
    throw new Error("RibbonLogin parts must be inside RibbonLogin.");
  return context;
}
export function RibbonLogin(props: RibbonLoginProps) {
  const model = useRibbonLoginModel(props);
  const { className, rootProps, children } = model;
  return (
    <RibbonLoginCompositionContext.Provider value={model}>
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
            <RibbonLoginMasthead />
            <RibbonLoginFormPanel />
          </>
        )}
      </section>
    </RibbonLoginCompositionContext.Provider>
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

export function RibbonLoginMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof RibbonLoginHeader>> & {
  children?: React.ReactNode;
}) {
  const { brand } = useRibbonLoginComposition();
  return (
    <RibbonLoginHeader {...props}>
      {children === undefined ? (
        <>
          <span className="text-2xl">{brand}</span>
          <span className="text-xs">A home for unfinished ideas.</span>
        </>
      ) : (
        children
      )}
    </RibbonLoginHeader>
  );
}
export function RibbonLoginFormPanel({
  children,
  ...props
}: Partial<React.ComponentProps<typeof RibbonLoginContent>> & {
  children?: React.ReactNode;
}) {
  const { brand, animated } = useRibbonLoginComposition();
  return (
    <RibbonLoginContent {...props}>
      {children === undefined ? (
        <>
          <RibbonLoginCopyContent />
          <div className="min-w-0 pb-6">
            {animated ? (
              <RibbonLoginArtwork />
            ) : (
              <p className="py-16 text-center text-7xl text-[#8daed1]">
                {brand}
              </p>
            )}
            <p className="mt-5 text-center text-xl text-[#dce5f2]">
              Give your next idea a little form.
            </p>
          </div>
        </>
      ) : (
        children
      )}
    </RibbonLoginContent>
  );
}

export function RibbonLoginDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useRibbonLoginComposition();
  return (
    <p
      {...props}
      className={cn("mb-8 mt-3 text-sm text-muted-foreground", props.className)}
    >
      {children === undefined ? description : children}
    </p>
  );
}
export function RibbonLoginArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  return (
    <HeroArt
      kind="ribbons"
      color="#8daed1"
      {...props}
      className={cn("h-80 md:h-[480px]", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function RibbonLoginCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title, onSubmit, onSSO, form, formProps } =
    useRibbonLoginComposition();
  return (
    <div
      {...props}
      className={cn(
        "relative z-10 my-8 rounded-xl bg-background p-7 md:p-9",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <RibbonLoginTitle>{title}</RibbonLoginTitle>
          <RibbonLoginDescription />
          {form !== undefined ? (
            form
          ) : (
            <LoginFields onSubmit={onSubmit} onSSO={onSSO} {...formProps} />
          )}
        </>
      ) : (
        children
      )}
    </div>
  );
}
