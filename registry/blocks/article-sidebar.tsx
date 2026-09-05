"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export function ArticleSidebar({
  className,
  title = "Make space for the work.",
  children,
  aside,
  imageSrc = "/assets/editorial-question.svg",
  imageAlt = "An editorial study of questions",
}: {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <article className={cn("py-8", className)}>
      <h2 className="max-w-2xl text-4xl leading-tight tracking-tight md:text-6xl">
        {title}
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 space-y-6 text-base leading-relaxed">
          {children ?? (
            <>
              <p>
                Every project begins with a question. The useful ones rarely
                arrive fully formed. They emerge when we leave enough room to
                notice what is already there.
              </p>
              <figure>
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="aspect-[3/2] w-full rounded-xl object-cover"
                />
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  From the studio notebook. Illustrative editorial content.
                </figcaption>
              </figure>
              <h3 className="text-2xl">Start with what you notice</h3>
              <p>
                A small detail can change the direction of an entire piece of
                work. Collect observations before solutions. Give the unfamiliar
                idea another day.
              </p>
            </>
          )}
        </div>
        <aside className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          {aside ?? (
            <>
              <h3 className="text-lg">In the margins</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A collection of notes on attention, creative practice, and
                making things with care.
              </p>
              <a
                href="/templates/editorial"
                className="mt-6 inline-block text-sm underline underline-offset-4"
              >
                Explore the journal
              </a>
            </>
          )}
        </aside>
      </div>
    </article>
  );
}
