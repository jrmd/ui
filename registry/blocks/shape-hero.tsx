"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import { HeroLink, type HeroProps } from "./hero-parts";
export const ShapeHeroCopy = {
  brand: "Playroom.",
};
export type ShapeHeroOptions = Pick<
  HeroProps,
  "copy" | "title" | "actionLabel" | "description" | "className" | "href"
>;
export type ShapeHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof ShapeHeroOptions
> &
  ShapeHeroOptions;
function useShapeHeroModel({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: ShapeHeroProps) {
  return {
    copy,
    title,
    actionLabel,
    description,
    className,
    href,
    children,
    rootProps,
  };
}
const ShapeHeroCompositionContext = React.createContext<ReturnType<
  typeof useShapeHeroModel
> | null>(null);
function useShapeHeroComposition() {
  const context = React.useContext(ShapeHeroCompositionContext);
  if (!context) throw new Error("ShapeHero parts must be inside ShapeHero.");
  return context;
}
export function ShapeHero(props: ShapeHeroProps) {
  const model = useShapeHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <ShapeHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "relative isolate overflow-hidden rounded-xl bg-[#f1eddc] text-[#27392c]",
          className,
        )}
      >
        {children !== undefined ? children : <ShapeHeroLayout />}
      </section>
    </ShapeHeroCompositionContext.Provider>
  );
}

export function ShapeHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="shape-hero-content"
      className={cn("grid md:grid-cols-2", className)}
      {...props}
    />
  );
}
export function ShapeHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="shape-hero-title"
      className={cn(
        "mt-16 font-display text-5xl leading-none tracking-tight md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}

export function ShapeHeroLayout({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ShapeHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <ShapeHeroContent {...props}>
      {children === undefined ? (
        <>
          <ShapeHeroCopyContent />
          <ShapeHeroArtwork />
        </>
      ) : (
        children
      )}
    </ShapeHeroContent>
  );
}

export function ShapeHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof HeroLink>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useShapeHeroComposition();
  return (
    <HeroLink href={href} {...props}>
      {children === undefined ? (actionLabel ?? "Make something") : children}
    </HeroLink>
  );
}
export function ShapeHeroBrand({
  children,
  ...props
}: Partial<React.ComponentProps<"span">> & { children?: React.ReactNode }) {
  const { copy } = useShapeHeroComposition();
  return (
    <span
      {...props}
      className={cn("font-display text-xl font-semibold", props.className)}
    >
      {children === undefined ? (copy.brand ?? "Playroom.") : children}
    </span>
  );
}
export function ShapeHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useShapeHeroComposition();
  return (
    <p
      {...props}
      className={cn("my-7 max-w-xs text-sm leading-relaxed", props.className)}
    >
      {children === undefined
        ? (description ??
          "The best ideas start with a little curiosity. Tools and objects for your next happy accident.")
        : children}
    </p>
  );
}
export function ShapeHeroCopyContent({
  children,
  ...props
}: Partial<React.ComponentProps<"div">> & { children?: React.ReactNode }) {
  const { title } = useShapeHeroComposition();
  return (
    <div {...props} className={cn("p-8 md:p-12", props.className)}>
      {children === undefined ? (
        <>
          <ShapeHeroBrand />
          <ShapeHeroTitle>
            {title ?? (
              <>
                Serious about
                <br />
                <span className="font-serif italic font-normal">playing.</span>
              </>
            )}
          </ShapeHeroTitle>
          <ShapeHeroDescription />
          <ShapeHeroAction />
        </>
      ) : (
        children
      )}
    </div>
  );
}

export function ShapeHeroArtwork({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cn("grid min-h-80 grid-cols-2 gap-3 p-8 md:py-16", className)}
    >
      {children === undefined ? (
        <>
          <div className="aspect-square rounded-full bg-[#d76740]" />
          <div className="aspect-square rounded-t-full bg-[#bec99c]" />
          <div className="aspect-square rounded-br-full bg-[#e0b740]" />
          <div className="grid aspect-square place-items-center rounded-full border-[28px] border-[#344b3b]">
            <span className="size-8 rounded-full bg-[#d76740]" />
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
