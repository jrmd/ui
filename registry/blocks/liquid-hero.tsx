"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const LiquidHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive liquid artwork",
  brand: "Tide®",
  eyebrow: "Ideas in motion",
};
export type LiquidHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type LiquidHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof LiquidHeroOptions
> &
  LiquidHeroOptions;
function useLiquidHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: LiquidHeroProps) {
  return {
    copy,
    title,
    actionLabel,
    description,
    artwork,
    className,
    href,
    children,
    rootProps,
  };
}
const LiquidHeroCompositionContext = React.createContext<ReturnType<
  typeof useLiquidHeroModel
> | null>(null);
function useLiquidHeroComposition() {
  const context = React.useContext(LiquidHeroCompositionContext);
  if (!context) throw new Error("LiquidHero parts must be inside LiquidHero.");
  return context;
}
export function LiquidHero(props: LiquidHeroProps) {
  const model = useLiquidHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <LiquidHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#1c2945] text-[#edf1fb]",
          className,
        )}
      >
        {children !== undefined ? children : <LiquidHeroLayout />}
      </section>
    </LiquidHeroCompositionContext.Provider>
  );
}

export function LiquidHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="liquid-hero-content"
      className={cn("grid md:grid-cols-2", className)}
      {...props}
    />
  );
}
export function LiquidHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="liquid-hero-title"
      className={cn(
        "font-display text-6xl leading-[.95] tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function LiquidHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof LiquidHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <LiquidHeroContent {...props}>
      {children === undefined ? (
        <>
          <LiquidHeroCopyContent />
          <LiquidHeroArtwork />
        </>
      ) : (
        children
      )}
    </LiquidHeroContent>
  );
}

export function LiquidHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useLiquidHeroComposition();
  return (
    <span {...props} className={cn("font-display text-xl", props.className)}>
      {children === undefined ? (copy.brand ?? "Tide®") : children}
    </span>
  );
}
export function LiquidHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useLiquidHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "Find your rhythm") : children}
    </HeroLink>
  );
}
export function LiquidHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useLiquidHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "mb-5 text-xs uppercase tracking-widest text-[#a8bade]",
        props.className,
      )}
    >
      {children === undefined ? (copy.eyebrow ?? "Ideas in motion") : children}
    </p>
  );
}
export function LiquidHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useLiquidHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "my-7 max-w-xs text-sm leading-relaxed text-[#bac8e4]",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "A quiet current for a busy mind. Your space to think, collect, and begin again.")
        : children}
    </p>
  );
}
export function LiquidHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useLiquidHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="liquid"
      color="#98bccc"
      {...props}
      className={cn("min-h-80 md:min-h-[570px]", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function LiquidHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useLiquidHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-start justify-between gap-10 p-8 md:p-12",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <LiquidHeroBrand />
          <div>
            <LiquidHeroEyebrow />
            <LiquidHeroTitle>
              {title ?? (
                <>
                  Stay
                  <br />
                  in your
                  <br />
                  <em className="font-serif font-normal">flow.</em>
                </>
              )}
            </LiquidHeroTitle>
            <LiquidHeroDescription />
            <LiquidHeroAction />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
