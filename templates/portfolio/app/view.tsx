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
    <div className="template-marketing mx-auto max-w-7xl px-5 md:px-10">
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
      <h1 className="text-4xl md:text-5xl">{title}</h1>
      {text && <p className="mt-4 max-w-2xl text-muted-foreground">{text}</p>}
    </header>
  );
}
import { ContactForm } from "@registry/blocks/contact-form";
const projects = [
  {
    slug: "field-notes",
    name: "Field notes",
    text: "A local-first writing space with quick retrieval and a focused editor.",
    image: "fieldwork.svg",
    detail:
      "The main challenge was helping a growing collection of notes stay easy to navigate. The interface keeps search close, preserves the current draft, and makes the relationship between notes visible without adding a folder hierarchy.",
  },
  {
    slug: "frequency",
    name: "Frequency",
    text: "An interactive study of sound, repetition, and motion.",
    image: "frequency.svg",
    detail:
      "A visual experiment built around a small set of waveforms. Input changes the frequency and phase of the pattern, with a static composition for visitors who prefer reduced motion.",
  },
  {
    slug: "common-ground",
    name: "Common ground",
    text: "A shared project space that keeps decisions beside the work.",
    image: "common.svg",
    detail:
      "A product concept for small teams. Project briefs, task ownership, and a readable activity history give each handoff enough context to continue without a meeting.",
  },
];
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const link = (p: string) => basePath + "/" + p;
  const project =
    projects.find((p) => route === "projects/" + p.slug) ?? projects[0];
  return (
    <Marketing
      brand="Alex Rivers"
      basePath={basePath}
      nav={["projects", "about", "contact"]}
    >
      <main>
        {route === "contact" ? (
          <>
            <PageTitle
              title="Let’s make something useful."
              text="Have a project in mind? Start with a few words."
            />
            <ContactForm />
          </>
        ) : route === "about" ? (
          <>
            <PageTitle
              title="Curious by default."
              text="Alex is a fictional developer profile for this template."
            />
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
              <p>
                I like the point where an idea becomes something you can use.
                The details that make a tool feel obvious. The small decisions
                that make a page feel alive.
              </p>
              <p>
                My work moves between interface design and frontend engineering,
                with a soft spot for typography, thoughtful interaction, and the
                open web.
              </p>
              <p className="font-mono text-sm">
                React / TypeScript / Creative development
              </p>
            </div>
          </>
        ) : route.startsWith("projects/") ? (
          <>
            <PageTitle title={project.name} text={project.text} />
            <img
              src={assetBase + "/" + project.image}
              alt={project.name + " project artwork"}
              className="w-full rounded-xl"
            />
            <div className="grid gap-8 py-10 md:grid-cols-2">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  The approach
                </p>
                <h2 className="font-display text-3xl">
                  The thinking behind it.
                </h2>
                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <dt className="text-muted-foreground">Role</dt>
                  <dd>Design & development</dd>
                  <dt className="text-muted-foreground">Stack</dt>
                  <dd>React, TypeScript</dd>
                  <dt className="text-muted-foreground">Year</dt>
                  <dd>2026</dd>
                </dl>
              </div>
              <p className="leading-relaxed">{project.detail}</p>
            </div>
          </>
        ) : (
          <>
            {!route && (
              <section className="grid gap-8 py-16 md:grid-cols-[2fr_1fr] md:items-end">
                <h1 className="text-5xl leading-[1.06] md:text-7xl">
                  I build interfaces.
                  <br />
                  And the details.
                </h1>
                <div>
                  <p className="text-muted-foreground">
                    I’m Alex, a developer who cares about how things work and
                    how they feel.
                  </p>
                  <p className="mt-5 font-mono text-xs">
                    Illustrative developer profile
                  </p>
                </div>
              </section>
            )}
            {route === "projects" && <PageTitle title="Selected work." />}
            {projects.map((p, i) => (
              <a
                key={p.name}
                href={link("projects/" + p.slug)}
                className="grid gap-6 border-t border-border py-8 md:grid-cols-[1fr_2fr]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs text-muted-foreground">
                    <span>0{i + 1} / SELECTED WORK</span>
                    <span>2026</span>
                  </div>
                  <h2 className="mt-6 font-display text-3xl">{p.name}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                  <span className="mt-8 block text-sm">View project ↗</span>
                </div>
                <img
                  src={assetBase + "/" + p.image}
                  alt={p.name + " original geometric artwork"}
                  className="aspect-[16/9] w-full object-contain"
                />
              </a>
            ))}
          </>
        )}
      </main>
    </Marketing>
  );
}
