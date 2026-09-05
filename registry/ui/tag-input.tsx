"use client";
import * as React from "react";
import { cn } from "./utils";
import { useControllable } from "./use-controllable";
export function TagInput({
  value,
  defaultValue = [],
  onValueChange,
  label = "Tags",
  className,
}: {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
  className?: string;
}) {
  const [tags, setTags] = useControllable(value, defaultValue, onValueChange);
  const [text, setText] = React.useState("");
  const id = React.useId();
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 rounded-xl border border-border p-2">
        {tags.map((t) => (
          <span
            key={t}
            className="flex items-center gap-2 rounded-md bg-muted px-2 py-1 text-sm"
          >
            {t}
            <button
              aria-label={`Remove ${t}`}
              onClick={() => setTags(tags.filter((v) => v !== t))}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          className="min-w-20 flex-1 bg-transparent p-1 text-sm outline-none"
          value={text}
          placeholder="Type and press Enter"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const t = text.trim();
              if (t && !tags.includes(t)) setTags([...tags, t]);
              setText("");
            }
            if (e.key === "Backspace" && !text) setTags(tags.slice(0, -1));
          }}
        />
      </div>
    </div>
  );
}
