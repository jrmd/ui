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
export function TunnelHero({
  copy = {},
  title,
  actionLabel,
  artwork,
  className,
  href = "/blocks",
  children,
  ...rootProps
}: TunnelHeroProps) {
  return (
    <section
      {...rootProps}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#030405] text-[#dce6f7]",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <TunnelHeroContent>
            <HeroArt
              options={{
                ...artwork,
                label: copy.artworkLabel ?? artwork?.label,
                playLabel: copy.playLabel ?? artwork?.playLabel,
                pauseLabel: copy.pauseLabel ?? artwork?.pauseLabel,
              }}
              kind="tunnel"
              className="h-[590px]"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 md:p-10">
              <div className="flex justify-between text-xs tracking-widest">
                <span>{copy.brand ?? "AFTERHOURS"}</span>
                <span>{copy.meta ?? "SOUND / SPACE / POSSIBILITY"}</span>
              </div>
              <div className="text-center">
                <p className="mb-4 text-xs uppercase tracking-[.4em]">
                  {copy.eyebrow ?? "Leave the ordinary behind"}
                </p>
                <TunnelHeroTitle>{title ?? <>GO DEEPER.</>}</TunnelHeroTitle>
                <div className="pointer-events-auto mt-8">
                  <HeroLink
                    href={href}
                    className="bg-[#030405]/70 backdrop-blur-sm"
                  >
                    {actionLabel ?? <>Explore the programme</>}
                  </HeroLink>
                </div>
              </div>
              <span className="text-xs text-white/50">
                {copy.footerNote ?? "An independent music & culture platform"}
              </span>
            </div>
          </TunnelHeroContent>
        </>
      )}
    </section>
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
