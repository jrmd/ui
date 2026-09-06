"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const PortfolioHeroCopy = {
  brand: "ALEX RIVERS / DESIGN ENGINEER",
  meta: "Independent practice",
};
export type PortfolioHeroOptions = Pick<
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
export type PortfolioHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof PortfolioHeroOptions
> &
  PortfolioHeroOptions;
function usePortfolioHeroModel({
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
}: PortfolioHeroProps) {
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
const PortfolioHeroCompositionContext = React.createContext<ReturnType<
  typeof usePortfolioHeroModel
> | null>(null);
function usePortfolioHeroComposition() {
  const context = React.useContext(PortfolioHeroCompositionContext);
  if (!context)
    throw new Error("PortfolioHero parts must be inside PortfolioHero.");
  return context;
}
export function PortfolioHero(props: PortfolioHeroProps) {
  const model = usePortfolioHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <PortfolioHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#ecece7] text-[#262923]",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <PortfolioHeroMasthead />
            <PortfolioHeroLayout />
          </>
        )}
      </section>
    </PortfolioHeroCompositionContext.Provider>
  );
}

export function PortfolioHeroHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="portfolio-hero-header"
      className={cn("flex items-center justify-between p-7 text-xs", className)}
      {...props}
    />
  );
}
export function PortfolioHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="portfolio-hero-content"
      className={cn(
        "grid gap-10 px-7 py-12 md:grid-cols-[1.4fr_1fr] md:px-12",
        className,
      )}
      {...props}
    />
  );
}
export function PortfolioHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="portfolio-hero-title"
      className={cn(
        "font-display text-5xl leading-[1.05] tracking-tight md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}

export function PortfolioHeroMasthead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof PortfolioHeroHeader>> & {
  children?: React.ReactNode;
}) {
  return (
    <PortfolioHeroHeader {...props}>
      {children === undefined ? (
        <>
          <PortfolioHeroBrand />
          <PortfolioHeroMeta />
        </>
      ) : (
        children
      )}
    </PortfolioHeroHeader>
  );
}
export function PortfolioHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof PortfolioHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = usePortfolioHeroComposition();
  return (
    <PortfolioHeroContent {...props}>
      {children === undefined ? (
        <>
          <div>
            <PortfolioHeroTitle>
              {title ?? (
                <>
                  Thoughtful
                  <br />
                  by design.
                  <br />
                  <span className="text-[#7a8171]">
                    Useful by
                    <br />
                    default.
                  </span>
                </>
              )}
            </PortfolioHeroTitle>
            <div className="mt-8">
              <PortfolioHeroAction />
            </div>
          </div>
          <div className="flex flex-col justify-end gap-5">
            <PortfolioHeroMedia />
            <PortfolioHeroDescription />
          </div>
        </>
      ) : (
        children
      )}
    </PortfolioHeroContent>
  );
}

export function PortfolioHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = usePortfolioHeroComposition();
  return (
    <span {...props}>
      {children === undefined
        ? (copy.brand ?? "ALEX RIVERS / DESIGN ENGINEER")
        : children}
    </span>
  );
}
export function PortfolioHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = usePortfolioHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "Selected projects") : children}
    </HeroLink>
  );
}
export function PortfolioHeroMeta({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = usePortfolioHeroComposition();
  return (
    <span {...props} className={cn("flex items-center gap-2", props.className)}>
      {children === undefined ? (
        <>
          <span className="size-1.5 rounded-full bg-[#557746]" />
          {copy.meta ?? "Independent practice"}
        </>
      ) : (
        children
      )}
    </span>
  );
}
export function PortfolioHeroMedia({
  children,
  ...props
}: Partial<React.ComponentProps<"img">> & { children?: React.ReactNode }) {
  const { imageSrc, imageAlt } = usePortfolioHeroComposition();
  return children === undefined ? (
    <img
      src={imageSrc ?? "/assets/common.svg"}
      alt={imageAlt ?? "Common identity and digital design project"}
      {...props}
      className={cn(
        "aspect-square w-full -rotate-3 object-cover shadow-lg",
        props.className,
      )}
    />
  ) : (
    children
  );
}
export function PortfolioHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = usePortfolioHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "mt-3 max-w-xs text-sm leading-relaxed text-[#676d60]",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "I bring design and engineering together to make the web feel a little more human.")
        : children}
    </p>
  );
}
