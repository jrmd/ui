"use client";
import { useEffect, useRef, useState } from "react";
import items from "../../../packages/catalogue/items.json";
import { Demo } from "./demo";
export function PreviewFrame({ slug }: { slug: string }) {
  const group = items.find((item) => item.slug === slug)?.group;
  const ref = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const isDark = new URLSearchParams(location.search).get("theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    const obs = new ResizeObserver(() =>
      parent.postMessage(
        { type: "jez-height", height: ref.current?.scrollHeight ?? 360 },
        location.origin,
      ),
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      data-group={group}
      data-slug={slug}
      ref={ref}
      className={"demo-root " + (dark ? "dark" : "")}
    >
      <Demo slug={slug} />
    </div>
  );
}
