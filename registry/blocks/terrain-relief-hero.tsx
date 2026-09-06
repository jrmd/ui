"use client";
import * as React from "react";
import { ArrowUpRight, Pause, Play, Mountain } from "lucide-react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { WebGLStage } from "../ui/webgl-stage";
export const TerrainReliefHeroCopy = {
  brand: "FIELD / 01",
  meta: "A study in elevation",
  playLabel: "Play",
  pauseLabel: "Pause",
  animationName: "terrain",
};
export type TerrainReliefHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof Pick<
    HeroProps,
    | "title"
    | "description"
    | "actionLabel"
    | "copy"
    | "artwork"
    | "className"
    | "href"
  >
> &
  Pick<
    HeroProps,
    | "title"
    | "description"
    | "actionLabel"
    | "copy"
    | "artwork"
    | "className"
    | "href"
  >;
function useTerrainReliefHeroModel({
  title,
  description,
  actionLabel,
  copy = {},
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: TerrainReliefHeroProps) {
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
const TerrainReliefHeroCompositionContext = React.createContext<ReturnType<
  typeof useTerrainReliefHeroModel
> | null>(null);
function useTerrainReliefHeroComposition() {
  const context = React.useContext(TerrainReliefHeroCompositionContext);
  if (!context)
    throw new Error(
      "TerrainReliefHero parts must be inside TerrainReliefHero.",
    );
  return context;
}
export function TerrainReliefHero(props: TerrainReliefHeroProps) {
  const model = useTerrainReliefHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <TerrainReliefHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "@container relative isolate overflow-hidden rounded-xl bg-[#14221e] text-[#f0f1e6]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <TerrainReliefHeroMasthead />
            <TerrainReliefHeroIntro />
            <TerrainReliefHeroArtwork />
            <TerrainReliefHeroControls />
          </>
        )}
      </section>
    </TerrainReliefHeroCompositionContext.Provider>
  );
}

export function TerrainReliefHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terrain-relief-hero-header"
      className={cn(
        "relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 pt-6 text-xs @min-[640px]:px-10",
        className,
      )}
      {...props}
    />
  );
}
export function TerrainReliefHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terrain-relief-hero-content"
      className={cn(
        "relative z-10 grid gap-6 px-6 pt-10 @min-[640px]:grid-cols-[1.65fr_1fr] @min-[640px]:items-end @min-[640px]:px-10 @min-[640px]:pt-14",
        className,
      )}
      {...props}
    />
  );
}
export function TerrainReliefHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="terrain-relief-hero-title"
      className={cn(
        "font-display text-[clamp(2.5rem,6.5cqi,5rem)] leading-[1.02] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function TerrainReliefHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TerrainReliefHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <TerrainReliefHeroHeader {...props}>
      {children === undefined ? (
        <>
          <TerrainReliefHeroBrand />
          <TerrainReliefHeroMeta />
        </>
      ) : (
        children
      )}
    </TerrainReliefHeroHeader>
  );
}
export function TerrainReliefHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof TerrainReliefHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = useTerrainReliefHeroComposition();
  return (
    <TerrainReliefHeroContent {...props}>
      {children === undefined ? (
        <>
          <TerrainReliefHeroTitle>
            {title ?? (
              <>
                Find your
                <br />
                <span className="text-[#c8dd9f]">higher ground.</span>
              </>
            )}
          </TerrainReliefHeroTitle>
          <TerrainReliefHeroDescription />
        </>
      ) : (
        children
      )}
    </TerrainReliefHeroContent>
  );
}
export function TerrainReliefHeroArtwork({
  children,
  ...props
}: Partial<React.ComponentProps<typeof WebGLStage>> & {
  children?: React.ReactNode;
}) {
  const { copy, artwork, paused } = useTerrainReliefHeroComposition();
  return children === undefined ? (
    <WebGLStage
      kind="terrain-relief"
      color={artwork?.color ?? "#91b47b"}
      speed={artwork?.speed ?? 0.4}
      paused={paused}
      label={
        copy.artworkLabel ??
        "An expansive three-dimensional landscape with illuminated contour lines"
      }
      {...props}
      className={cn(
        "-mt-8 h-[300px] rounded-none [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_88%,transparent)] @min-[640px]:h-[360px]",
        props.className,
      )}
    />
  ) : (
    children
  );
}
export function TerrainReliefHeroControls({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { actionLabel, copy, href, paused, setPaused } =
    useTerrainReliefHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "relative z-10 mx-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 py-5 @min-[640px]:mx-10",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <a
            href={href}
            className="flex min-h-11 items-center gap-3 text-sm font-medium hover:text-[#c8dd9f]"
          >
            {actionLabel ?? "Explore the collection"}
            <ArrowUpRight size={17} />
          </a>
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
            className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-xs text-[#bdcdbf] hover:bg-white/10"
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
            {paused ? (copy.playLabel ?? "Play") : (copy.pauseLabel ?? "Pause")}{" "}
            {copy.animationName ?? "terrain"}
          </button>
        </>
      ) : (
        children
      )}
    </div>
  );
}

export function TerrainReliefHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTerrainReliefHeroComposition();
  return (
    <span {...props} className={cn("text-[#b7c7b8]", props.className)}>
      {children === undefined
        ? (copy.meta ?? "A study in elevation")
        : children}
    </span>
  );
}
export function TerrainReliefHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useTerrainReliefHeroComposition();
  return (
    <span
      {...props}
      className={cn(
        "flex items-center gap-2 font-medium tracking-widest",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <Mountain size={19} />
          {copy.brand ?? "FIELD / 01"}
        </>
      ) : (
        children
      )}
    </span>
  );
}
export function TerrainReliefHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useTerrainReliefHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "max-w-xs text-sm leading-relaxed text-[#bdcdbf] @min-[640px]:justify-self-end",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "New perspectives are rarely found on familiar paths. Follow the contours. See where they take you.")
        : children}
    </p>
  );
}
