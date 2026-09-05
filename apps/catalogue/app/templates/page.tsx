import { Shell } from "../../components/shell";
import { TemplateTile } from "../../components/tiles";
import templates from "../../generated/templates.json";
export const metadata = { title: "Templates" };
export default function Page() {
  return (
    <Shell>
      <main>
        <header className="catalogue-title">
          <h1>Eight new starting points.</h1>
          <p>
            Complete frontend journeys, each with a point of view. Explore every
            route, then download a standalone project and make it your own.
          </p>
        </header>
        <div className="collection-grid">
          {templates.map((t) => (
            <TemplateTile key={t.slug} {...t} />
          ))}
        </div>
      </main>
    </Shell>
  );
}
