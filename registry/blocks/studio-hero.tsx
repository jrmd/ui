"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const StudioHeroCopy = {
  brand: "FIELDWORK / BRAND & DIGITAL",
  meta: "INDEPENDENT BY DESIGN",
  caption: "Featured project — Fieldwork",
};
export type StudioHeroOptions = Pick<
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
export type StudioHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof StudioHeroOptions
> &
  StudioHeroOptions;
function useStudioHeroModel({
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
}: StudioHeroProps) {
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
const StudioHeroCompositionContext = React.createContext<ReturnType<
  typeof useStudioHeroModel
> | null>(null);
function useStudioHeroComposition() {
  const context = React.useContext(StudioHeroCompositionContext);
  if (!context) throw new Error("StudioHero parts must be inside StudioHero.");
  return context;
}
export function StudioHero(props: StudioHeroProps) {
  const model = useStudioHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <StudioHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#22251f] text-[#ebe9dc]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <StudioHeroMasthead />
            <StudioHeroHeading />
            <StudioHeroShowcase />
          </>
        )}
      </section>
    </StudioHeroCompositionContext.Provider>
  );
}

export function StudioHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="studio-hero-content"
      className={cn(
        "flex justify-between p-7 text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}
export function StudioHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="studio-hero-title"
      className={cn(
        "px-7 pt-9 font-display text-5xl leading-none tracking-tight md:px-12 md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function StudioHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof StudioHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <StudioHeroContent {...props}>
      {children === undefined ? (
        <>
          <StudioHeroBrand />
          <StudioHeroMeta />
        </>
      ) : (
        children
      )}
    </StudioHeroContent>
  );
}
export function StudioHeroHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof StudioHeroTitle>> & {
  children?: React.ReactNode;
}) {
  const { title } = useStudioHeroComposition();
  return (
    <StudioHeroTitle {...props}>
      {children === undefined
        ? (title ?? (
            <>
              Rooted in strategy.
              <br />
              <span className="font-serif italic text-[#c8d3b6]">
                Made to feel something.
              </span>
            </>
          ))
        : children}
    </StudioHeroTitle>
  );
}
export function StudioHeroShowcase({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  return (
    <div
      {...props}
      className={cn(
        "grid gap-8 p-7 md:grid-cols-[1.5fr_1fr] md:p-12",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <StudioHeroMedia />
          <div className="flex flex-col items-start justify-end gap-7">
            <StudioHeroDescription />
            <StudioHeroAction />
            <StudioHeroCaption />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}

export function StudioHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useStudioHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.meta ?? "INDEPENDENT BY DESIGN")
        : children}
    </span>
  );
}
export function StudioHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useStudioHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.brand ?? "FIELDWORK / BRAND & DIGITAL")
        : children}
    </span>
  );
}
export function StudioHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useStudioHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Explore our practice")
        : children}
    </HeroLink>
  );
}
export function StudioHeroCaption({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useStudioHeroComposition();
  return (
    <span {...props} className={cn("text-xs text-white/40", props.className)}>
      {children === undefined
        ? (copy.caption ?? "Featured project — Fieldwork")
        : children}
    </span>
  );
}
export function StudioHeroMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { imageSrc, imageAlt } = useStudioHeroComposition();
  return children === undefined ? (
    <img
      src={imageSrc ?? "/assets/fieldwork.svg"}
      alt={imageAlt ?? "Fieldwork identity study"}
      {...props}
      className={cn(
        "aspect-[16/10] w-full rounded-sm object-cover",
        props.className,
      )}
    />
  ) : (
    children
  );
}
export function StudioHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useStudioHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "max-w-xs text-sm leading-relaxed text-white/65",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "We build identities and digital experiences for organisations moving the world in a better direction.")
        : children}
    </p>
  );
}
