"use client";
import * as React from "react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { TextReveal } from "../ui/text-reveal";
export const EditorialHeroCopy = {};
export type EditorialHeroOptions = Pick<
  HeroProps,
  "actionLabel" | "title" | "description" | "href" | "className"
>;
export type EditorialHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof EditorialHeroOptions
> &
  EditorialHeroOptions;
function useEditorialHeroModel({
  actionLabel,
  title = "Make room for your next big idea.",
  description = "A thoughtful place to turn the things you imagine into the things you make.",
  href = "#start",
  className,
  children,
  ...rootProps
}: EditorialHeroProps) {
  return {
    actionLabel,
    title,
    description,
    href,
    className,
    children,
    rootProps,
  };
}
const EditorialHeroCompositionContext = React.createContext<ReturnType<
  typeof useEditorialHeroModel
> | null>(null);
function useEditorialHeroComposition() {
  const context = React.useContext(EditorialHeroCompositionContext);
  if (!context)
    throw new Error("EditorialHero parts must be inside EditorialHero.");
  return context;
}
export function EditorialHero(props: EditorialHeroProps) {
  const model = useEditorialHeroModel(props);
  const { className, rootProps, children } = model;
  return (
    <EditorialHeroCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "grid gap-8 py-16 md:grid-cols-[2fr_1fr] md:items-end",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <EditorialHeroHeading />
            <EditorialHeroIntro />
          </>
        )}
      </section>
    </EditorialHeroCompositionContext.Provider>
  );
}

export function EditorialHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="editorial-hero-title"
      className={cn("max-w-4xl text-5xl leading-[1.02] md:text-7xl", className)}
      {...props}
    />
  );
}
export function EditorialHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="editorial-hero-content"
      className={cn("grid justify-items-start gap-6", className)}
      {...props}
    />
  );
}

export function EditorialHeroHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialHeroTitle>> & {
  children?: React.ReactNode;
}) {
  const { title } = useEditorialHeroComposition();
  return (
    <EditorialHeroTitle {...props}>
      {children === undefined ? (
        typeof title === "string" ? (
          <TextReveal>{title}</TextReveal>
        ) : (
          title
        )
      ) : (
        children
      )}
    </EditorialHeroTitle>
  );
}
export function EditorialHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof EditorialHeroContent>> & {
  children?: React.ReactNode;
}) {
  return (
    <EditorialHeroContent {...props}>
      {children === undefined ? (
        <>
          <EditorialHeroDescription />
          <EditorialHeroAction />
        </>
      ) : (
        children
      )}
    </EditorialHeroContent>
  );
}

export function EditorialHeroDescription({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useEditorialHeroComposition();
  return (
    <p
      {...props}
      className={cn("max-w-sm text-muted-foreground", props.className)}
    >
      {children === undefined ? description : children}
    </p>
  );
}
export function EditorialHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof Button>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useEditorialHeroComposition();
  return (
    <Button asChild {...props}>
      {children === undefined ? (
        <a href={href}>{actionLabel ?? "Explore the possibilities →"}</a>
      ) : (
        children
      )}
    </Button>
  );
}
