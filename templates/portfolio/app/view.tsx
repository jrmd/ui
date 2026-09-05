"use client";
import * as React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  FileText,
  Search,
  Check,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { ContactForm } from "@registry/blocks/contact-form";
export type TemplateProps = {
  route?: string;
  basePath?: string;
  assetBase?: string;
};
const projects = [
  {
    slug: "field-notes",
    name: "Field notes",
    type: "Product design & development",
    text: "A local-first writing space with quick retrieval and a focused editor.",
    image: "fieldwork.svg",
    detail:
      "The main challenge was helping a growing collection of notes stay easy to navigate. The interface keeps search close, preserves the current draft, and makes the relationship between notes visible without adding a folder hierarchy.",
    principle: "Less organising. More thinking.",
    choice:
      "A single writing surface, a searchable collection, and the reassuring feeling that your work is already saved.",
  },
  {
    slug: "frequency",
    name: "Frequency",
    type: "Creative development",
    text: "An interactive study of sound, repetition, and motion.",
    image: "frequency.svg",
    detail:
      "A visual experiment built around a small set of waveforms. Input changes the frequency and phase of the pattern, with a static composition for visitors who prefer reduced motion.",
    principle: "A small input. A different rhythm.",
    choice:
      "Frequency and phase become tangible controls. A restrained palette leaves the movement to do the talking.",
  },
  {
    slug: "common-ground",
    name: "Common ground",
    type: "Interface design & engineering",
    text: "A shared project space that keeps decisions beside the work.",
    image: "common.svg",
    detail:
      "A product concept for small teams. Project briefs, task ownership, and a readable activity history give each handoff enough context to continue without a meeting.",
    principle: "Make the next step obvious.",
    choice:
      "Keep ownership and the latest decision in the same view. The interface should answer a question before it creates another.",
  },
];
function ProjectArtwork({
  slug,
  assetBase,
}: {
  slug: string;
  assetBase: string;
}) {
  if (slug === "frequency")
    return (
      <div className="rivers-art rivers-frequency">
        <img
          src={assetBase + "/frequency.svg"}
          alt="Frequency: an original study of overlapping waveforms"
        />
      </div>
    );
  return (
    <div
      className={
        "rivers-art " +
        (slug === "field-notes" ? "rivers-notes" : "rivers-common")
      }
      role="img"
      aria-label={
        slug === "field-notes"
          ? "Field notes interface concept with a note collection and focused writing surface"
          : "Common ground interface concept with project tasks and decisions"
      }
    >
      <div className="rivers-app" aria-hidden="true">
        <div className="rivers-app-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <span>
            {slug === "field-notes" ? "Field notes" : "Common ground"}
          </span>
          <span>
            <Check size={12} /> Saved
          </span>
        </div>
        <div className="rivers-app-body">
          <aside>
            <strong>
              {slug === "field-notes"
                ? "Your thinking, collected."
                : "A little more clarity."}
            </strong>
            <span>
              <Search size={12} /> Search your workspace
            </span>
            {["Everything", "Projects", "Ideas", "Archive"].map((n, i) => (
              <span key={n} className={i === 0 ? "is-selected" : ""}>
                <FileText size={12} />
                {n}
              </span>
            ))}
            <small>Personal workspace</small>
          </aside>
          <div className="rivers-document">
            {slug === "field-notes" ? (
              <>
                <span className="rivers-document-date">September 5, 2026</span>
                <h3>
                  Leave room
                  <br />
                  for a good idea.
                </h3>
                <p>
                  The best ideas rarely arrive fully formed. Give them a place
                  to begin.
                </p>
                <hr />
                <h4>A few things worth noticing</h4>
                <p>
                  A familiar path. An unexpected conversation. The small detail
                  that makes everything feel different.
                </p>
                <div className="rivers-note-link">
                  <FileText size={14} /> A place to start{" "}
                  <ArrowUpRight size={14} />
                </div>
              </>
            ) : (
              <>
                <span className="rivers-document-date">Website refresh</span>
                <h3>
                  Good work,
                  <br />
                  moving forward.
                </h3>
                <p>The decisions, the details, and what comes next.</p>
                <div className="rivers-board">
                  {[
                    "Define the direction",
                    "Build the first version",
                    "Make the details count",
                  ].map((t, i) => (
                    <div key={t}>
                      <span>
                        {i === 0 ? <Check size={14} /> : <Layers size={14} />}
                      </span>
                      <strong>{t}</strong>
                      <small>{["Done", "In progress", "Up next"][i]}</small>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export function TemplateView({
  route = "",
  basePath = "",
  assetBase = "/assets",
}: TemplateProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const link = (p: string) => basePath + "/" + p;
  const project =
    projects.find((p) => route === "projects/" + p.slug) ?? projects[0];
  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <div className="rivers-portfolio template-design">
      <header className="rivers-nav">
        <a className="rivers-brand" href={link("")}>
          <span aria-hidden="true">ar.</span>Alex Rivers
        </a>
        <button
          className="rivers-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav aria-label="Main navigation" data-open={menuOpen}>
          <a
            href={link("projects")}
            aria-current={route.startsWith("projects") ? "page" : undefined}
          >
            Projects
          </a>
          <a
            href={link("about")}
            aria-current={route === "about" ? "page" : undefined}
          >
            About
          </a>
          <a className="rivers-contact-link" href={link("contact")}>
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        {route === "contact" ? (
          <section className="rivers-contact">
            <div>
              <h1>
                Let’s make
                <br />
                something useful.
              </h1>
              <p>Have a project in mind? Start with a few words.</p>
              <p className="rivers-small">
                This is an illustrative developer portfolio. The form
                demonstrates the enquiry flow.
              </p>
            </div>
            <ContactForm />
          </section>
        ) : route === "about" ? (
          <>
            <section className="rivers-intro">
              <h1>
                Curious
                <br />
                by default.
              </h1>
              <div>
                <p>
                  I like the point where an idea becomes something you can use.
                </p>
                <a className="rivers-text-link" href={link("contact")}>
                  Start a conversation <ArrowUpRight size={16} />
                </a>
              </div>
            </section>
            <section className="rivers-about">
              <h2>
                The details
                <br />
                are the work.
              </h2>
              <div>
                <p>
                  The details that make a tool feel obvious. The small decisions
                  that make a page feel alive.
                </p>
                <p>
                  My work moves between interface design and frontend
                  engineering, with a soft spot for typography, thoughtful
                  interaction, and the open web.
                </p>
                <div className="rivers-skills">
                  {[
                    "Interface design",
                    "React & TypeScript",
                    "Creative development",
                    "Accessible experiences",
                  ].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <p className="rivers-small">
                  Alex is a fictional developer profile for this template.
                </p>
              </div>
            </section>
          </>
        ) : route.startsWith("projects/") ? (
          <>
            <a className="rivers-back" href={link("projects")}>
              <ArrowLeft size={16} /> All projects
            </a>
            <section className="rivers-project-intro">
              <div>
                <h1>{project.name}</h1>
                <p>{project.text}</p>
              </div>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>Design & development</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>React, TypeScript</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>2026</dd>
                </div>
              </dl>
            </section>
            <ProjectArtwork slug={project.slug} assetBase={assetBase} />
            <section className="rivers-case-story">
              <h2>{project.principle}</h2>
              <div>
                <p>{project.detail}</p>
                <p>{project.choice}</p>
                <p className="rivers-small">
                  Illustrative project · Interface concept
                </p>
              </div>
            </section>
            <a
              className="rivers-next"
              href={link("projects/" + nextProject.slug)}
            >
              <span>
                Next project<strong>{nextProject.name}</strong>
              </span>
              <ArrowUpRight size={32} />
            </a>
          </>
        ) : (
          <>
            <section className="rivers-intro">
              <h1>
                {route === "projects" ? (
                  <>
                    Selected work.
                    <br />
                    <em>Considered details.</em>
                  </>
                ) : (
                  <>
                    I build interfaces.
                    <br />
                    <em>And the details.</em>
                  </>
                )}
              </h1>
              <div>
                <p>
                  I’m Alex, a developer who cares about how things work and how
                  they feel.
                </p>
                <a className="rivers-text-link" href={link("about")}>
                  A little about me <ArrowRight size={16} />
                </a>
              </div>
            </section>
            <div className="rivers-work-heading">
              <h2>Selected projects</h2>
              <span>Design, code & a little curiosity</span>
            </div>
            <section
              className="rivers-project-grid"
              aria-label="Selected projects"
            >
              {projects.map((p) => (
                <a
                  key={p.slug}
                  className="rivers-project-card"
                  href={link("projects/" + p.slug)}
                >
                  <ProjectArtwork slug={p.slug} assetBase={assetBase} />
                  <div className="rivers-project-caption">
                    <div>
                      <h2>{p.name}</h2>
                      <p>{p.text}</p>
                      <span>{p.type}</span>
                    </div>
                    <span className="rivers-card-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </a>
              ))}
            </section>
            {!route && (
              <section className="rivers-about">
                <h2>
                  Thoughtful design.
                  <br />
                  Careful engineering.
                </h2>
                <div>
                  <p>
                    From the first sketch to the final interaction, I care about
                    making the whole experience feel right.
                  </p>
                  <div className="rivers-skills">
                    <span>Interface design</span>
                    <span>React & TypeScript</span>
                    <span>Creative development</span>
                  </div>
                  <a className="rivers-text-link" href={link("about")}>
                    More about my approach <ArrowUpRight size={16} />
                  </a>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      {route !== "contact" && (
        <section className="rivers-closing">
          <div>
            <h2>Something in mind?</h2>
            <p>Let’s give it a little shape.</p>
          </div>
          <a href={link("contact")}>
            Start a conversation <ArrowUpRight size={19} />
          </a>
        </section>
      )}
      <footer className="rivers-footer">
        <a href={link("")}>Alex Rivers</a>
        <span>Illustrative developer portfolio · Jez UI</span>
        <a href={link("contact")}>
          Get in touch <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
}
