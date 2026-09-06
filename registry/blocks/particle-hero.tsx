"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const ParticleHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive particles artwork",
  eyebrow: "ATLAS / COLLECTIVE INTELLIGENCE",
};
export type ParticleHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type ParticleHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof ParticleHeroOptions
> &
  ParticleHeroOptions;
function useParticleHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: ParticleHeroProps) {
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
const ParticleHeroCompositionContext = React.createContext<ReturnType<
  typeof useParticleHeroModel
> | null>(null);
function useParticleHeroComposition() {
  const context = React.useContext(ParticleHeroCompositionContext);
  if (!context)
    throw new Error("ParticleHero parts must be inside ParticleHero.");
  return context;
}
export function ParticleHero(props: ParticleHeroProps) {
  const model = useParticleHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <ParticleHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#10101c] text-[#efedf7]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <ParticleHeroIntro />
            <ParticleHeroArtwork />
            <ParticleHeroFooter />
          </>
        )}
      </section>
    </ParticleHeroCompositionContext.Provider>
  );
}

export function ParticleHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="particle-hero-content"
      className={cn("relative z-10 px-7 pt-9 text-center", className)}
      {...props}
    />
  );
}
export function ParticleHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="particle-hero-title"
      className={cn(
        "mx-auto mt-8 max-w-2xl font-display text-5xl leading-[.95] tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
export function ParticleHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="particle-hero-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-5 border-t border-white/15 p-7",
        className,
      )}
      {...props}
    />
  );
}

export function ParticleHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ParticleHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = useParticleHeroComposition();
  return (
    <ParticleHeroContent {...props}>
      {children === undefined ? (
        <>
          <ParticleHeroEyebrow />
          <ParticleHeroTitle>
            {title ?? (
              <>
                A million signals.
                <br />
                One new perspective.
              </>
            )}
          </ParticleHeroTitle>
        </>
      ) : (
        children
      )}
    </ParticleHeroContent>
  );
}
export function ParticleHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useParticleHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="particles"
      {...props}
      className={cn("-mt-6 h-80 md:h-96", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function ParticleHeroFooter({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ParticleHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <ParticleHeroHeader {...props}>
      {children === undefined ? (
        <>
          <ParticleHeroDescription />
          <ParticleHeroAction />
        </>
      ) : (
        children
      )}
    </ParticleHeroHeader>
  );
}

export function ParticleHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useParticleHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "Start exploring") : children}
    </HeroLink>
  );
}
export function ParticleHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useParticleHeroComposition();
  return (
    <p
      {...props}
      className={cn("text-xs tracking-[.3em] text-[#b9a4f8]", props.className)}
    >
      {children === undefined
        ? (copy.eyebrow ?? "ATLAS / COLLECTIVE INTELLIGENCE")
        : children}
    </p>
  );
}
export function ParticleHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useParticleHeroComposition();
  return (
    <p
      {...props}
      className={cn("max-w-sm text-sm text-white/60", props.className)}
    >
      {children === undefined
        ? (description ??
          "Find the patterns hiding in plain sight. Make space for the next discovery.")
        : children}
    </p>
  );
}
