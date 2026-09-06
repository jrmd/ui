"use client";
import * as React from "react";
import { Slot } from "radix-ui";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
export type HeroCopy = Partial<
  Record<
    | "brand"
    | "meta"
    | "eyebrow"
    | "tagline"
    | "taglineEnd"
    | "caption"
    | "footerNote"
    | "animationName"
    | "playLabel"
    | "pauseLabel"
    | "artworkLabel",
    string
  >
>;
export type HeroProps = {
  copy?: HeroCopy;
  preview?: React.ReactNode;
  artworkText?: string;
  className?: string;
  href?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: React.ReactNode;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
  artwork?: {
    color?: string;
    speed?: number;
    label?: string;
    playLabel?: string;
    pauseLabel?: string;
  };
};
export function HeroLink({
  href = "/blocks",
  asChild,
  children = "Explore the collection",
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      {...props}
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-current/30 px-5 py-3 text-sm transition-colors hover:bg-current/10",
        className,
      )}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          <ArrowUpRight size={16} />
        </>
      )}
    </Comp>
  );
}
