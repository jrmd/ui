"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const SilkHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive silk artwork",
  brand: "Atelier No. 9",
  meta: "Independent design practice",
  eyebrow: "NOTHING EXTRA. EVERYTHING CONSIDERED.",
};
export type SilkHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "artwork" | "className" | "href"
>;
export type SilkHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof SilkHeroOptions
> &
  SilkHeroOptions;
function useSilkHeroModel({
  copy = {},
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: SilkHeroProps) {
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
const SilkHeroCompositionContext = React.createContext<ReturnType<
  typeof useSilkHeroModel
> | null>(null);
function useSilkHeroComposition() {
  const context = React.useContext(SilkHeroCompositionContext);
  if (!context) throw new Error("SilkHero parts must be inside SilkHero.");
  return context;
}
export function SilkHero(props: SilkHeroProps) {
  const model = useSilkHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <SilkHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#e4eadf]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <SilkHeroMasthead />
            <SilkHeroScene />
            <SilkHeroFooter />
          </>
        )}
      </section>
    </SilkHeroCompositionContext.Provider>
  );
}

export function SilkHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="silk-hero-header"
      className={cn("flex items-center justify-between p-7", className)}
      {...props}
    />
  );
}
export function SilkHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="silk-hero-content"
      className={cn("relative", className)}
      {...props}
    />
  );
}
export function SilkHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="silk-hero-title"
      className={cn(
        "font-serif text-[clamp(2rem,8vw,6rem)] leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function SilkHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SilkHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <SilkHeroHeader {...props}>
      {children === undefined ? (
        <>
          <SilkHeroBrand />
          <SilkHeroMeta />
        </>
      ) : (
        children
      )}
    </SilkHeroHeader>
  );
}
export function SilkHeroScene({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SilkHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <SilkHeroContent {...props}>
      {children === undefined ? (
        <>
          <SilkHeroArtwork />
          <SilkHeroCopyContent />
        </>
      ) : (
        children
      )}
    </SilkHeroContent>
  );
}
export function SilkHeroFooter({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  return (
    <div
      {...props}
      className={cn(
        "flex justify-center border-t border-white/15 py-6",
        props.className,
      )}
    >
      {children === undefined ? <SilkHeroAction /> : children}
    </div>
  );
}

export function SilkHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useSilkHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Selected work, 2026")
        : children}
    </HeroLink>
  );
}
export function SilkHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useSilkHeroComposition();
  return (
    <span
      {...props}
      className={cn("font-serif text-2xl italic", props.className)}
    >
      {children === undefined ? (copy.brand ?? "Atelier No. 9") : children}
    </span>
  );
}
export function SilkHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useSilkHeroComposition();
  return (
    <span {...props} className={cn("text-xs text-white/50", props.className)}>
      {children === undefined
        ? (copy.meta ?? "Independent design practice")
        : children}
    </span>
  );
}
export function SilkHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useSilkHeroComposition();
  return (
    <p
      {...props}
      className={cn("mb-7 text-xs tracking-[.35em]", props.className)}
    >
      {children === undefined
        ? (copy.eyebrow ?? "NOTHING EXTRA. EVERYTHING CONSIDERED.")
        : children}
    </p>
  );
}
export function SilkHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useSilkHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="silk"
      {...props}
      className={cn("h-[460px]", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function SilkHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useSilkHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <SilkHeroEyebrow />
          <SilkHeroTitle>
            {title ?? (
              <>
                Quietly
                <br />
                <em>extraordinary.</em>
              </>
            )}
          </SilkHeroTitle>
        </>
      ) : (
        children
      )}
    </div>
  );
}
