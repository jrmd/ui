"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const PosterHeroCopy = {
  brand: "ASSEMBLY / A GATHERING OF IDEAS",
  meta: "ONLINE & EVERYWHERE",
  tagline: "Design. Culture.",
  taglineEnd: "Whatever comes next.",
};
export type PosterHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "description" | "className" | "href"
>;
export type PosterHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof PosterHeroOptions
> &
  PosterHeroOptions;
function usePosterHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: PosterHeroProps) {
  return {
    copy,
    title,
    actionLabel,
    description,
    className,
    href,
    children,
    rootProps,
  };
}
const PosterHeroCompositionContext = React.createContext<ReturnType<
  typeof usePosterHeroModel
> | null>(null);
function usePosterHeroComposition() {
  const context = React.useContext(PosterHeroCompositionContext);
  if (!context) throw new Error("PosterHero parts must be inside PosterHero.");
  return context;
}
export function PosterHero(props: PosterHeroProps) {
  const model = usePosterHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <PosterHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#dfeb5a] text-[#243022]",
          className,
        )}
      >
        {children !== undefined ? children : <PosterHeroLayout />}
      </section>
    </PosterHeroCompositionContext.Provider>
  );
}

export function PosterHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="poster-hero-content"
      className={cn("p-7 md:p-12", className)}
      {...props}
    />
  );
}
export function PosterHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="poster-hero-title"
      className={cn(
        "font-display text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[.86] tracking-[-.065em]",
        className,
      )}
      {...props}
    />
  );
}

export function PosterHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof PosterHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { copy } = usePosterHeroComposition();
  return (
    <PosterHeroContent {...props}>
      {children === undefined ? (
        <>
          <div className="flex justify-between text-xs font-medium">
            <PosterHeroBrand />
            <PosterHeroMeta />
          </div>
          <PosterHeroCopyContent />
          <div className="grid gap-7 md:grid-cols-[1fr_1fr_auto]">
            <p className="text-sm font-medium">
              {copy.tagline ?? "Design. Culture."}
              <br />
              {copy.taglineEnd ?? "Whatever comes next."}
            </p>
            <PosterHeroDescription />
            <div>
              <PosterHeroAction />
            </div>
          </div>
        </>
      ) : (
        children
      )}
    </PosterHeroContent>
  );
}

export function PosterHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = usePosterHeroComposition();
  return (
    <span {...props}>
      {children === undefined ? (copy.meta ?? "ONLINE & EVERYWHERE") : children}
    </span>
  );
}
export function PosterHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = usePosterHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.brand ?? "ASSEMBLY / A GATHERING OF IDEAS")
        : children}
    </span>
  );
}
export function PosterHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = usePosterHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "View programme") : children}
    </HeroLink>
  );
}
export function PosterHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = usePosterHeroComposition();
  return (
    <p
      {...props}
      className={cn("max-w-xs text-sm leading-relaxed", props.className)}
    >
      {children === undefined
        ? (description ??
          "Conversations for curious people. A programme built around sharing what we know and asking what we don’t.")
        : children}
    </p>
  );
}
export function PosterHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = usePosterHeroComposition();
  return (
    <div
      {...props}
      className={cn("my-12 border-y-2 border-[#243022] py-6", props.className)}
    >
      {children === undefined ? (
        <PosterHeroTitle>
          {title ?? (
            <>
              COME WITH
              <br />
              QUESTIONS.
              <br />
              <span className="font-serif font-normal italic tracking-tight">
                Leave inspired.
              </span>
            </>
          )}
        </PosterHeroTitle>
      ) : (
        children
      )}
    </div>
  );
}
