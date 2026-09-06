"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const MediaHeroCopy = {
  brand: "Objects for living.",
  eyebrow: "THE EVERYDAY COLLECTION",
  caption: "Studio lamp / Sand / No. 004",
};
export type MediaHeroOptions = Pick<
  HeroProps,
  | "copy"
  | "title"
  | "actionLabel"
  | "description"
  | "imageSrc"
  | "imageAlt"
  | "className"
  | "href"
>;
export type MediaHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof MediaHeroOptions
> &
  MediaHeroOptions;
function useMediaHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  imageSrc,
  imageAlt,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: MediaHeroProps) {
  return {
    copy,
    title,
    actionLabel,
    description,
    imageSrc,
    imageAlt,
    className,
    href,
    children,
    rootProps,
  };
}
const MediaHeroCompositionContext = React.createContext<ReturnType<
  typeof useMediaHeroModel
> | null>(null);
function useMediaHeroComposition() {
  const context = React.useContext(MediaHeroCompositionContext);
  if (!context) throw new Error("MediaHero parts must be inside MediaHero.");
  return context;
}
export function MediaHero(props: MediaHeroProps) {
  const model = useMediaHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <MediaHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#e8e2d6] text-[#302f29]",
          className,
        )}
      >
        {children !== undefined ? children : <MediaHeroLayout />}
      </section>
    </MediaHeroCompositionContext.Provider>
  );
}

export function MediaHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="media-hero-content"
      className={cn("grid md:grid-cols-[1fr_1.1fr]", className)}
      {...props}
    />
  );
}
export function MediaHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="media-hero-title"
      className={cn(
        "font-serif text-6xl leading-none tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function MediaHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof MediaHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <MediaHeroContent {...props}>
      {children === undefined ? (
        <>
          <MediaHeroCopyContent />
          <MediaHeroMedia />
        </>
      ) : (
        children
      )}
    </MediaHeroContent>
  );
}

export function MediaHeroCaption({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useMediaHeroComposition();
  return (
    <span {...props} className={cn("text-xs", props.className)}>
      {children === undefined
        ? (copy.caption ?? "Studio lamp / Sand / No. 004")
        : children}
    </span>
  );
}
export function MediaHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useMediaHeroComposition();
  return (
    <span {...props} className={cn("font-serif text-2xl", props.className)}>
      {children === undefined
        ? (copy.brand ?? "Objects for living.")
        : children}
    </span>
  );
}
export function MediaHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useMediaHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Discover the collection")
        : children}
    </HeroLink>
  );
}
export function MediaHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useMediaHeroComposition();
  return (
    <p
      {...props}
      className={cn("mb-5 text-xs tracking-widest", props.className)}
    >
      {children === undefined
        ? (copy.eyebrow ?? "THE EVERYDAY COLLECTION")
        : children}
    </p>
  );
}
export function MediaHeroMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { imageSrc, imageAlt } = useMediaHeroComposition();
  return children === undefined ? (
    <img
      src={imageSrc ?? "/assets/studio-lamp-cover.svg"}
      alt={imageAlt ?? "Sculptural studio lamp in a warm interior"}
      {...props}
      className={cn("h-96 w-full object-cover md:h-[620px]", props.className)}
    />
  ) : (
    children
  );
}
export function MediaHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useMediaHeroComposition();
  return (
    <p
      {...props}
      className={cn("my-7 max-w-xs text-sm leading-relaxed", props.className)}
    >
      {children === undefined
        ? (description ??
          "Useful things, thoughtfully made. Meet the pieces that make a space feel like yours.")
        : children}
    </p>
  );
}
export function MediaHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useMediaHeroComposition();
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
          <MediaHeroBrand />
          <div>
            <MediaHeroEyebrow />
            <MediaHeroTitle>
              {title ?? (
                <>
                  A little
                  <br />
                  more light.
                </>
              )}
            </MediaHeroTitle>
            <MediaHeroDescription />
            <MediaHeroAction />
          </div>
          <MediaHeroCaption />
        </>
      ) : (
        children
      )}
    </div>
  );
}
