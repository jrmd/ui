"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  LoginFields,
  type LoginHandlers,
  type LoginPresentation,
} from "./login-fields";
import { HeroArt } from "./hero-art";
export function ImmersiveLogin({
  className,
  brand = "Orbit",
  title = "Welcome to your space.",
  description = "Your ideas have somewhere to go.",
  animated = true,
  ...handlers
}: LoginHandlers & LoginPresentation & { animated?: boolean }) {
  return (
    <section
      className={cn(
        "grid min-h-[720px] overflow-hidden rounded-xl bg-[#241c2b] md:grid-cols-[1.2fr_1fr]",
        className,
      )}
    >
      <div className="relative flex min-h-80 flex-col justify-between overflow-hidden p-7 text-[#f4e9e0] md:p-10">
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
      </div>
      <div className="flex items-center bg-background px-7 py-12 md:px-10">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-3xl tracking-tight">{title}</h1>
          <p className="mb-8 mt-3 text-sm text-muted-foreground">
            {description}
          </p>
          <LoginFields {...handlers} />
        </div>
      </div>
    </section>
  );
}
