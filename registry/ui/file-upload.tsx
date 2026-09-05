"use client";
import * as React from "react";
import { cn } from "./utils";
import { UploadCloud, FileText, X } from "lucide-react";
import { Button } from "./button";
export function FileUpload({
  children,
  accept,
  maxBytes = 5 * 1024 * 1024,
  multiple = false,
  onFilesChange,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    accept?: string;
    maxBytes?: number;
    multiple?: boolean;
    onFilesChange?: (files: File[]) => void;
    className?: string;
  }
> & {
  accept?: string;
  maxBytes?: number;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState("");
  const id = React.useId();
  const [dragging, setDragging] = React.useState(false);
  function choose(list: File[]) {
    const next = multiple ? list : list.slice(0, 1);
    const allowed = (f: File) =>
      !accept ||
      accept.split(",").some((a) => {
        a = a.trim();
        return a.startsWith(".")
          ? f.name.toLowerCase().endsWith(a.toLowerCase())
          : a.endsWith("/*")
            ? f.type.startsWith(a.slice(0, -1))
            : f.type === a;
      });
    if (next.some((f) => f.size > maxBytes)) {
      setError(
        `Each file must be under ${Math.round(maxBytes / 1024 / 1024)} MB.`,
      );
      return;
    }
    if (next.some((f) => !allowed(f))) {
      setError("This file type is not accepted.");
      return;
    }
    setError("");
    setFiles(next);
    onFilesChange?.(next);
  }
  return (
    <div {...rootProps} className={cn("grid min-w-0 gap-3", className)}>
      {children !== undefined ? (
        children
      ) : (
        <>
          <label
            htmlFor={id}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              choose(Array.from(e.dataTransfer.files));
            }}
            className={cn(
              "relative grid min-w-0 cursor-pointer justify-items-center gap-3 rounded-xl border border-dashed border-border bg-muted/20 px-6 py-9 text-center transition-colors hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary",
              dragging && "border-primary bg-primary/5",
            )}
          >
            <span className="mb-1 grid size-11 place-items-center rounded-xl border border-border bg-background shadow-sm">
              <UploadCloud size={20} />
            </span>
            <span className="text-sm font-medium">
              {dragging
                ? "Drop your files here"
                : "Drag files here to attach them"}
            </span>
            <span className="text-xs text-muted-foreground">
              Up to {Math.round(maxBytes / 1024 / 1024)} MB per file
            </span>
            <span className="mt-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm">
              Browse files
            </span>
            <input
              id={id}
              aria-label="Choose files"
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => choose(Array.from(e.target.files ?? []))}
              className="sr-only"
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          {files.map((f, i) => (
            <div
              key={f.name + i}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"
            >
              <FileText className="shrink-0 text-muted-foreground" size={20} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{f.name}</span>
                <span className="text-xs text-muted-foreground">
                  {f.size < 1024 * 1024
                    ? `${Math.max(1, Math.round(f.size / 1024))} KB`
                    : `${(f.size / 1024 / 1024).toFixed(1)} MB`}{" "}
                  · Attached
                </span>
              </span>
              <Button
                size="sm"
                variant="ghost"
                aria-label={`Remove ${f.name}`}
                onClick={() => {
                  const next = files.filter((_, n) => n !== i);
                  setFiles(next);
                  onFilesChange?.(next);
                }}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
