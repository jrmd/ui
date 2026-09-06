"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const ConstellationHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive constellation artwork",
  brand: "COMMON ORBIT",
  footerNote: "Different disciplines. Shared curiosity.",
};
export type ConstellationHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "artwork"
  | "className"
  | "href"
>;
export type ConstellationHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof ConstellationHeroOptions
> &
  ConstellationHeroOptions;
function useConstellationHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: ConstellationHeroProps) {
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
const ConstellationHeroCompositionContext = React.createContext<ReturnType<
  typeof useConstellationHeroModel
> | null>(null);
function useConstellationHeroComposition() {
  const context = React.useContext(ConstellationHeroCompositionContext);
  if (!context)
    throw new Error(
      "ConstellationHero parts must be inside ConstellationHero.",
    );
  return context;
}
export function ConstellationHero(props: ConstellationHeroProps) {
  const model = useConstellationHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <ConstellationHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "@container relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#e0eee6]",
          className,
        )}
      >
        {children !== undefined ? children : <ConstellationHeroLayout />}
      </section>
    </ConstellationHeroCompositionContext.Provider>
  );
}

export function ConstellationHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="constellation-hero-content"
      className={cn("grid @min-[640px]:grid-cols-[1.2fr_1fr]", className)}
      {...props}
    />
  );
}
export function ConstellationHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="constellation-hero-title"
      className={cn(
        "mt-10 font-display text-[clamp(2.5rem,5.7cqi,4.5rem)] leading-[1.04] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function ConstellationHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ConstellationHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <ConstellationHeroContent {...props}>
      {children === undefined ? (
        <>
          <ConstellationHeroCopyContent />
          <div className="flex min-w-0 flex-col">
            <ConstellationHeroArtwork />
            <ConstellationHeroFootnote />
          </div>
        </>
      ) : (
        children
      )}
    </ConstellationHeroContent>
  );
}

export function ConstellationHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useConstellationHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "Find your people") : children}
    </HeroLink>
  );
}
export function ConstellationHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useConstellationHeroComposition();
  return (
    <p
      {...props}
      className={cn("text-xs tracking-widest text-[#91b6a4]", props.className)}
    >
      {children === undefined ? (copy.brand ?? "COMMON ORBIT") : children}
    </p>
  );
}
export function ConstellationHeroFootnote({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useConstellationHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "border-t border-white/15 px-6 py-5 text-xs text-[#a9bdb2]",
        props.className,
      )}
    >
      {children === undefined
        ? (copy.footerNote ?? "Different disciplines. Shared curiosity.")
        : children}
    </p>
  );
}
export function ConstellationHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useConstellationHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "my-7 max-w-xs text-sm leading-relaxed text-[#a9bdb2]",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "A home for independent minds. Connect your ideas to people who see what you see.")
        : children}
    </p>
  );
}
export function ConstellationHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useConstellationHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="constellation"
      {...props}
      className={cn(
        "h-72 @min-[640px]:h-auto @min-[640px]:min-h-80 @min-[640px]:flex-1",
        props.className,
      )}
    >
      {children}
    </HeroArt>
  );
}
export function ConstellationHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useConstellationHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "relative z-10 px-6 py-8 @min-[640px]:p-10",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <ConstellationHeroBrand />
          <ConstellationHeroTitle>
            {title ?? (
              <>
                Better things
                <br />
                happen
                <br />
                <span className="text-[#91b6a4]">between us.</span>
              </>
            )}
          </ConstellationHeroTitle>
          <ConstellationHeroDescription />
          <ConstellationHeroAction />
        </>
      ) : (
        children
      )}
    </div>
  );
}
