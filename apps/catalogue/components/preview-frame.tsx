"use client";
import { useEffect, useRef, useState } from "react";
import items from "../../../packages/catalogue/items.json";
import { BlockRecipe } from "./block-recipes";
import { Demo } from "./demo";
export function PreviewFrame({ slug }: { slug: string }) {
  const group = items.find((item) => item.slug === slug)?.group;
  const ref = useRef<HTMLDivElement>(null);
  const [customization, setCustomization] = useState<
    NonNullable<Parameters<typeof Demo>[0]["customization"]>
  >({});
  const [composition, setComposition] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = new URLSearchParams(location.search).get("theme") === "dark";
    setDark(isDark);
    setComposition(
      new URLSearchParams(location.search).get("composition") === "1",
    );
    document.documentElement.classList.toggle("dark", isDark);
    function update(e: MessageEvent) {
      if (
        e.origin !== location.origin ||
        e.source !== parent ||
        e.data?.type !== "jez-customize"
      )
        return;
      const raw = e.data.options;
      if (!raw || typeof raw !== "object") return;
      const next: NonNullable<Parameters<typeof Demo>[0]["customization"]> = {};
      for (const key of [
        "artworkText",
        "title",
        "description",
        "actionLabel",
        "brand",
        "secondaryImageSrc",
        "secondaryImageAlt",
        "imageSrc",
        "imageAlt",
      ] as const)
        if (typeof raw[key] === "string") next[key] = raw[key];
      if (raw.copy && typeof raw.copy === "object")
        next.copy = Object.fromEntries(
          Object.entries(raw.copy).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string",
          ),
        );
      if (raw.artwork && typeof raw.artwork === "object")
        next.artwork = {
          ...(typeof raw.artwork.color === "string"
            ? { color: raw.artwork.color }
            : {}),
          ...(typeof raw.artwork.speed === "number" &&
          Number.isFinite(raw.artwork.speed)
            ? { speed: Math.max(0, Math.min(2, raw.artwork.speed)) }
            : {}),
        };
      setCustomization(next);
    }
    window.addEventListener("message", update);
    const obs = new ResizeObserver(() =>
      parent.postMessage(
        { type: "jez-height", height: ref.current?.scrollHeight ?? 360 },
        location.origin,
      ),
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      obs.disconnect();
      window.removeEventListener("message", update);
    };
  }, []);
  return (
    <div
      data-group={group}
      data-slug={slug}
      ref={ref}
      className={"demo-root " + (dark ? "dark" : "")}
    >
      {composition ? (
        <BlockRecipe slug={slug} />
      ) : (
        <Demo slug={slug} customization={customization} />
      )}
    </div>
  );
}
