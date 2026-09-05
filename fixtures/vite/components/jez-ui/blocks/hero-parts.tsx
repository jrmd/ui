"use client";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";
export type HeroProps = {
  className?: string;
  href?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  artwork?: { color?: string; speed?: number };
};
export function HeroLink({
  href = "/blocks",
  children = "Explore the collection",
  className,
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-current/30 px-5 py-3 text-sm transition-colors hover:bg-current/10",
        className,
      )}
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
