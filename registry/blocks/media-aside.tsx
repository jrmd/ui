"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type MediaAsideOptions = {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  actionLabel?: string;
  reverse?: boolean;
};
export type MediaAsideProps = Omit<
  React.ComponentProps<"article">,
  keyof MediaAsideOptions
> &
  MediaAsideOptions;
export function MediaAside({
  className,
  title = "A slower way to make something lasting.",
  description = "Inside a practice shaped by careful observation, material experiments, and the freedom to start again.",
  imageSrc = "/assets/editorial-slow.svg",
  imageAlt = "Editorial artwork about slowing down",
  href = "/templates/editorial",
  actionLabel = "Read the story",
  reverse = false,
  children,
  ...rootProps
}: MediaAsideProps) {
  return (
    <article
      {...rootProps}
      className={cn(
        "grid overflow-hidden rounded-xl bg-muted md:grid-cols-2",
        className,
      )}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <MediaAsideMedia
            src={imageSrc}
            alt={imageAlt}
            className={cn("", reverse && "md:order-2")}
          />
          <MediaAsideContent>
            <MediaAsideTitle>{title}</MediaAsideTitle>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <a
              href={href}
              className="mt-9 w-fit border-b border-current pb-1 text-sm hover:text-primary"
            >
              {actionLabel}
            </a>
          </MediaAsideContent>
        </>
      )}
    </article>
  );
}

export function MediaAsideContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="media-aside-content"
      className={cn("flex flex-col justify-center p-7 md:p-12", className)}
      {...props}
    />
  );
}
export function MediaAsideTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="media-aside-title"
      className={cn("text-4xl leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

export function MediaAsideMedia({
  className,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      className={cn("h-full min-h-64 w-full object-cover", className)}
      {...props}
    />
  );
}
