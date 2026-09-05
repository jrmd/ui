"use client";
import * as React from "react";
import { Search, X, LoaderCircle } from "lucide-react";
import { Input } from "./input";
import { useControllable } from "./use-controllable";
import { cn } from "./utils";
export function SearchInput({
  value,
  defaultValue = "",
  onValueChange,
  className,
  inputClassName,
  ref: forwardedRef,
  clearLabel = "Clear search",
  loading = false,
  ...props
}: Omit<
  React.ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  loading?: boolean;
  inputClassName?: string;
  clearLabel?: string;
}) {
  const [query, setQuery] = useControllable(value, defaultValue, onValueChange);
  const ref = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(forwardedRef, () => ref.current!, []);
  return (
    <div role="search" className={cn("group relative w-full", className)}>
      {loading ? (
        <LoaderCircle
          size={16}
          className="absolute left-3 top-3 animate-spin text-primary"
        />
      ) : (
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-3 text-muted-foreground transition-colors group-focus-within:text-primary"
        />
      )}
      <Input
        ref={ref}
        type="search"
        aria-label="Search"
        placeholder="Search…"
        {...props}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          "px-10 [&::-webkit-search-cancel-button]:appearance-none",
          inputClassName,
        )}
      />
      {query && (
        <button
          type="button"
          disabled={props.disabled}
          aria-label={clearLabel}
          onClick={() => {
            setQuery("");
            ref.current?.focus();
          }}
          className="absolute right-1 top-1 grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
