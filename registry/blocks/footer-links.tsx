"use client";
import * as React from "react";
export type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};
export const defaultFooterGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { label: "Components", href: "/components" },
      { label: "Blocks", href: "/blocks" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
    ],
  },
];
export function FooterLinks({
  groups = defaultFooterGroups,
}: {
  groups?: FooterLinkGroup[];
}) {
  return (
    <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="mb-4 text-sm font-medium">{g.title}</h3>
          <ul className="space-y-3">
            {g.links.map((l) => (
              <li key={l.href}>
                <a
                  className="text-sm opacity-80 hover:underline hover:opacity-100"
                  href={l.href}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
