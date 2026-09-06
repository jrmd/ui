"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
export type EditorialLoginOptions = LoginHandlers &
  LoginPresentation & {
    imageSrc?: string;
    imageAlt?: string;
  } & {
    form?: React.ReactNode;
    formProps?: React.ComponentProps<typeof LoginFields>;
  };
export type EditorialLoginProps = Omit<
  React.ComponentProps<"section">,
  keyof EditorialLoginOptions
> &
  EditorialLoginOptions;
function useEditorialLoginModel({
  className,
  brand = "Margin",
  title = "A good place to return to.",
  description = "Sign in to your reading room.",
  imageSrc = "/assets/editorial-slow.svg",
  imageAlt = "Editorial artwork about slow creative practice",
  onSubmit,
  onSSO,
  form,
  formProps,
  children,
  ...rootProps
}: EditorialLoginProps) {
  return {
    className,
    brand,
    title,
    description,
    imageSrc,
    imageAlt,
    onSubmit,
    onSSO,
    form,
    formProps,
    children,
    rootProps,
  };
}
const EditorialLoginCompositionContext = React.createContext<ReturnType<
  typeof useEditorialLoginModel
> | null>(null);
function useEditorialLoginComposition() {
  const context = React.useContext(EditorialLoginCompositionContext);
  if (!context)
    throw new Error("EditorialLogin parts must be inside EditorialLogin.");
  return context;
}
export function EditorialLogin(props: EditorialLoginProps) {
  const model = useEditorialLoginModel(props);
  const { className, rootProps, children } = model;
  return (
    <EditorialLoginCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-background",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <EditorialLoginMasthead />
            <EditorialLoginLayout />
          </>
        )}
      </section>
    </EditorialLoginCompositionContext.Provider>
  );
}

export function EditorialLoginHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="editorial-login-header"
      className={cn(
        "flex flex-wrap justify-between gap-3 border-b border-border px-7 py-5",
        className,
      )}
      {...props}
    />
  );
}
export function EditorialLoginContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="editorial-login-content"
      className={cn("grid md:grid-cols-2", className)}
      {...props}
    />
  );
}
export function EditorialLoginTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="editorial-login-title"
      className={cn("font-serif text-4xl leading-tight", className)}
      {...props}
    />
  );
}

export function EditorialLoginMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialLoginHeader>> & {
  children?: React.ReactNode;
}) {
  const { brand } = useEditorialLoginComposition();
  return (
    <EditorialLoginHeader {...props}>
      {children === undefined ? (
        <>
          <span className="font-serif text-3xl">{brand}</span>
          <span className="self-center text-xs text-muted-foreground">
            For the endlessly curious.
          </span>
        </>
      ) : (
        children
      )}
    </EditorialLoginHeader>
  );
}
export function EditorialLoginLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialLoginContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <EditorialLoginContent {...props}>
      {children === undefined ? (
        <>
          <EditorialLoginCopyContent />
          <figure className="flex flex-col bg-muted p-6">
            <EditorialLoginMedia />
            <figcaption className="flex justify-between gap-4 pt-5 text-xs">
              <span>The art of paying attention.</span>
              <span>Studio notes</span>
            </figcaption>
          </figure>
        </>
      ) : (
        children
      )}
    </EditorialLoginContent>
  );
}

export function EditorialLoginDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useEditorialLoginComposition();
  return (
    <p
      {...props}
      className={cn("mb-8 mt-4 text-sm text-muted-foreground", props.className)}
    >
      {children === undefined ? description : children}
    </p>
  );
}
export function EditorialLoginMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { imageSrc, imageAlt } = useEditorialLoginComposition();
  return children === undefined ? (
    <img
      src={imageSrc}
      alt={imageAlt}
      {...props}
      className={cn(
        "min-h-64 w-full flex-1 rounded-lg object-cover",
        props.className,
      )}
    />
  ) : (
    children
  );
}
export function EditorialLoginCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title, onSubmit, onSSO, form, formProps } =
    useEditorialLoginComposition();
  return (
    <div
      {...props}
      className={cn("flex items-center px-7 py-12 md:px-12", props.className)}
    >
      {children === undefined ? (
        <div className="mx-auto w-full max-w-sm">
          <EditorialLoginTitle>{title}</EditorialLoginTitle>
          <EditorialLoginDescription />
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
