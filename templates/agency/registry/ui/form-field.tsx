"use client";
import * as React from "react";
import { cn } from "./utils";
export function FormField({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactElement<{
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
  }>;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {React.cloneElement(children, {
        id,
        "aria-describedby": hint || error ? id + "-help" : undefined,
        "aria-invalid": !!error,
      })}
      {(hint || error) && (
        <p
          id={id + "-help"}
          role={error ? "alert" : undefined}
          className={cn(
            "text-xs",
            error ? "text-danger" : "text-muted-foreground",
          )}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
