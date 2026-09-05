"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type JournalStory = {
  title: string;
  category: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};
const stories: JournalStory[] = [
  {
    title: "The beauty of leaving room.",
    category: "Ideas · 6 min read",
    href: "/templates/editorial",
    imageSrc: "/assets/editorial-slow.svg",
    imageAlt: "Abstract editorial composition",
  },
  {
    title: "Ask a better question.",
    category: "Practice · 4 min read",
    href: "/templates/editorial",
    imageSrc: "/assets/editorial-question.svg",
    imageAlt: "Question mark editorial artwork",
  },
  {
    title: "Made for everyday life.",
    category: "Objects · 8 min read",
    href: "/templates/editorial",
    imageSrc: "/assets/common.svg",
    imageAlt: "Common project artwork",
  },
];
export function JournalBento({
  className,
  title = "The journal",
  items = stories,
}: {
  className?: string;
  title?: string;
  items?: JournalStory[];
}) {
  return (
    <section className={cn("py-6", className)}>
      <h2 className="mb-8 text-4xl tracking-tight">{title}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((s, i) => (
          <article
            key={s.title}
            className={cn(
              "group overflow-hidden rounded-xl bg-muted",
              i === 0 && "md:row-span-2",
            )}
          >
            <a
              href={s.href}
              className={cn("block h-full", i > 0 && "sm:grid sm:grid-cols-2")}
            >
              <img
                src={s.imageSrc}
                alt={s.imageAlt}
                className={cn(
                  "w-full object-cover",
                  i === 0 ? "h-72 md:h-96" : "h-48 sm:h-full sm:min-h-48",
                )}
              />
              <div className="p-6">
                <p className="text-xs text-muted-foreground">{s.category}</p>
                <h3
                  className={cn(
                    "mt-3 leading-tight tracking-tight group-hover:underline",
                    i === 0 ? "text-3xl" : "text-2xl",
                  )}
                >
                  {s.title}
                </h3>
                <span className="mt-6 inline-block text-sm">Read story</span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
