import { Shell } from "../../components/shell";
import { CatalogueList } from "../../components/catalogue-list";
import items from "../../generated/catalogue.json";
export const metadata = { title: "Blocks" };
export default function Page() {
  return (
    <Shell>
      <main>
        <header className="catalogue-title">
          <h1>A head start with character.</h1>
          <p>
            36 complete sections for products and marketing sites. Thoughtfully
            composed, with working interactions and editable source.
          </p>
        </header>
        <CatalogueList items={items.filter((i) => i.kind === "block")} />
      </main>
    </Shell>
  );
}
