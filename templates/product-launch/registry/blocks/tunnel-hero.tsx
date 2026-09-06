"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
import { HeroArt } from "./hero-art";
export const TunnelHeroCopy = {
  playLabel: "Play artwork",
  pauseLabel: "Pause artwork",
  artworkLabel: "Interactive tunnel artwork",
  brand: "AFTERHOURS",
  meta: "SOUND / SPACE / POSSIBILITY",
  eyebrow: "Leave the ordinary behind",
  footerNote: "An independent music & culture platform",
};
export type TunnelHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "artwork" | "className" | "href"
>;
export type TunnelHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof TunnelHeroOptions
> &
  TunnelHeroOptions;
function useTunnelHeroModel({
  copy = {},
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: TunnelHeroProps) {
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
const TunnelHeroCompositionContext = React.createContext<ReturnType<
  typeof useTunnelHeroModel
> | null>(null);
function useTunnelHeroComposition() {
  const context = React.useContext(TunnelHeroCompositionContext);
  if (!context) throw new Error("TunnelHero parts must be inside TunnelHero.");
  return context;
}
export function TunnelHero(props: TunnelHeroProps) {
  const model = useTunnelHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <TunnelHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#dce6f7]",
          className,
        )}
      >
        {children !== undefined ? children : <TunnelHeroScene />}
      </section>
    </TunnelHeroCompositionContext.Provider>
  );
}

export function TunnelHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tunnel-hero-content"
      className={cn("relative", className)}
      {...props}
    />
  );
}
export function TunnelHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="tunnel-hero-title"
      className={cn(
        "font-display text-6xl font-semibold leading-none tracking-tighter md:text-8xl",
        className,
      )}
      {...props}
    />
  );
}

export function TunnelHeroScene({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TunnelHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <TunnelHeroContent {...props}>
      {children === undefined ? (
        <>
          <TunnelHeroArtwork />
          <TunnelHeroCopyContent />
        </>
      ) : (
        children
      )}
    </TunnelHeroContent>
  );
}

export function TunnelHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTunnelHeroComposition();
  return (
    <span {...props}>
      {children === undefined ? (copy.brand ?? "AFTERHOURS") : children}
    </span>
  );
}
export function TunnelHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTunnelHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.meta ?? "SOUND / SPACE / POSSIBILITY")
        : children}
    </span>
  );
}
export function TunnelHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useTunnelHeroComposition();
  return (
    <p
      {...props}
      className={cn("mb-4 text-xs uppercase tracking-[.4em]", props.className)}
    >
      {children === undefined
        ? (copy.eyebrow ?? "Leave the ordinary behind")
        : children}
    </p>
  );
}
export function TunnelHeroFootnote({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTunnelHeroComposition();
  return (
    <span {...props} className={cn("text-xs text-white/50", props.className)}>
      {children === undefined
        ? (copy.footerNote ?? "An independent music & culture platform")
        : children}
    </span>
  );
}
export function TunnelHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useTunnelHeroComposition();
  return (
    <HeroLink
      href={href}
      {...props}
      className={cn("bg-[#030405]/70 backdrop-blur-sm", props.className)}
    >
      {children === undefined
        ? (actionLabel ?? "Explore the programme")
        : children}
    </HeroLink>
  );
}
export function TunnelHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroArt>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork } = useTunnelHeroComposition();
  return (
    <HeroArt
      options={{
        ...artwork,
        label: copy.artworkLabel ?? artwork?.label,
        playLabel: copy.playLabel ?? artwork?.playLabel,
        pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
      }}
      kind="tunnel"
      {...props}
      className={cn("h-[590px]", props.className)}
    >
      {children}
    </HeroArt>
  );
}
export function TunnelHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useTunnelHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col justify-between p-7 md:p-10",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <div className="flex justify-between text-xs tracking-widest">
            <TunnelHeroBrand />
            <TunnelHeroMeta />
          </div>
          <div className="text-center">
            <TunnelHeroEyebrow />
            <TunnelHeroTitle>{title ?? "GO DEEPER."}</TunnelHeroTitle>
            <div className="pointer-events-auto mt-8">
              <TunnelHeroAction />
            </div>
          </div>
          <TunnelHeroFootnote />
        </>
      ) : (
        children
      )}
    </div>
  );
}
