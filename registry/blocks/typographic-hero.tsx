"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const TypographicHeroCopy = {
  brand: "OTHER® — DESIGN & DIRECTION",
  meta: "OPEN TO GOOD PROBLEMS",
};
export type TypographicHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "description" | "className" | "href"
>;
export type TypographicHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof TypographicHeroOptions
> &
  TypographicHeroOptions;
function useTypographicHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: TypographicHeroProps) {
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
const TypographicHeroCompositionContext = React.createContext<ReturnType<
  typeof useTypographicHeroModel
> | null>(null);
function useTypographicHeroComposition() {
  const context = React.useContext(TypographicHeroCompositionContext);
  if (!context)
    throw new Error("TypographicHero parts must be inside TypographicHero.");
  return context;
}
export function TypographicHero(props: TypographicHeroProps) {
  const model = useTypographicHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <TypographicHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#ef582f] text-[#231d18]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <TypographicHeroMasthead />
            <TypographicHeroIntro />
          </>
        )}
      </section>
    </TypographicHeroCompositionContext.Provider>
  );
}

export function TypographicHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typographic-hero-header"
      className={cn(
        "flex items-center justify-between border-b border-black/20 p-7 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}
export function TypographicHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typographic-hero-content"
      className={cn("p-7 md:p-12", className)}
      {...props}
    />
  );
}
export function TypographicHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="typographic-hero-title"
      className={cn(
        "font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-[.82] tracking-[-.075em]",
        className,
      )}
      {...props}
    />
  );
}

export function TypographicHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TypographicHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <TypographicHeroHeader {...props}>
      {children === undefined ? (
        <>
          <TypographicHeroBrand />
          <TypographicHeroMeta />
        </>
      ) : (
        children
      )}
    </TypographicHeroHeader>
  );
}
export function TypographicHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TypographicHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = useTypographicHeroComposition();
  return (
    <TypographicHeroContent {...props}>
      {children === undefined ? (
        <>
          <TypographicHeroTitle>
            {title ?? (
              <>
                GOOD
                <br />
                <span className="block text-right">WEIRD.</span>
                <span className="block">WORK.</span>
              </>
            )}
          </TypographicHeroTitle>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-7">
            <TypographicHeroDescription />
            <TypographicHeroAction />
          </div>
        </>
      ) : (
        children
      )}
    </TypographicHeroContent>
  );
}

export function TypographicHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTypographicHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.meta ?? "OPEN TO GOOD PROBLEMS")
        : children}
    </span>
  );
}
export function TypographicHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTypographicHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.brand ?? "OTHER® — DESIGN & DIRECTION")
        : children}
    </span>
  );
}
export function TypographicHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useTypographicHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Take a look around")
        : children}
    </HeroLink>
  );
}
export function TypographicHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useTypographicHeroComposition();
  return (
    <p
      {...props}
      className={cn("max-w-xs text-sm leading-relaxed", props.className)}
    >
      {children === undefined
        ? (description ??
          "For people with something to say. We turn a point of view into a world you can step inside.")
        : children}
    </p>
  );
}
