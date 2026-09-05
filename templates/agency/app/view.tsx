"use client";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";
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
    <div className="template-design template-design-agency template-marketing mx-auto max-w-7xl px-5 md:px-10">
      <MarketingNavigation brand={brand} home={basePath + "/"} items={items} />
      {children}
      <section className="template-closing" aria-label="Start a conversation">
        <h2>Have something in mind?</h2>
        <a href={basePath + "/contact"}>
          Tell us about it <ArrowUpRight aria-hidden="true" />
        </a>
      </section>
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
      className="template-design template-design-agency"
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
import { ContactForm } from "@registry/blocks/contact-form";
import { Button } from "@registry/ui/button";
const work = [
  {
    slug: "fieldwork",
    title: "Fieldwork",
    type: "Identity",
    image: "fieldwork.svg",
    description:
      "A visual identity for a landscape practice, built from the relationship between a plot and the places around it.",
    detail:
      "A measured geometric mark meets direct, practical typography. The identity brings the same recognisable structure to project boards, printed matter, and the studio website.",
  },
  {
    slug: "new-frequencies",
    title: "New Frequencies",
    type: "Digital",
    image: "frequency.svg",
    description:
      "An independent music platform with a visual language shaped by sound.",
    detail:
      "Repeated lines become a changing waveform. Electric blue, open spacing, and a single contrasting colour give release artwork, artist pages, and event listings a common vocabulary.",
  },
  {
    slug: "common-ground",
    title: "Common Ground",
    type: "Identity",
    image: "common.svg",
    description:
      "A shared identity for a neighbourhood space, designed to make room for different voices.",
    detail:
      "Four adjoining forms make a flexible mark. The warm palette and direct typography carry through to workshop posters, wayfinding, and a programme of community events.",
  },
];
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const [filter, setFilter] = React.useState("All");
  const link = (p: string) => basePath + "/" + p;
  const project = work.find((w) => route === "work/" + w.slug) ?? work[0];
  const nextProject = work[(work.indexOf(project) + 1) % work.length];
  return (
    <Marketing
      brand="OTHER"
      basePath={basePath}
      nav={["work", "studio", "contact"]}
    >
      <main>
        {route === "contact" ? (
          <>
            <PageTitle
              title="Got a good problem?"
              text="We’d like to hear it."
            />
            <ContactForm />
          </>
        ) : route === "studio" ? (
          <>
            <PageTitle
              title="A different point of view."
              text="A fictional independent design studio for people with something to say."
            />
            <div className="grid gap-8 py-8 md:grid-cols-2">
              <p className="text-2xl leading-relaxed">
                We work where strategy meets instinct. Thoughtful enough to make
                sense. Unexpected enough to make you look twice.
              </p>
              <img
                src={assetBase + "/frequency.svg"}
                alt="Original geometric frequency artwork"
                className="w-full rounded-xl"
              />
            </div>
            <a href={link("contact")} className="text-2xl underline">
              Let’s talk →
            </a>
          </>
        ) : route.startsWith("work/") ? (
          <>
            <PageTitle title={project.title} text={project.description} />
            <img
              src={assetBase + "/" + project.image}
              alt={project.title + " identity artwork"}
              className="w-full rounded-xl"
            />
            <div className="grid gap-8 py-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl">The identity in use.</h2>
                <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-muted-foreground">Discipline</dt>
                  <dd>{project.type}</dd>
                  <dt className="text-muted-foreground">Year</dt>
                  <dd>2026</dd>
                  <dt className="text-muted-foreground">Studio</dt>
                  <dd>OTHER</dd>
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">
                  {project.type} · Illustrative studio project
                </p>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {project.detail}
              </p>
            </div>
            <a
              className="template-next-project"
              href={link("work/" + nextProject.slug)}
            >
              <span>
                Next project<strong>{nextProject.title}</strong>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </>
        ) : (
          <>
            {!route && (
              <section className="grid gap-8 py-12 md:grid-cols-[1.3fr_1fr] md:items-end md:py-14">
                <h1 className="max-w-5xl text-5xl leading-[1.02] md:text-7xl">
                  Same world.
                  <br />
                  <span className="text-[#ce3b12]">OTHER</span> ideas.
                </h1>
                <div className="grid gap-6 pb-1 md:justify-self-end">
                  <p className="max-w-sm text-lg">
                    Independent thinking.
                    <br />
                    Identity, digital, and everything between.
                  </p>
                  <a href={link("contact")} className="underline">
                    Bring us a good problem →
                  </a>
                </div>
              </section>
            )}
            {route === "work" && <PageTitle title="Out in the world." />}
            <div className="mb-6 flex gap-2 border-y border-border py-3">
              {["All", "Identity", "Digital"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "primary" : "ghost"}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </Button>
              ))}
            </div>
            <div className="grid gap-x-7 gap-y-12 md:grid-cols-2">
              {work
                .filter((w) => filter === "All" || w.type === filter)
                .map((w) => (
                  <a
                    href={link("work/" + w.slug)}
                    key={w.title}
                    className="group first:md:col-span-2"
                  >
                    <img
                      src={assetBase + "/" + w.image}
                      alt={w.title + " geometric identity artwork"}
                      className="aspect-[16/9] w-full object-contain transition-[filter] duration-300 group-hover:brightness-105"
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <h2 className="font-display text-2xl">{w.title}</h2>
                      <span className="text-sm">{w.type} ↗</span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {w.description}
                    </p>
                  </a>
                ))}
            </div>
          </>
        )}
      </main>
    </Marketing>
  );
}
