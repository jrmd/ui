"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginPresentation,
  type LoginHandlers,
} from "./login-fields";
export function SSOLogin({
  title,
  description,
  brand,
  className,
  ...handlers
}: LoginHandlers & LoginPresentation) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-md rounded-2xl border border-border bg-background p-7 shadow-sm md:p-10",
        className,
      )}
    >
      <div className="mb-8">
        <span className="mb-7 grid size-10 place-items-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
          {brand ?? "c"}
        </span>
        <h1 className="font-display text-2xl tracking-tight">
          {title ?? <>Welcome to Common</>}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? <>Good to see you. Choose your way in.</>}
        </p>
      </div>
      <LoginFields {...handlers} />
    </section>
  );
}
