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
export type JournalBentoOptions = {
  className?: string;
  title?: string;
  items?: JournalStory[];
};
export type JournalBentoProps = Omit<
  React.ComponentProps<"section">,
  keyof JournalBentoOptions
> &
  JournalBentoOptions;
function useJournalBentoModel({
  className,
  title = "The journal",
  items = stories,
  children,
  ...rootProps
}: JournalBentoProps) {
  return { className, title, items, children, rootProps };
}
const JournalBentoCompositionContext = React.createContext<ReturnType<
  typeof useJournalBentoModel
> | null>(null);
function useJournalBentoComposition() {
  const context = React.useContext(JournalBentoCompositionContext);
  if (!context)
    throw new Error("JournalBento parts must be inside JournalBento.");
  return context;
}
export function JournalBento(props: JournalBentoProps) {
  const model = useJournalBentoModel(props);
  const { className, rootProps, children } = model;
  return (
    <JournalBentoCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("py-6", className)}>
        {children !== undefined ? (
          children
        ) : (
          <>
            <JournalBentoHeading />
            <JournalBentoStories />
          </>
        )}
      </section>
    </JournalBentoCompositionContext.Provider>
  );
}

export function JournalBentoTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="journal-bento-title"
      className={cn("mb-8 text-4xl tracking-tight", className)}
      {...props}
    />
  );
}
export function JournalBentoContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="journal-bento-content"
      className={cn("grid gap-5 md:grid-cols-2", className)}
      {...props}
    />
  );
}

export function JournalBentoItem({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="journal-bento-item"
      className={cn("group overflow-hidden rounded-xl bg-muted", className)}
      {...props}
    />
  );
}

export function JournalBentoHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof JournalBentoTitle>> & {
  children?: React.ReactNode;
}) {
  const { title } = useJournalBentoComposition();
  return (
    <JournalBentoTitle {...props}>
      {children === undefined ? title : children}
    </JournalBentoTitle>
  );
}
export function JournalBentoStories({
  children,
  ...props
}: Partial<React.ComponentProps<typeof JournalBentoContent>> & {
  children?: React.ReactNode;
}) {
  const { items } = useJournalBentoComposition();
  return (
    <JournalBentoContent {...props}>
      {children === undefined
        ? items.map((s, i) => (
            <JournalBentoItem
              key={s.title}
              className={cn(i === 0 && "md:row-span-2")}
            >
              <a
                href={s.href}
                className={cn(
                  "block h-full",
                  i > 0 && "sm:grid sm:grid-cols-2",
                )}
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
                  <JournalBentoCategory>{s.category}</JournalBentoCategory>
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
            </JournalBentoItem>
          ))
        : children}
    </JournalBentoContent>
  );
}

export function JournalBentoCategory({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="journal-bento-category"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
