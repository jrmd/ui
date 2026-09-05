"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function MediaAside({
  className,
  title = "A slower way to make something lasting.",
  description = "Inside a practice shaped by careful observation, material experiments, and the freedom to start again.",
  imageSrc = "/assets/editorial-slow.svg",
  imageAlt = "Editorial artwork about slowing down",
  href = "/templates/editorial",
  actionLabel = "Read the story",
  reverse = false,
}: {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  actionLabel?: string;
  reverse?: boolean;
}) {
  return (
    <article
      className={cn(
        "grid overflow-hidden rounded-xl bg-muted md:grid-cols-2",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          "h-full min-h-64 w-full object-cover",
          reverse && "md:order-2",
        )}
      />
      <div className="flex flex-col justify-center p-7 md:p-12">
        <h2 className="text-4xl leading-tight tracking-tight">{title}</h2>
        <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <a
          href={href}
          className="mt-9 w-fit border-b border-current pb-1 text-sm hover:text-primary"
        >
          {actionLabel}
        </a>
      </div>
    </article>
  );
}
