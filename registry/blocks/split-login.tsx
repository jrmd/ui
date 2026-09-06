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

function useSplitLoginModel({
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
  return {
    heading,
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
const SplitLoginCompositionContext = React.createContext<ReturnType<
  typeof useSplitLoginModel
> | null>(null);
function useSplitLoginComposition() {
  const context = React.useContext(SplitLoginCompositionContext);
  if (!context) throw new Error("SplitLogin parts must be inside SplitLogin.");
  return context;
}
export function SplitLogin(props: SplitLoginProps) {
  const model = useSplitLoginModel(props);
  const { className, rootProps, children } = model;
  return (
    <SplitLoginCompositionContext.Provider value={model}>
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
            <SplitLoginBrandPanel />
            <SplitLoginFormPanel />
          </>
        )}
      </section>
    </SplitLoginCompositionContext.Provider>
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

export function SplitLoginBrandPanel({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SplitLoginContent>> & {
  children?: React.ReactNode;
}) {
  const { brand } = useSplitLoginComposition();
  return (
    <SplitLoginContent {...props}>
      {children === undefined ? (
        <>
          <span className="font-display text-xl">{brand ?? "Common."}</span>
          <div
            aria-hidden
            className="absolute -right-24 top-24 size-[420px] rounded-full border-[56px] border-[#9db18a]/20"
          />
          <SplitLoginCopyContent />
          <span className="text-xs text-[#aabca3]">
            Built for the way you work.
          </span>
        </>
      ) : (
        children
      )}
    </SplitLoginContent>
  );
}
export function SplitLoginFormPanel({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title, brand, onSubmit, onSSO, form, formProps } =
    useSplitLoginComposition();
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col justify-center px-7 py-12 md:px-12",
        props.className,
      )}
    >
      {children === undefined ? (
        <div className="mx-auto w-full max-w-sm">
          <p className="mb-8 font-display text-lg md:hidden">
            {brand ?? "Common."}
          </p>
          <h1 className="font-display text-3xl tracking-tight">
            {title ?? "Welcome back."}
          </h1>
          <SplitLoginDescription />
          {form !== undefined ? (
            form
          ) : (
            <LoginFields onSubmit={onSubmit} onSSO={onSSO} {...formProps} />
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export function SplitLoginDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useSplitLoginComposition();
  return (
    <p
      {...props}
      className={cn("mb-8 mt-2 text-sm text-muted-foreground", props.className)}
    >
      {children === undefined
        ? (description ?? "Pick up where you left off.")
        : children}
    </p>
  );
}
export function SplitLoginCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { heading } = useSplitLoginComposition();
  return (
    <div {...props} className={cn("relative", props.className)}>
      {children === undefined ? (
        <>
          <p className="mb-6 text-xs uppercase tracking-widest text-[#aabca3]">
            A little more space to think
          </p>
          <SplitLoginTitle>{heading}</SplitLoginTitle>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#bbc9b4]">
            Bring your projects, your people, and your next big idea together.
          </p>
        </>
      ) : (
        children
      )}
    </div>
  );
}
