"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const EclipseHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive eclipse artwork",
  brand: "UMBRA",
  eyebrow: "An encounter with the unseen",
  footerNote: "A digital exhibition · Open to everyone",
};
export type EclipseHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type EclipseHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof EclipseHeroOptions
> &
  EclipseHeroOptions;
function useEclipseHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: EclipseHeroProps) {
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
const EclipseHeroCompositionContext = React.createContext<ReturnType<
  typeof useEclipseHeroModel
> | null>(null);
function useEclipseHeroComposition() {
  const context = React.useContext(EclipseHeroCompositionContext);
  if (!context)
    throw new Error("EclipseHero parts must be inside EclipseHero.");
  return context;
}
export function EclipseHero(props: EclipseHeroProps) {
  const model = useEclipseHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <EclipseHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#f3dec0]",
          className,
        )}
      >
        {children !== undefined ? children : <EclipseHeroLayout />}
      </section>
    </EclipseHeroCompositionContext.Provider>
  );
}

export function EclipseHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="eclipse-hero-content"
      className={cn("grid gap-0 md:grid-cols-[1fr_1.3fr]", className)}
      {...props}
    />
  );
}
export function EclipseHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="eclipse-hero-title"
      className={cn(
        "font-display text-5xl leading-none tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function EclipseHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EclipseHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <EclipseHeroContent {...props}>
      {children === undefined ? (
        <>
          <EclipseHeroCopyContent />
          <EclipseHeroArtwork />
        </>
      ) : (
        children
      )}
    </EclipseHeroContent>
  );
}

export function EclipseHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useEclipseHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Enter the exhibition")
        : children}
    </HeroLink>
  );
}
export function EclipseHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useEclipseHeroComposition();
  return (
    <span
      {...props}
      className={cn("font-display text-xl tracking-[.25em]", props.className)}
    >
      {children === undefined ? (copy.brand ?? "UMBRA") : children}
    </span>
  );
}
export function EclipseHeroFootnote({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useEclipseHeroComposition();
  return (
    <span {...props} className={cn("text-xs text-white/40", props.className)}>
      {children === undefined
        ? (copy.footerNote ?? "A digital exhibition · Open to everyone")
        : children}
    </span>
  );
}
export function EclipseHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useEclipseHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "mb-5 text-xs uppercase tracking-widest text-[#d0a367]",
        props.className,
      )}
    >
      {children === undefined
        ? (copy.eyebrow ?? "An encounter with the unseen")
        : children}
    </p>
  );
}
export function EclipseHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useEclipseHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "my-7 max-w-xs text-sm leading-relaxed text-white/55",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "Art, science, and a little uncertainty. A new way of looking at the world.")
        : children}
    </p>
  );
}
export function EclipseHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useEclipseHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="eclipse"
      {...props}
      className={cn("min-h-[350px] md:min-h-[580px]", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function EclipseHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useEclipseHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-start justify-between gap-12 p-8 md:p-12",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <EclipseHeroBrand />
          <div>
            <EclipseHeroEyebrow />
            <EclipseHeroTitle>
              {title ?? (
                <>
                  Beyond
                  <br />
                  the visible.
                </>
              )}
            </EclipseHeroTitle>
            <EclipseHeroDescription />
            <EclipseHeroAction />
          </div>
          <EclipseHeroFootnote />
        </>
      ) : (
        children
      )}
    </div>
  );
}
