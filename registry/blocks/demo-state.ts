"use client";
import { useState, useEffect, useCallback } from "react";
export function useDemoState<T>(key: string, initial: T) {
  const [state, setState] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("jez-demo:" + key);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    if (loaded)
      try {
        localStorage.setItem("jez-demo:" + key, JSON.stringify(state));
      } catch {}
  }, [key, state, loaded]);
  const reset = useCallback(() => setState(initial), [initial]);
  return [state, setState, reset] as const;
}
