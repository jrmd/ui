"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type LogoWallOptions = {
  names?: string[];
  className?: string;
  description?: React.ReactNode;
};
export type LogoWallProps = Omit<
  React.ComponentProps<"section">,
  keyof LogoWallOptions
> &
  LogoWallOptions;

function useLogoWallModel({
  description = "Illustrative brand collection",
  names = ["Forma", "Circa", "Outline", "Common", "Mode"],
  className,
  children,
  ...rootProps
}: LogoWallProps) {
  return { description, names, className, children, rootProps };
}
const LogoWallCompositionContext = React.createContext<ReturnType<
  typeof useLogoWallModel
> | null>(null);
function useLogoWallComposition() {
  const context = React.useContext(LogoWallCompositionContext);
  if (!context) throw new Error("LogoWall parts must be inside LogoWall.");
  return context;
}
export function LogoWall(props: LogoWallProps) {
  const model = useLogoWallModel(props);
  const { className, rootProps, children } = model;
  return (
    <LogoWallCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn("border-y border-border py-7", className)}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <LogoWallLead />
            <LogoWallLogos />
          </>
        )}
      </section>
    </LogoWallCompositionContext.Provider>
  );
}

export function LogoWallDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="logo-wall-description"
      className={cn("mb-5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}
export function LogoWallHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="logo-wall-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-8",
        className,
      )}
      {...props}
    />
  );
}

export function LogoWallLead({
  children,
  ...props
}: Partial<React.ComponentProps<typeof LogoWallDescription>> & {
  children?: React.ReactNode;
}) {
  const { description } = useLogoWallComposition();
  return (
    <LogoWallDescription {...props}>
      {children === undefined ? description : children}
    </LogoWallDescription>
  );
}
export function LogoWallLogos({
  children,
  ...props
}: Partial<React.ComponentProps<typeof LogoWallHeader>> & {
  children?: React.ReactNode;
}) {
  const { names } = useLogoWallComposition();
  return (
    <LogoWallHeader {...props}>
      {children === undefined
        ? names.map((n) => (
            <span key={n} className="font-display text-2xl font-semibold">
              {n}
            </span>
          ))
        : children}
    </LogoWallHeader>
  );
}
