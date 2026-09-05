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
export function ShapeHero({
  copy = {},
  title,
  actionLabel,
  description,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: ShapeHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#f1eddc] text-[#27392c]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <ShapeHeroContent>
            <div className="p-8 md:p-12">
              <span className="font-display text-xl font-semibold">
                {copy.brand ?? "Playroom."}
              </span>
              <ShapeHeroTitle>
                {title ?? (
                  <>
                    Serious about
                    <br />
                    <span className="font-serif italic font-normal">
                      playing.
                    </span>
                  </>
                )}
              </ShapeHeroTitle>
              <p className="my-7 max-w-xs text-sm leading-relaxed">
                {description ?? (
                  <>
                    The best ideas start with a little curiosity. Tools and
                    objects for your next happy accident.
                  </>
                )}
              </p>
              <HeroLink href={href}>
                {actionLabel ?? <>Make something</>}
              </HeroLink>
            </div>
            <div
              aria-hidden="true"
              className="grid min-h-80 grid-cols-2 gap-3 p-8 md:py-16"
            >
              <div className="aspect-square rounded-full bg-[#d76740]" />
              <div className="aspect-square rounded-t-full bg-[#bec99c]" />
              <div className="aspect-square rounded-br-full bg-[#e0b740]" />
              <div className="grid aspect-square place-items-center rounded-full border-[28px] border-[#344b3b]">
                <span className="size-8 rounded-full bg-[#d76740]" />
              </div>
            </div>
          </ShapeHeroContent>
        </>
      )}
    </section>
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
