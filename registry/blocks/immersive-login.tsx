"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
import { HeroArt } from "./hero-art";
export type ImmersiveLoginOptions = LoginHandlers &
  LoginPresentation & {
    animated?: boolean;
  } & {
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
  };
export type ImmersiveLoginProps = Omit<
  React.ComponentProps<"section">,
  keyof ImmersiveLoginOptions
> &
  ImmersiveLoginOptions;
function useImmersiveLoginModel({
  className,
  brand = "Orbit",
  title = "Welcome to your space.",
  description = "Your ideas have somewhere to go.",
  animated = true,
  onSubmit,
  onSSO,
  form,
  formProps,
  children,
  ...rootProps
}: ImmersiveLoginProps) {
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
const ImmersiveLoginCompositionContext = React.createContext<ReturnType<
  typeof useImmersiveLoginModel
> | null>(null);
function useImmersiveLoginComposition() {
  const context = React.useContext(ImmersiveLoginCompositionContext);
  if (!context)
    throw new Error("ImmersiveLogin parts must be inside ImmersiveLogin.");
  return context;
}
export function ImmersiveLogin(props: ImmersiveLoginProps) {
  const model = useImmersiveLoginModel(props);
  const { className, rootProps, children } = model;
  return (
    <ImmersiveLoginCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "grid min-h-[720px] overflow-hidden rounded-xl bg-[#241c2b] md:grid-cols-[1.2fr_1fr]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <ImmersiveLoginArtwork />
            <ImmersiveLoginFormPanel />
          </>
        )}
      </section>
    </ImmersiveLoginCompositionContext.Provider>
  );
}

export function ImmersiveLoginContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="immersive-login-content"
      className={cn(
        "relative flex min-h-80 flex-col justify-between overflow-hidden p-7 text-[#f4e9e0] md:p-10",
        className,
      )}
      {...props}
    />
  );
}
export function ImmersiveLoginTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="immersive-login-title"
      className={cn("text-3xl tracking-tight", className)}
      {...props}
    />
  );
}

export function ImmersiveLoginArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ImmersiveLoginContent>> & {
  children?: React.ReactNode;
}) {
  const { brand, animated } = useImmersiveLoginComposition();
  return (
    <ImmersiveLoginContent {...props}>
      {children === undefined ? (
        <>
          <span className="relative z-10 text-2xl">{brand}</span>
          {animated ? (
            <HeroArt
              kind="orb"
              color="#dfaa84"
              className="absolute inset-0 h-full"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center text-8xl font-medium opacity-20"
            >
              {brand}
            </div>
          )}
          <p className="pointer-events-none relative z-10 mt-48 max-w-xs text-4xl leading-tight">
            A little space.
            <br />A world of possibility.
          </p>
        </>
      ) : (
        children
      )}
    </ImmersiveLoginContent>
  );
}
export function ImmersiveLoginFormPanel({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  return (
    <ImmersiveLoginCopyContent {...props}>{children}</ImmersiveLoginCopyContent>
  );
}

export function ImmersiveLoginDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useImmersiveLoginComposition();
  return (
    <p
      {...props}
      className={cn("mb-8 mt-3 text-sm text-muted-foreground", props.className)}
    >
      {children === undefined ? description : children}
    </p>
  );
}
export function ImmersiveLoginCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title, onSubmit, onSSO, form, formProps } =
    useImmersiveLoginComposition();
  return (
    <div
      {...props}
      className={cn(
        cn(
          "flex items-center bg-background px-7 py-12 md:px-10",
          props.className,
        ),
        props.className,
      )}
    >
      {children === undefined ? (
        children === undefined ? (
          <div className="mx-auto w-full max-w-sm">
            <ImmersiveLoginTitle>{title}</ImmersiveLoginTitle>
            <ImmersiveLoginDescription />
            {form !== undefined ? (
              form
            ) : (
              <LoginFields onSubmit={onSubmit} onSSO={onSSO} {...formProps} />
            )}
          </div>
        ) : (
          children
        )
      ) : (
        children
      )}
    </div>
  );
}
