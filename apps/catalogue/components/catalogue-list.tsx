"use client";
import { useState, useEffect } from "react";
import { ComponentTile } from "./tiles";
type Item = {
  slug: string;
  title: string;
  group: string;
  kind: string;
  description: string;
};
export function CatalogueList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  useEffect(() => {
    const c = new URLSearchParams(location.search).get("category");
    if (c) setCategory(c);
  }, []);
  const categories = ["all", ...new Set(items.map((i) => i.group))];
  const visible = items.filter(
    (i) =>
      (category === "all" || i.group === category) &&
      (i.title + " " + i.description)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="filter-bar">
        <div className="filter-tabs" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                history.replaceState(
                  null,
                  "",
                  c === "all" ? location.pathname : "?category=" + c,
                );
              }}
              className="capitalize"
            >
              {c === "all" ? "All " + items.length : c}
            </button>
          ))}
        </div>
        <input
          className="filter-search"
          type="search"
          aria-label="Search catalogue"
          placeholder="Find your next component…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="component-grid">
        {visible.map((i) => (
          <ComponentTile key={i.slug} {...i} />
        ))}
      </div>
      {!visible.length && (
        <div className="py-16 text-center">
          <h2 className="text-2xl">Nothing quite like that yet.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try another search or choose a different category.
          </p>
        </div>
      )}
      <p className="mt-8 text-xs text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {items.length}
      </p>
    </>
  );
}
