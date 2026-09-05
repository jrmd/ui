"use client";
import { useRef, useState, type SetStateAction } from "react";
/** Controlled or instance-local state. Functional updates also work before a rerender. */
export function useControllable<T>(
  value: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
) {
  const [local, setLocal] = useState(initial);
  const current = useRef(value === undefined ? local : value);
  current.current = value === undefined ? local : value;
  return [
    current.current,
    (action: SetStateAction<T>) => {
      const next =
        typeof action === "function"
          ? (action as (previous: T) => T)(current.current)
          : action;
      current.current = next;
      if (value === undefined) setLocal(next);
      onChange?.(next);
    },
  ] as const;
}
