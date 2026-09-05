"use client";
import * as React from "react";
import { cn } from "./utils";
import { useControllable } from "./use-controllable";
export function OtpInput({
  value,
  defaultValue = "",
  onValueChange,
  length = 6,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  length?: number;
  className?: string;
}) {
  const [code, setCode] = useControllable(value, defaultValue, onValueChange);
  return (
    <label className={cn("grid gap-2 text-sm", className)}>
      Verification code
      <input
        aria-label={`${length}-digit verification code`}
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern={`[0-9]{${length}}`}
        maxLength={length}
        value={code}
        onChange={(e) =>
          setCode(e.target.value.replace(/\D/g, "").slice(0, length))
        }
        className="w-full max-w-72 rounded-xl border border-border bg-background px-4 py-3 text-center font-mono text-2xl tracking-[.4em]"
      />
    </label>
  );
}
