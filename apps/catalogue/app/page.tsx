import { Shell } from "../components/shell";
import { HomeExhibit } from "../components/home-exhibit";
import { ComponentTile, TemplateTile } from "../components/tiles";
import items from "../generated/catalogue.json";
import templates from "../generated/templates.json";
export default function Home() {
  return (
    <Shell>
      <main>
        <section className="home-intro">
          <h1>
            Good foundations.
            <br />A little more <em>feeling.</em>
          </h1>
          <p>
            Clean components. Expressive motion.
            <br />
            Whole new starting points.
            <br />
            Make your next thing feel like{" "}
            <span className="text-foreground">your thing.</span>
          </p>
        </section>
        <HomeExhibit />
        <section>
          <div className="section-heading">
            <div>
              <h2>Small pieces. Big possibilities.</h2>
              <p>The useful, the playful, and the pleasantly unexpected.</p>
            </div>
            <a href="/components">All components ↗</a>
          </div>
          <div className="component-grid">
            {[
              "button",
              "area-chart",
              "scramble-text",
              "spotlight-card",
              "dialog",
              "webgl-orb",
            ].map((slug) => {
              const item = items.find((i) => i.slug === slug)!;
              return <ComponentTile key={slug} {...item} />;
            })}
          </div>
        </section>
        <section>
          <div className="section-heading">
            <div>
              <h2>Skip the blank page.</h2>
              <p>
                Complete templates. Distinct personalities. Ready for your
                ideas.
              </p>
            </div>
            <a href="/templates">All templates ↗</a>
          </div>
          <div className="collection-grid">
            {templates
              .filter((t) =>
                ["saas", "agency", "analytics", "editorial"].includes(t.slug),
              )
              .map((t) => (
                <TemplateTile key={t.slug} {...t} />
              ))}
          </div>
        </section>
        <section className="my-16 flex flex-wrap items-center justify-between gap-8 rounded-xl bg-[#d9e3cd] p-8 text-[#202718] md:p-12">
          <h2 className="max-w-2xl text-4xl md:text-5xl">
            Less starting from scratch.
            <br />
            More making it yours.
          </h2>
          <a
            href="/docs/installation"
            className="rounded-xl bg-[#202718] px-5 py-3 text-sm text-[#f8faef]"
          >
            Get started →
          </a>
        </section>
      </main>
    </Shell>
  );
}
