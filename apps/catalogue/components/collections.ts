export type CollectionEntry = {
  slug: string;
  title: string;
  group: string;
  kind: string;
};
export const blockCollections = [
  "heroes",
  "navigation",
  "sidebars",
  "authentication",
  "forms",
  "commerce",
  "features",
  "bento",
  "how-it-works",
  "content",
  "workspace",
];
export function collectionFor(item: CollectionEntry) {
  if (item.kind !== "block") return item.group;
  if (item.slug.endsWith("-hero")) return "heroes";
  if (item.slug.endsWith("-navigation")) return "navigation";
  if (/sidebar|switcher|application-shell/.test(item.slug)) return "sidebars";
  if (/login|sign-in|sign-up|password-reset|auth$/.test(item.slug))
    return "authentication";
  if (/bento/.test(item.slug)) return "bento";
  if (/how-it-works/.test(item.slug)) return "how-it-works";
  if (/feature/.test(item.slug)) return "features";
  if (/contact-form|newsletter/.test(item.slug)) return "forms";
  if (/pricing|billing|product-comparison/.test(item.slug)) return "commerce";
  return item.group === "workspace" ? "workspace" : "content";
}
export function collectionNames(items: CollectionEntry[]) {
  return items.some((i) => i.kind === "block")
    ? blockCollections.filter((c) => items.some((i) => collectionFor(i) === c))
    : [...new Set(items.map((i) => i.group))];
}
