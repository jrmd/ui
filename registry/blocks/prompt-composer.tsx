"use client";
import * as React from "react";
import { ArrowUp, Paperclip, X, Sparkles } from "lucide-react";
import { cn } from "../ui/utils";
import { WorkspaceHeading } from "./workspace-parts";
export function PromptComposer({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit?: (prompt: string, model: string) => void;
}) {
  const [text, setText] = React.useState("");
  const [model, setModel] = React.useState("Balanced");
  const [files, setFiles] = React.useState<string[]>([]);
  const [result, setResult] = React.useState("");
  return (
    <section className={cn("mx-auto w-full max-w-2xl py-4", className)}>
      <WorkspaceHeading
        title="What are we making today?"
        description="A first draft, a fresh perspective, or a little help getting started."
      />
      <form
        className="overflow-hidden rounded-xl border border-border bg-background"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onSubmit?.(text, model);
          setResult(
            `Demo request received: “${text.trim()}” · ${model}${files.length ? ` · ${files.length} attachment(s)` : ""}. Connect onSubmit to your own provider.`,
          );
          setText("");
          setFiles([]);
        }}
      >
        <textarea
          aria-label="Your prompt"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe the thing you have in mind…"
          className="min-h-36 w-full resize-y border-0 bg-transparent p-5 text-base outline-none"
          required
        />
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {files.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFiles((v) => v.filter((n) => n !== f))}
                className="flex items-center gap-2 rounded-lg bg-muted px-2 py-1 text-xs"
              >
                {f}
                <X size={12} />
                <span className="sr-only">Remove attachment</span>
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-3 border-t border-border p-3">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-lg p-2 hover:bg-muted">
              <Paperclip size={18} />
              <input
                aria-label="Attach reference files"
                type="file"
                multiple
                className="sr-only"
                onChange={(e) => {
                  setFiles(Array.from(e.target.files ?? [], (f) => f.name));
                  e.target.value = "";
                }}
              />
            </label>
            <select
              aria-label="Response mode"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="rounded-lg bg-muted px-3 py-2 text-xs"
            >
              <option>Balanced</option>
              <option>Fast draft</option>
              <option>Deep thought</option>
            </select>
          </div>
          <button
            aria-label="Send prompt"
            disabled={!text.trim()}
            className="grid size-10 place-items-center rounded-full bg-foreground text-background disabled:opacity-30"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "Outline a launch plan",
          "Tighten this headline",
          "Explore a new direction",
        ].map((t) => (
          <button
            key={t}
            onClick={() => setText(t)}
            className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs"
          >
            <Sparkles size={12} />
            {t}
          </button>
        ))}
      </div>
      {result && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-muted p-4 text-sm leading-relaxed"
        >
          {result}
        </p>
      )}
    </section>
  );
}
