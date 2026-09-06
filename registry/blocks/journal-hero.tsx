"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const JournalHeroCopy = {
  brand: "Still.",
  tagline: "A journal for paying attention",
  eyebrow: "From the editor / Issue 04",
  caption: "A slower internet. A wider view.",
};
export type JournalHeroOptions = Pick<
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
export type JournalHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof JournalHeroOptions
> &
  JournalHeroOptions;
function useJournalHeroModel({
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
}: JournalHeroProps) {
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
const JournalHeroCompositionContext = React.createContext<ReturnType<
  typeof useJournalHeroModel
> | null>(null);
function useJournalHeroComposition() {
  const context = React.useContext(JournalHeroCompositionContext);
  if (!context)
    throw new Error("JournalHero parts must be inside JournalHero.");
  return context;
}
export function JournalHero(props: JournalHeroProps) {
  const model = useJournalHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <JournalHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#f6f0e7] text-[#43372d]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <JournalHeroMasthead />
            <JournalHeroLayout />
          </>
        )}
      </section>
    </JournalHeroCompositionContext.Provider>
  );
}

export function JournalHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="journal-hero-header"
      className={cn(
        "flex items-end justify-between border-b border-[#43372d]/25 p-7",
        className,
      )}
      {...props}
    />
  );
}
export function JournalHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="journal-hero-content"
      className={cn(
        "grid gap-8 p-7 md:grid-cols-[1fr_1.2fr] md:p-10",
        className,
      )}
      {...props}
    />
  );
}
export function JournalHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="journal-hero-title"
      className={cn(
        "font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}

export function JournalHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof JournalHeroHeader>> & {
  children?: React.ReactNode;
}) {
  const { copy } = useJournalHeroComposition();
  return (
    <JournalHeroHeader {...props}>
      {children === undefined ? (
        <>
          <JournalHeroBrand />
          <span className="text-xs">
            {copy.tagline ?? "A journal for paying attention"}
          </span>
        </>
      ) : (
        children
      )}
    </JournalHeroHeader>
  );
}
export function JournalHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof JournalHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { copy } = useJournalHeroComposition();
  return (
    <JournalHeroContent {...props}>
      {children === undefined ? (
        <>
          <JournalHeroCopyContent />
          <figure>
            <JournalHeroMedia />
            <figcaption className="mt-3 text-xs text-[#43372d]/65">
              {copy.caption ?? "A slower internet. A wider view."}
            </figcaption>
          </figure>
        </>
      ) : (
        children
      )}
    </JournalHeroContent>
  );
}

export function JournalHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useJournalHeroComposition();
  return (
    <span {...props} className={cn("font-serif text-4xl", props.className)}>
      {children === undefined ? (copy.brand ?? "Still.") : children}
    </span>
  );
}
export function JournalHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useJournalHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined
        ? (actionLabel ?? "Read the latest issue")
        : children}
    </HeroLink>
  );
}
export function JournalHeroEyebrow({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { copy } = useJournalHeroComposition();
  return (
    <p
      {...props}
      className={cn("text-xs uppercase tracking-widest", props.className)}
    >
      {children === undefined
        ? (copy.eyebrow ?? "From the editor / Issue 04")
        : children}
    </p>
  );
}
export function JournalHeroMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { imageSrc, imageAlt } = useJournalHeroComposition();
  return children === undefined ? (
    <img
      src={imageSrc ?? "/assets/editorial-slow.svg"}
      alt={imageAlt ?? "Abstract editorial study in warm geometric forms"}
      {...props}
      className={cn("aspect-[4/5] w-full object-cover", props.className)}
    />
  ) : (
    children
  );
}
export function JournalHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useJournalHeroComposition();
  return (
    <p
      {...props}
      className={cn("max-w-xs text-sm leading-relaxed", props.className)}
    >
      {children === undefined
        ? (description ??
          "On small observations, everyday objects, and the things we miss when we move too quickly.")
        : children}
    </p>
  );
}
export function JournalHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useJournalHeroComposition();
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-start justify-between gap-8",
        props.className,
      )}
    >
      {children === undefined ? (
        <>
          <JournalHeroEyebrow />
          <JournalHeroTitle>
            {title ?? (
              <>
                The art of
                <br />
                <em>noticing.</em>
              </>
            )}
          </JournalHeroTitle>
          <JournalHeroDescription />
          <JournalHeroAction />
        </>
      ) : (
        children
      )}
    </div>
  );
}
