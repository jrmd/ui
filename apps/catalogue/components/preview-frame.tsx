"use client";
import { useEffect, useRef, useState } from "react";
import items from "../../../packages/catalogue/items.json";
import { Demo } from "./demo";
export function PreviewFrame({ slug }: { slug: string }) {
  const group = items.find((item) => item.slug === slug)?.group;
  const ref = useRef<HTMLDivElement>(null);
  const [customization, setCustomization] = useState<
    NonNullable<Parameters<typeof Demo>[0]["customization"]>
  >({});
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = new URLSearchParams(location.search).get("theme") === "dark";
    setDark(isDark);
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
        "title",
        "description",
        "actionLabel",
        "brand",
        "imageSrc",
        "imageAlt",
      ] as const)
        if (typeof raw[key] === "string") next[key] = raw[key];
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
      <Demo slug={slug} customization={customization} />
    </div>
  );
}
