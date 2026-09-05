"use client";
import * as React from "react";
import { cn } from "./utils";
export function FormField({
  label,
  hint,
  error,
  children,
  className,
  ...rootProps
}: Omit<
  React.ComponentProps<"div">,
  keyof {
    label: string;
    hint?: string;
    error?: string;
    children: React.ReactElement<{
      id?: string;
      "aria-describedby"?: string;
      "aria-invalid"?: boolean;
    }>;
    className?: string;
  }
> & {
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
  const generatedId = React.useId();
  const id = children.props.id ?? generatedId;
  return (
    <div {...rootProps} className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {React.cloneElement(children, {
        id,
        "aria-describedby":
          [
            children.props["aria-describedby"],
            hint || error ? id + "-help" : undefined,
          ]
            .filter(Boolean)
            .join(" ") || undefined,
        "aria-invalid": error ? true : children.props["aria-invalid"],
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
export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}
export function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-6", className)} {...props} />;
}
export function FieldSet({
  className,
  ...props
}: React.ComponentProps<"fieldset">) {
  return (
    <fieldset className={cn("grid min-w-0 gap-5", className)} {...props} />
  );
}
export function FieldLegend({
  className,
  ...props
}: React.ComponentProps<"legend">) {
  return <legend className={cn("mb-3 font-medium", className)} {...props} />;
}
export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium", className)} {...props} />;
}
export function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
export function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      role="alert"
      className={cn("text-xs leading-relaxed text-danger", className)}
      {...props}
    />
  );
}

export function FieldContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("grid min-w-0 gap-1", className)} {...props} />;
}
export function FieldRow({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("flex items-center gap-3 text-sm font-medium", className)}
      {...props}
    />
  );
}
