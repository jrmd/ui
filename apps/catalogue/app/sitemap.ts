import type { MetadataRoute } from "next";
import items from "../generated/catalogue.json";
import templates from "../generated/templates.json";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.JEZ_PUBLIC_URL ?? "http://localhost:3000";
  return [
    "",
    "/components",
    "/blocks",
    "/templates",
    "/docs/installation",
    "/docs/theming",
    "/docs/accessibility",
    ...items.map(
      (i) => `/${i.kind === "block" ? "blocks" : "components"}/${i.slug}`,
    ),
    ...templates.map((t) => "/templates/" + t.slug),
  ].map((p) => ({ url: base + p }));
}
