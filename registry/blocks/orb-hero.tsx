"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const OrbHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive orb artwork",
  brand: "SOMA / OBJECTS OF POSSIBILITY",
  meta: "01—03",
};
export type OrbHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "artwork" | "className" | "href"
>;
export type OrbHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof OrbHeroOptions
> &
  OrbHeroOptions;
function useOrbHeroModel({
  copy = {},
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: OrbHeroProps) {
  return {
    copy,
    title,
    actionLabel,
    artwork,
    className,
    href,
    children,
    rootProps,
  };
}
const OrbHeroCompositionContext = React.createContext<ReturnType<
  typeof useOrbHeroModel
> | null>(null);
function useOrbHeroComposition() {
  const context = React.useContext(OrbHeroCompositionContext);
  if (!context) throw new Error("OrbHero parts must be inside OrbHero.");
  return context;
}
export function OrbHero(props: OrbHeroProps) {
  const model = useOrbHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <OrbHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "@container relative isolate overflow-hidden rounded-xl bg-[#241c2b] text-[#f4e9e0]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <OrbHeroMasthead />
            <OrbHeroLayout />
          </>
        )}
      </section>
    </OrbHeroCompositionContext.Provider>
  );
}

export function OrbHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="orb-hero-header"
      className={cn(
        "relative z-10 flex items-center justify-between gap-6 px-6 py-6 text-xs @min-[640px]:px-10",
        className,
      )}
      {...props}
    />
  );
}
export function OrbHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="orb-hero-content"
      className={cn(
        "relative grid @min-[640px]:min-h-[440px] @min-[640px]:grid-cols-[1.1fr_1fr]",
        className,
      )}
      {...props}
    />
  );
}
export function OrbHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="orb-hero-title"
      className={cn(
        "font-display text-[clamp(2.5rem,5.8cqi,4.5rem)] leading-[1.04] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function OrbHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof OrbHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <OrbHeroHeader {...props}>
      {children === undefined ? (
        <>
          <OrbHeroBrand />
          <OrbHeroMeta />
        </>
      ) : (
        children
      )}
    </OrbHeroHeader>
  );
}
export function OrbHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof OrbHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <OrbHeroContent {...props}>
      {children === undefined ? (
        <>
          <OrbHeroArtwork />
          <OrbHeroCopyContent />
        </>
      ) : (
        children
      )}
    </OrbHeroContent>
  );
}

export function OrbHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useOrbHeroComposition();
  return (
    <span {...props}>
      {children === undefined ? (copy.meta ?? "01—03") : children}
    </span>
  );
}
export function OrbHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useOrbHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Meet the collection")
        : children}
    </HeroLink>
  );
}
export function OrbHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useOrbHeroComposition();
  return (
    <span {...props} className={cn("tracking-widest", props.className)}>
      {children === undefined
        ? (copy.brand ?? "SOMA / OBJECTS OF POSSIBILITY")
        : children}
    </span>
  );
}
export function OrbHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useOrbHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="orb"
      color="#dfaa84"
      {...props}
      className={cn(
        "order-2 h-80 @min-[640px]:col-start-2 @min-[640px]:row-start-1 @min-[640px]:h-full",
        props.className,
      )}
    >
      {children}
    </HeroArt>
  );
}
export function OrbHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useOrbHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "relative z-10 order-1 flex flex-col items-start justify-center px-6 pt-8 pb-4 @min-[640px]:col-start-1 @min-[640px]:row-start-1 @min-[640px]:px-10 @min-[640px]:py-12",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <OrbHeroTitle>
            {title ?? (
              <>
                Some things
                <br />
                just <em className="font-serif font-normal">feel</em>
                <br />
                different.
              </>
            )}
          </OrbHeroTitle>
          <div className="pointer-events-auto mt-7">
            <OrbHeroAction />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
