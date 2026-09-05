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
export function EditorialLogin({
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
  return (
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
          <EditorialLoginHeader>
            <span className="font-serif text-3xl">{brand}</span>
            <span className="self-center text-xs text-muted-foreground">
              For the endlessly curious.
            </span>
          </EditorialLoginHeader>
          <EditorialLoginContent>
            <div className="flex items-center px-7 py-12 md:px-12">
              <div className="mx-auto w-full max-w-sm">
                <EditorialLoginTitle>{title}</EditorialLoginTitle>
                <p className="mb-8 mt-4 text-sm text-muted-foreground">
                  {description}
                </p>
                {form !== undefined ? (
                  form
                ) : (
                  <LoginFields
                    onSubmit={onSubmit}
                    onSSO={onSSO}
                    {...formProps}
                  />
                )}
              </div>
            </div>
            <figure className="flex flex-col bg-muted p-6">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="min-h-64 w-full flex-1 rounded-lg object-cover"
              />
              <figcaption className="flex justify-between gap-4 pt-5 text-xs">
                <span>The art of paying attention.</span>
                <span>Studio notes</span>
              </figcaption>
            </figure>
          </EditorialLoginContent>
        </>
      )}
    </section>
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
