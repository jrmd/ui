"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const DistortionHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive distortion artwork",
  brand: "FORM / EXPERIMENTAL DESIGN OFFICE",
  meta: "EST. 2026",
};
export type DistortionHeroOptions = Pick<
  HeroProps,
  | "artworkText"
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type DistortionHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof DistortionHeroOptions
> &
  DistortionHeroOptions;
function useDistortionHeroModel({
  artworkText,
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: DistortionHeroProps) {
  return {
    artworkText,
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
const DistortionHeroCompositionContext = React.createContext<ReturnType<
  typeof useDistortionHeroModel
> | null>(null);
function useDistortionHeroComposition() {
  const context = React.useContext(DistortionHeroCompositionContext);
  if (!context)
    throw new Error("DistortionHero parts must be inside DistortionHero.");
  return context;
}
export function DistortionHero(props: DistortionHeroProps) {
  const model = useDistortionHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <DistortionHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#d7dfcf] text-[#28352d]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <DistortionHeroMasthead />
            <DistortionHeroArtwork />
            <DistortionHeroIntro />
          </>
        )}
      </section>
    </DistortionHeroCompositionContext.Provider>
  );
}

export function DistortionHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="distortion-hero-header"
      className={cn(
        "flex items-center justify-between border-b border-[#28352d]/20 p-7 text-xs",
        className,
      )}
      {...props}
    />
  );
}
export function DistortionHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="distortion-hero-content"
      className={cn(
        "grid gap-6 border-t border-[#28352d]/20 p-8 md:grid-cols-2",
        className,
      )}
      {...props}
    />
  );
}
export function DistortionHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="distortion-hero-title"
      className={cn(
        "font-display text-4xl leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function DistortionHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof DistortionHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <DistortionHeroHeader {...props}>
      {children === undefined ? (
        <>
          <DistortionHeroBrand />
          <DistortionHeroMeta />
        </>
      ) : (
        children
      )}
    </DistortionHeroHeader>
  );
}
export function DistortionHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { artworkText, copy, artwork } = useDistortionHeroComposition();
  return (
    <HeroArt
      text={artworkText}
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="distortion"
      {...props}
      className={cn("h-72 md:h-96", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function DistortionHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof DistortionHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = useDistortionHeroComposition();
  return (
    <DistortionHeroContent {...props}>
      {children === undefined ? (
        <>
          <DistortionHeroTitle>
            {title ?? (
              <>
                Nothing good
                <br />
                stands still.
              </>
            )}
          </DistortionHeroTitle>
          <div className="flex flex-col items-start gap-5">
            <DistortionHeroDescription />
            <DistortionHeroAction />
          </div>
        </>
      ) : (
        children
      )}
    </DistortionHeroContent>
  );
}

export function DistortionHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useDistortionHeroComposition();
  return (
    <span {...props}>
      {children === undefined ? (copy.meta ?? "EST. 2026") : children}
    </span>
  );
}
export function DistortionHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useDistortionHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.brand ?? "FORM / EXPERIMENTAL DESIGN OFFICE")
        : children}
    </span>
  );
}
export function DistortionHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useDistortionHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "See what moves us") : children}
    </HeroLink>
  );
}
export function DistortionHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useDistortionHeroComposition();
  return (
    <p
      {...props}
      className={cn("max-w-sm text-sm leading-relaxed", props.className)}
    >
      {children === undefined
        ? (description ??
          "Identities that move. Experiences that respond. A practice built around the possibilities of the screen.")
        : children}
    </p>
  );
}
