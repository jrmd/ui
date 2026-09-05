"use client";
import * as React from "react";
/** Keeps duplicate submissions out and reports failures without committing local success. */
export function useAsyncAction() {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const busy = React.useRef(false);
  async function run(action: () => void | Promise<void>) {
    if (busy.current) return false;
    busy.current = true;
    setPending(true);
    setError(undefined);
    try {
      await action();
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "The action failed. Please try again.",
      );
      return false;
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return { run, pending, error };
}
