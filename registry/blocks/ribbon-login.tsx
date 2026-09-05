"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
import { HeroArt } from "./hero-art";
export function RibbonLogin({
  className,
  brand = "Fold",
  title = "Back to making.",
  description = "Sign in to open your workspace.",
  animated = true,
  ...handlers
}: LoginHandlers & LoginPresentation & { animated?: boolean }) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#10151d] p-5 md:p-10",
        className,
      )}
    >
      <div className="flex items-center justify-between text-[#dce5f2]">
        <span className="text-2xl">{brand}</span>
        <span className="text-xs">A home for unfinished ideas.</span>
      </div>
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
        <div className="relative z-10 my-8 rounded-xl bg-background p-7 md:p-9">
          <h1 className="text-3xl tracking-tight">{title}</h1>
          <p className="mb-8 mt-3 text-sm text-muted-foreground">
            {description}
          </p>
          <LoginFields {...handlers} />
        </div>
        <div className="min-w-0 pb-6">
          {animated ? (
            <HeroArt
              kind="ribbons"
              color="#8daed1"
              className="h-80 md:h-[480px]"
            />
          ) : (
            <p className="py-16 text-center text-7xl text-[#8daed1]">{brand}</p>
          )}
          <p className="mt-5 text-center text-xl text-[#dce5f2]">
            Give your next idea a little form.
          </p>
        </div>
      </div>
    </section>
  );
}
