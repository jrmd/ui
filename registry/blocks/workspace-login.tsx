"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginPresentation,
  type LoginHandlers,
} from "./login-fields";
export function WorkspaceLogin({
  title,
  description,
  brand,
  className,
  ...handlers
}: LoginHandlers & LoginPresentation) {
  return (
    <section
      className={cn(
        "relative grid min-h-[740px] place-items-center overflow-hidden rounded-xl bg-muted p-6",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-muted-foreground) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-7 shadow-[0_16px_64px_#0000000a] md:p-10">
        <div className="mb-8">
          <p className="mb-7 text-xs font-semibold tracking-[.25em]">
            {brand ?? "COMMON / WORKSPACE"}
          </p>
          <h1 className="font-display text-2xl tracking-tight">
            {title ?? <>Your team is in here.</>}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description ?? (
              <>
                Use your company email to continue with your organisation’s
                identity provider.
              </>
            )}
          </p>
        </div>
        <LoginFields enterprise {...handlers} />
      </div>
      <p className="relative mt-5 text-center text-xs text-muted-foreground">
        Single sign-on for your whole organisation.
      </p>
    </section>
  );
}
