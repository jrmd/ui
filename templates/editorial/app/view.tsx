"use client";
import * as React from "react";
import { MarketingNavigation } from "@registry/blocks/marketing-navigation";
import { MarketingFooter } from "@registry/blocks/marketing-footer";
import { ApplicationShell } from "@registry/blocks/application-shell";
export type TemplateProps = {
  route?: string;
  basePath?: string;
  assetBase?: string;
};
function name(p: string) {
  return p
    .split("/")[0]
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
function Marketing({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  const items = nav.map((p) => ({ label: name(p), href: basePath + "/" + p }));
  return (
    <div className="template-design template-design-editorial template-marketing mx-auto max-w-7xl px-5 md:px-10">
      <MarketingNavigation brand={brand} home={basePath + "/"} items={items} />
      {children}
      <MarketingFooter brand={brand} items={items} />
    </div>
  );
}
function Workspace({
  brand,
  basePath,
  nav,
  children,
}: {
  brand: string;
  basePath: string;
  nav: string[];
  children: React.ReactNode;
}) {
  return (
    <ApplicationShell
      className="template-design template-design-editorial"
      brand={brand}
      items={[
        { label: "Overview", href: basePath + "/" },
        ...nav.map((p) => ({ label: name(p), href: basePath + "/" + p })),
      ]}
    >
      {children}
    </ApplicationShell>
  );
}
function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <header className="py-10 md:py-12">
      <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted-foreground">{text}</p>}
    </header>
  );
}
import { SearchInput } from "@registry/ui/search-input";
import { ScrollProgress } from "@registry/ui/scroll-progress";
const stories = [
  {
    slug: "a-slower-internet",
    title: "A slower internet",
    category: "Design",
    summary:
      "What happens when we stop asking for more and start asking for enough?",
    image: "editorial-slow.svg",
  },
  {
    slug: "the-shape-of-a-good-question",
    title: "The shape of a good question",
    category: "Culture",
    summary:
      "On curiosity, attention, and leaving room for an unexpected answer.",
    image: "editorial-question.svg",
  },
  {
    slug: "objects-that-stay",
    title: "Objects that stay",
    category: "Design",
    summary: "A considered approach to the things we choose to live with.",
    image: "studio-lamp.png",
  },
];
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState(
    route.startsWith("category/") ? "Design" : "All",
  );
  const link = (p: string) => basePath + "/" + p;
  const story =
    stories.find((s) => route === "article/" + s.slug) ?? stories[0];
  return (
    <Marketing
      brand="Still"
      basePath={basePath}
      nav={["category/design", "search", "author/rowan"]}
    >
      <main>
        {route.startsWith("article/") ? (
          <article className="mx-auto max-w-3xl py-12">
            <ScrollProgress />
            <p className="mb-5 text-xs uppercase tracking-widest">
              {story.category} · 6 minute read
            </p>
            <h1 className="font-display text-5xl leading-tight md:text-7xl">
              {story.title}.
            </h1>
            <p className="my-6 text-xl leading-relaxed">{story.summary}</p>
            <a href={link("author/rowan")} className="text-sm underline">
              By Rowan Ellis · Sample editorial
            </a>
            <img
              src={assetBase + "/" + story.image}
              alt={story.title + " cover artwork"}
              className="my-10 w-full rounded-xl"
            />
            {(story.slug === "a-slower-internet"
              ? [
                  "There is a particular kind of quiet that arrives when a tool asks less of you. No count to chase, no feed to finish. Just a page, an idea, and enough room to follow it.",
                  "The web began as a place for connections. Somewhere along the way, many of those connections became demands for attention. We can choose to make something different.",
                  "A slower interface does not have to be a slower tool. It can be a tool that gives you what you need without asking you to keep looking. Clear words, familiar controls, and an honest end to the page.",
                  "This is a design problem, but it is also a question of values. What do we want someone to feel when they leave? What would it mean to measure a good visit by the clarity it creates?",
                  "The useful things are often small. A readable line of text. A button that says what it does. A decision made once, remembered the next time. These choices accumulate into trust.",
                  "There is room for delight here, too. A movement that helps explain a change. A colour that makes a choice feel clear. A little personality in a place that otherwise might be anonymous.",
                  "None of this requires the internet to become dull. Quite the opposite. When everything is trying to be the loudest thing in the room, a considered voice becomes easier to hear.",
                  "Perhaps enough is not a limit. Perhaps it is a direction. A way to make space for the things that matter, and let the rest fall away.",
                ]
              : story.slug === "the-shape-of-a-good-question"
                ? [
                    "A good question leaves the door open. It makes room for something we could not have planned, and gives another person the space to change our mind.",
                    "In a design review, the most useful thing we can ask is often the simplest: what are we trying to help someone do? That question moves the conversation away from personal taste and toward the work itself.",
                    "Curiosity is a practice. It means noticing when an assumption has become invisible, and being willing to examine it again. The shape of the answer depends on how much room the question makes.",
                  ]
                : [
                    "Some objects earn their place slowly. A lamp that lights the right corner. A chair that feels better at the end of a long day. Their value grows through use, rather than fading after the first impression.",
                    "Designing something to stay means thinking beyond the moment of purchase. Can it be repaired? Does the material become more interesting with age? Will it still make sense in a different room?",
                    "The most considered objects leave space for our lives. They do a small number of things well, and become part of the background in the best possible way.",
                  ]
            ).map((p, i) => (
              <p key={i} className="mb-7 text-lg leading-[1.85]">
                {p}
              </p>
            ))}
            <section className="template-related" aria-label="Related stories">
              <h2>Stay a little longer.</h2>
              {stories
                .filter((item) => item.slug !== story.slug)
                .map((item) => (
                  <a key={item.slug} href={link("article/" + item.slug)}>
                    {item.title}
                    <span>{item.category}</span>
                  </a>
                ))}
            </section>
          </article>
        ) : (
          <>
            {route.startsWith("author/") ? (
              <PageTitle
                title="Rowan Ellis"
                text="A fictional writer exploring design, culture, and everyday attention."
              />
            ) : (
              <PageTitle
                title={
                  route === "search"
                    ? "Find a little perspective."
                    : route.startsWith("category/")
                      ? "Design, considered."
                      : "A little more attention."
                }
                text="Stories about design, culture, and the things we choose to notice."
              />
            )}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
              <div className="flex gap-5">
                {["All", "Design", "Culture"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={
                      category === c ? "underline" : "text-muted-foreground"
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
              <SearchInput
                value={query}
                onValueChange={setQuery}
                placeholder="Search stories…"
                className="max-w-xs"
              />
            </div>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              {stories
                .filter(
                  (s) =>
                    (category === "All" || s.category === category) &&
                    s.title.toLowerCase().includes(query.toLowerCase()),
                )
                .map((s, i) => (
                  <a
                    key={s.title}
                    href={link("article/" + s.slug)}
                    className={
                      i === 0
                        ? "group md:row-span-2"
                        : "group grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-5 border-t border-border pt-5"
                    }
                  >
                    <img
                      src={assetBase + "/" + s.image}
                      alt={s.title + " abstract cover artwork"}
                      className={
                        i === 0
                          ? "aspect-[16/9] w-full object-cover"
                          : "aspect-square w-full object-cover"
                      }
                    />
                    <div>
                      <p
                        className={
                          i === 0
                            ? "mt-5 text-xs uppercase tracking-widest text-muted-foreground"
                            : "text-xs uppercase tracking-widest text-muted-foreground"
                        }
                      >
                        {s.category}
                      </p>
                      <h2
                        className={
                          i === 0
                            ? "mt-3 font-display text-3xl leading-tight group-hover:underline sm:text-4xl"
                            : "mt-2 font-display text-xl leading-tight group-hover:underline"
                        }
                      >
                        {s.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {s.summary}
                      </p>
                      <p className="mt-4 text-xs text-muted-foreground">
                        Rowan Ellis · 6 min read
                      </p>
                    </div>
                  </a>
                ))}
            </div>
            {!stories.some(
              (s) =>
                (category === "All" || s.category === category) &&
                s.title.toLowerCase().includes(query.toLowerCase()),
            ) && (
              <p role="status" className="py-10">
                No stories found. Try a different search.
              </p>
            )}
          </>
        )}
      </main>
    </Marketing>
  );
}
