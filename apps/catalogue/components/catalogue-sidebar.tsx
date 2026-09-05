"use client";

import Link from "next/link";
import { collectionFor, collectionNames } from "./collections";
import { useLayoutEffect, useRef } from "react";

type Entry = { slug: string; title: string; group: string; kind: string };

export function CatalogueSidebar({
  entries,
  slug,
  kind,
}: {
  entries: Entry[];
  slug: string;
  kind: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const storageKey = `jez-catalogue-sidebar:${kind}`;

  useLayoutEffect(() => {
    const sidebar = ref.current;
    if (!sidebar) return;
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved !== null && Number.isFinite(Number(saved)))
        sidebar.scrollTop = Number(saved);
    } catch {
      // Client navigation still preserves the mounted sidebar when storage is unavailable.
    }
  }, [storageKey]);

  function rememberPosition() {
    try {
      sessionStorage.setItem(storageKey, String(ref.current?.scrollTop ?? 0));
    } catch {
      // Storage may be disabled by the browser.
    }
  }

  return (
    <aside
      ref={ref}
      className="detail-sidebar"
      aria-label="Catalogue navigation"
      onScroll={rememberPosition}
    >
      {collectionNames(entries).map((group) => (
        <div key={group}>
          <h3>{group}</h3>
          {entries
            .filter((entry) => collectionFor(entry) === group)
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((entry) => (
              <Link
                key={entry.slug}
                href={`/${entry.kind === "block" ? "blocks" : "components"}/${entry.slug}`}
                prefetch={false}
                onClick={rememberPosition}
                aria-current={entry.slug === slug ? "page" : undefined}
              >
                {entry.title}
              </Link>
            ))}
        </div>
      ))}
    </aside>
  );
}
