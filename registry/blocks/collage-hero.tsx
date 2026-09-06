"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const CollageHeroCopy = {
  brand: "In good company",
  meta: "OBJECTS / STORIES / PEOPLE",
  eyebrow: "Room for the everyday",
  footerNote: "A collection of things worth keeping close.",
};
export type CollageHeroOptions = Pick<
  HeroProps,
  | "secondaryImageSrc"
  | "secondaryImageAlt"
  | "copy"
  | "title"
  | "actionLabel"
  | "imageSrc"
  | "imageAlt"
  | "className"
  | "href"
>;
export type CollageHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof CollageHeroOptions
> &
  CollageHeroOptions;
function useCollageHeroModel({
  secondaryImageSrc,
  secondaryImageAlt,
  copy = {},
  title,
  actionLabel,
  imageSrc,
  imageAlt,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: CollageHeroProps) {
  return {
    secondaryImageSrc,
    secondaryImageAlt,
    copy,
    title,
    actionLabel,
    imageSrc,
    imageAlt,
    className,
    href,
    children,
    rootProps,
  };
}
const CollageHeroCompositionContext = React.createContext<ReturnType<
  typeof useCollageHeroModel
> | null>(null);
function useCollageHeroComposition() {
  const context = React.useContext(CollageHeroCompositionContext);
  if (!context)
    throw new Error("CollageHero parts must be inside CollageHero.");
  return context;
}
export function CollageHero(props: CollageHeroProps) {
  const model = useCollageHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <CollageHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#e8d4c3] text-[#412f25]",
          className,
        )}
      >
        {children !== undefined ? children : <CollageHeroLayout />}
      </section>
    </CollageHeroCompositionContext.Provider>
  );
}

export function CollageHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collage-hero-content"
      className={cn("p-7 md:p-10", className)}
      {...props}
    />
  );
}
export function CollageHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="collage-hero-title"
      className={cn(
        "font-serif text-6xl leading-none tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function CollageHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof CollageHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <CollageHeroContent {...props}>
      {children === undefined ? (
        <>
          <div className="flex items-center justify-between">
            <CollageHeroBrand />
            <CollageHeroMeta />
          </div>
          <CollageHeroGallery>
            <CollageHeroMedia />
            <CollageHeroCopyContent />
            <CollageHeroSecondaryMedia />
          </CollageHeroGallery>
          <CollageHeroFootnote />
        </>
      ) : (
        children
      )}
    </CollageHeroContent>
  );
}

export function CollageHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useCollageHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "Come on in") : children}
    </HeroLink>
  );
}
export function CollageHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useCollageHeroComposition();
  return (
    <span {...props} className={cn("text-xs", props.className)}>
      {children === undefined
        ? (copy.meta ?? "OBJECTS / STORIES / PEOPLE")
        : children}
    </span>
  );
}
export function CollageHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useCollageHeroComposition();
  return (
    <span
      {...props}
      className={cn("font-serif text-2xl italic", props.className)}
    >
      {children === undefined ? (copy.brand ?? "In good company") : children}
    </span>
  );
}
export function CollageHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useCollageHeroComposition();
  return (
    <p
      {...props}
      className={cn("mb-5 text-xs uppercase tracking-widest", props.className)}
    >
      {children === undefined
        ? (copy.eyebrow ?? "Room for the everyday")
        : children}
    </p>
  );
}
export function CollageHeroFootnote({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useCollageHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "border-t border-[#412f25]/20 pt-6 text-center text-xs",
        props.className,
      )}
    >
      {children === undefined
        ? (copy.footerNote ?? "A collection of things worth keeping close.")
        : children}
    </p>
  );
}
export function CollageHeroMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { imageSrc, imageAlt } = useCollageHeroComposition();
  return children === undefined ? (
    <img
      src={imageSrc ?? "/assets/studio-lamp-cover.svg"}
      alt={imageAlt ?? "A considered object for the home"}
      {...props}
      className={cn(
        "mx-auto hidden aspect-[3/4] w-full -rotate-6 object-cover md:block",
        props.className,
      )}
    />
  ) : (
    children
  );
}
export function CollageHeroSecondaryMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { secondaryImageSrc, secondaryImageAlt } = useCollageHeroComposition();
  return children === undefined ? (
    <img
      src={secondaryImageSrc ?? "/assets/editorial-question.svg"}
      alt={secondaryImageAlt ?? "A colourful study of shapes and balance"}
      {...props}
      className={cn(
        "mx-auto aspect-[4/3] w-3/4 rotate-6 object-cover md:aspect-[3/4] md:w-full",
        props.className,
      )}
    />
  ) : (
    children
  );
}
export function CollageHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useCollageHeroComposition();
  return (
    <div
      {...props}
      className={cn("relative z-10 text-center", props.className)}
    >
      {children === undefined ? (
        <>
          <CollageHeroEyebrow />
          <CollageHeroTitle>
            {title ?? (
              <>
                Life, with
                <br />
                <em>
                  a little
                  <br />
                  character.
                </em>
              </>
            )}
          </CollageHeroTitle>
          <div className="mt-7">
            <CollageHeroAction />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}

export function CollageHeroGallery({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collage-hero-gallery"
      className={cn(
        "grid items-center gap-6 py-12 md:grid-cols-[.7fr_1.2fr_.7fr]",
        className,
      )}
      {...props}
    />
  );
}
