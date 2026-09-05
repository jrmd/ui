"use client";
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
      <div className="preview-stage">
        <iframe
          ref={ref}
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
