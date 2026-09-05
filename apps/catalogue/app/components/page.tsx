import { Shell } from "../../components/shell";
import { CatalogueList } from "../../components/catalogue-list";
import items from "../../generated/catalogue.json";
export const metadata = { title: "Components" };
export default function Page() {
  return (
    <Shell>
      <main>
        <header className="catalogue-title">
          <h1>Your next good detail.</h1>
          <p>
            90 components, from the quietly useful to the pleasantly unexpected.
            Explore the preview. Take the source. Make it yours.
          </p>
        </header>
        <CatalogueList items={items.filter((i) => i.kind === "component")} />
      </main>
    </Shell>
  );
}
