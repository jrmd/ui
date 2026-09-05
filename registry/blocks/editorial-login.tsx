"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
export function EditorialLogin({
  className,
  brand = "Margin",
  title = "A good place to return to.",
  description = "Sign in to your reading room.",
  imageSrc = "/assets/editorial-slow.svg",
  imageAlt = "Editorial artwork about slow creative practice",
  ...handlers
}: LoginHandlers &
  LoginPresentation & { imageSrc?: string; imageAlt?: string }) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
    >
      <header className="flex flex-wrap justify-between gap-3 border-b border-border px-7 py-5">
        <span className="font-serif text-3xl">{brand}</span>
        <span className="self-center text-xs text-muted-foreground">
          For the endlessly curious.
        </span>
      </header>
      <div className="grid md:grid-cols-2">
        <div className="flex items-center px-7 py-12 md:px-12">
          <div className="mx-auto w-full max-w-sm">
            <h1 className="font-serif text-4xl leading-tight">{title}</h1>
            <p className="mb-8 mt-4 text-sm text-muted-foreground">
              {description}
            </p>
            <LoginFields {...handlers} />
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
      </div>
    </section>
  );
}
