"use client";
import items from "../../../packages/catalogue/items.json";
import { useState, useEffect, useRef } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
export function CodeBox({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="code-box">
      <div className="code-actions">
        <span>Scroll horizontally for long lines</span>
        <button
          aria-label="Copy code"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
      <pre tabIndex={0} aria-label="Code sample">
        <code>{code}</code>
      </pre>
    </div>
  );
}
export function InstallCommand({ slug }: { slug: string }) {
  const [origin, setOrigin] = useState("http://localhost:3000");
  useEffect(() => setOrigin(location.origin), []);
  return (
    <CodeBox code={`pnpm dlx shadcn@4.0.8 add ${origin}/r/${slug}.json`} />
  );
}
export function Preview({
  slug,
  block = false,
}: {
  slug: string;
  block?: boolean;
}) {
  const item = items.find((i) => i.slug === slug);
  const fields = item?.customization ?? [];
  const [customOpen, setCustomOpen] = useState(false);
  const [options, setOptions] = useState<
    Record<string, string | { color?: string; speed?: number }>
  >({});
  function sendOptions() {
    ref.current?.contentWindow?.postMessage(
      { type: "jez-customize", options },
      location.origin,
    );
  }
  useEffect(() => {
    ref.current?.contentWindow?.postMessage(
      { type: "jez-customize", options },
      location.origin,
    );
  }, [options]);
  const [width, setWidth] = useState("100%");
  const [dark, setDark] = useState(false);
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState("preview");
  const [height, setHeight] = useState(block ? 600 : 360);
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    function message(e: MessageEvent) {
      if (
        e.source === ref.current?.contentWindow &&
        e.origin === location.origin &&
        e.data?.type === "jez-height"
      )
        setHeight(Math.max(330, Math.min(900, e.data.height)));
    }
    window.addEventListener("message", message);
    return () => window.removeEventListener("message", message);
  }, []);
  return (
    <div className="preview-box">
      <div className="preview-toolbar">
        <div className="flex gap-1">
          <button
            aria-pressed={mode === "preview"}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
          <a
            href={"/preview/" + slug}
            target="_blank"
            rel="noreferrer"
            className="px-2 py-1.5"
          >
            Open ↗
          </a>
        </div>
        <div className="flex gap-1">
          {[
            [Monitor, "100%", "Desktop"],
            [Tablet, "768px", "Tablet"],
            [Smartphone, "375px", "Mobile"],
          ].map(([Icon, w, label]) => {
            const I = Icon as typeof Monitor;
            return (
              <button
                key={String(w)}
                aria-label={String(label) + " preview"}
                aria-pressed={width === w}
                onClick={() => setWidth(String(w))}
              >
                <I size={14} />
              </button>
            );
          })}
          <button
            aria-label={dark ? "Light preview" : "Dark preview"}
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            aria-label="Restart example"
            onClick={() => setKey((k) => k + 1)}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      {fields.length > 0 && (
        <div className="border-t border-border px-4 py-3">
          <button
            aria-expanded={customOpen}
            onClick={() => setCustomOpen(!customOpen)}
            className="text-xs font-medium"
          >
            {customOpen ? "Hide customisation" : "Customise this block"}
          </button>
          {customOpen && (
            <div className="mt-4 grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fields
                  .filter((f) => f !== "artwork")
                  .map((field) => (
                    <label key={field} className="grid gap-2 text-xs">
                      {{
                        title: "Heading",
                        description: "Description",
                        actionLabel: "Button label",
                        brand: "Brand",
                        imageSrc: "Image URL",
                        imageAlt: "Image description",
                      }[field] ?? field}
                      <input
                        className="min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm"
                        value={
                          typeof options[field] === "string"
                            ? String(options[field])
                            : ""
                        }
                        placeholder="Use the original"
                        onChange={(e) =>
                          setOptions((prev) => {
                            const next = { ...prev };
                            if (e.target.value) next[field] = e.target.value;
                            else delete next[field];
                            return next;
                          })
                        }
                      />
                    </label>
                  ))}
                {fields.includes("artwork") && (
                  <>
                    <label className="grid gap-2 text-xs">
                      Artwork colour
                      <input
                        type="color"
                        className="h-9 w-full rounded-md border border-border bg-background p-1"
                        value={
                          typeof options.artwork === "object"
                            ? (options.artwork.color ?? "#b7cdbb")
                            : "#b7cdbb"
                        }
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            artwork: {
                              ...(typeof prev.artwork === "object"
                                ? prev.artwork
                                : {}),
                              color: e.target.value,
                            },
                          }))
                        }
                      />
                    </label>
                    <label className="grid gap-2 text-xs">
                      Animation speed
                      <input
                        type="range"
                        className="accent-primary"
                        min="0"
                        max="2"
                        step="0.05"
                        value={
                          typeof options.artwork === "object"
                            ? (options.artwork.speed ?? 0.45)
                            : 0.45
                        }
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            artwork: {
                              ...(typeof prev.artwork === "object"
                                ? prev.artwork
                                : {}),
                              speed: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </label>
                  </>
                )}
              </div>
              <button
                onClick={() => setOptions({})}
                className="w-fit text-xs underline underline-offset-4"
              >
                Reset customisation
              </button>
              <details>
                <summary className="cursor-pointer text-xs">
                  Customised JSX
                </summary>
                <CodeBox
                  code={`import { ${item?.symbol} } from '@/components/jez-ui/blocks/${slug}';\n\nexport default function Example() {\n  return <${item?.symbol} {...${JSON.stringify(options, null, 2)}} />;\n}`}
                />
              </details>
            </div>
          )}
        </div>
      )}
      <div className="preview-stage">
        <iframe
          ref={ref}
          onLoad={sendOptions}
          key={key}
          title={slug + " live preview"}
          src={`/preview/${slug}?theme=${dark ? "dark" : "light"}`}
          style={{ width, height }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
