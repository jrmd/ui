"use client";
import * as React from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { WebGLRibbonField } from "../ui/webgl-ribbon-field";
export const WebglHeroCopy = {
  playLabel: "Play",
  pauseLabel: "Pause",
  animationName: "scene",
};
export type WebglHeroOptions = Pick<
  HeroProps,
  | "title"
  | "description"
  | "actionLabel"
  | "copy"
  | "artwork"
  | "className"
  | "href"
>;
export type WebglHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof WebglHeroOptions
> &
  WebglHeroOptions;
function useWebglHeroModel({
  title,
  description,
  actionLabel,
  copy = {},
  artwork,
  className,
  href = "#work",
  children,
  ...rootProps
}: WebglHeroProps) {
  const [paused, setPaused] = React.useState(false);
  return {
    title,
    description,
    actionLabel,
    copy,
    artwork,
    className,
    href,
    children,
    rootProps,
    paused,
    setPaused,
  };
}
const WebglHeroCompositionContext = React.createContext<ReturnType<
  typeof useWebglHeroModel
> | null>(null);
function useWebglHeroComposition() {
  const context = React.useContext(WebglHeroCompositionContext);
  if (!context) throw new Error("WebglHero parts must be inside WebglHero.");
  return context;
}
export function WebglHero(props: WebglHeroProps) {
  const model = useWebglHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <WebglHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "overflow-hidden rounded-xl bg-[#10151d] text-[#f0f4f8]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <WebglHeroIntro />
            <WebglHeroArtwork />
            <WebglHeroControls />
          </>
        )}
      </section>
    </WebglHeroCompositionContext.Provider>
  );
}

export function WebglHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="webgl-hero-content"
      className={cn(
        "grid gap-7 px-7 pt-10 md:grid-cols-[1.2fr_1fr] md:items-end md:px-12 md:pt-14",
        className,
      )}
      {...props}
    />
  );
}
export function WebglHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="webgl-hero-title"
      className={cn("max-w-xl text-5xl leading-[1.03] md:text-7xl", className)}
      {...props}
    />
  );
}
export function WebglHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="webgl-hero-header"
      className={cn(
        "mx-7 flex items-center justify-between gap-4 border-t border-white/15 py-6 md:mx-12",
        className,
      )}
      {...props}
    />
  );
}

export function WebglHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WebglHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = useWebglHeroComposition();
  return (
    <WebglHeroContent {...props}>
      {children === undefined ? (
        <>
          <WebglHeroTitle>
            {title ?? (
              <>
                Form follows
                <br />
                <span className="text-[#9fb6d0]">curiosity.</span>
              </>
            )}
          </WebglHeroTitle>
          <WebglHeroDescription />
        </>
      ) : (
        children
      )}
    </WebglHeroContent>
  );
}
export function WebglHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WebGLRibbonField>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork, paused } = useWebglHeroComposition();
  return children === undefined ? (
    <WebGLRibbonField
      color={artwork?.color}
      speed={artwork?.speed}
      paused={paused}
      label={
        copy.artworkLabel ?? "Seven flowing ribbons responding to your pointer"
      }
      {...props}
      className={cn("h-[280px] rounded-none md:h-[360px]", props.className)}
    />
  ) : (
    children
  );
}
export function WebglHeroControls({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WebglHeroHeader>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, copy, href, paused, setPaused } =
    useWebglHeroComposition();
  return (
    <WebglHeroHeader {...props}>
      {children === undefined ? (
        <>
          <a
            href={href}
            className="flex items-center gap-2 text-sm hover:text-[#9fb6d0]"
          >
            {actionLabel ?? "Explore the work"} <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-[#b9c5d3] hover:bg-white/10"
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            {paused
              ? (copy.playLabel ?? "Play")
              : (copy.pauseLabel ?? "Pause")}{" "}
            {copy.animationName ?? "scene"}
          </button>
        </>
      ) : (
        children
      )}
    </WebglHeroHeader>
  );
}

export function WebglHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useWebglHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "max-w-xs text-sm leading-relaxed text-[#b9c5d3] md:justify-self-end",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "An exploration of light, material, and movement. Move through the field and watch it respond.")
        : children}
    </p>
  );
}
