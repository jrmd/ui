"use client";
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { type HeroProps } from "./hero-parts";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { ProjectPreview } from "./project-preview";
export const ProductDemoHeroCopy = {
  footerNote:
    "Try the project: switch views, open a task, or mark something done.",
};
export type ProductDemoHeroOptions = Pick<
  HeroProps,
  | "title"
  | "description"
  | "actionLabel"
  | "copy"
  | "preview"
  | "className"
  | "href"
> & {
  children?: React.ReactNode;
};
export type ProductDemoHeroProps = Omit<
  React.ComponentProps<"section">,
  keyof ProductDemoHeroOptions
> &
  ProductDemoHeroOptions;
function useProductDemoHeroModel({
  title,
  description,
  actionLabel,
  copy = {},
  children,
  preview,
  className,
  href = "#features",
  ...rootProps
}: ProductDemoHeroProps) {
  return {
    title,
    description,
    actionLabel,
    copy,
    children,
    preview,
    className,
    href,
    rootProps,
  };
}
const ProductDemoHeroCompositionContext = React.createContext<ReturnType<
  typeof useProductDemoHeroModel
> | null>(null);
function useProductDemoHeroComposition() {
  const context = React.useContext(ProductDemoHeroCompositionContext);
  if (!context)
    throw new Error("ProductDemoHero parts must be inside ProductDemoHero.");
  return context;
}
export function ProductDemoHero(
  props: ProductDemoHeroProps & { composition?: React.ReactNode },
) {
  const { composition, ...modelProps } = props;
  const model = useProductDemoHeroModel(modelProps);
  const { className, rootProps } = model;
  return (
    <ProductDemoHeroCompositionContext.Provider value={model}>
      <section {...rootProps} className={cn("py-12 md:py-20", className)}>
        {composition !== undefined ? (
          composition
        ) : (
          <>
            <ProductDemoHeroIntro />
            <ProductDemoHeroPreview />
            <ProductDemoHeroCaption />
          </>
        )}
      </section>
    </ProductDemoHeroCompositionContext.Provider>
  );
}
export function ProductDemoHeroRoot({
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ProductDemoHero>,
  "children" | "composition"
> & { children?: React.ReactNode }) {
  return <ProductDemoHero {...props} composition={children} />;
}

export function ProductDemoHeroContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="product-demo-hero-content"
      className={cn(
        "mb-10 grid gap-7 md:mb-14 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-12",
        className,
      )}
      {...props}
    />
  );
}
export function ProductDemoHeroTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="product-demo-hero-title"
      className={cn(
        "max-w-2xl text-5xl leading-[1.04] tracking-[-.035em] md:text-7xl",
        className,
      )}
      {...props}
    />
  );
}
export function ProductDemoHeroDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="product-demo-hero-description"
      className={cn(
        "mt-4 text-center text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function ProductDemoHeroIntro({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ProductDemoHeroContent>> & {
  children?: React.ReactNode;
}) {
  const { title } = useProductDemoHeroComposition();
  return (
    <ProductDemoHeroContent {...props}>
      {children === undefined ? (
        <>
          <ProductDemoHeroTitle>
            {title ?? (
              <>
                A clear view.
                <br />
                <span className="text-muted-foreground">
                  A shared finish line.
                </span>
              </>
            )}
          </ProductDemoHeroTitle>
          <div className="max-w-sm md:justify-self-end">
            <ProductDemoHeroLead />
            <ProductDemoHeroAction />
          </div>
        </>
      ) : (
        children
      )}
    </ProductDemoHeroContent>
  );
}
export function ProductDemoHeroPreview({ children }: React.PropsWithChildren) {
  const { children: modelChildren } = useProductDemoHeroComposition();
  const { preview } = useProductDemoHeroComposition();
  return children === undefined
    ? (modelChildren ?? preview ?? <ProjectPreview />)
    : children;
}
export function ProductDemoHeroCaption({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ProductDemoHeroDescription>> & {
  children?: React.ReactNode;
}) {
  const { copy } = useProductDemoHeroComposition();
  return (
    <ProductDemoHeroDescription {...props}>
      {children === undefined
        ? (copy.footerNote ??
          "Try the project: switch views, open a task, or mark something done.")
        : children}
    </ProductDemoHeroDescription>
  );
}

export function ProductDemoHeroAction({
  children,
  ...props
}: Partial<React.ComponentProps<typeof Button>> & {
  children?: React.ReactNode;
}) {
  const { actionLabel, href } = useProductDemoHeroComposition();
  return (
    <Button asChild {...props} className={cn("mt-6", props.className)}>
      {children === undefined ? (
        <a href={href}>
          {actionLabel ?? "Explore the workspace"} <ArrowRight size={16} />
        </a>
      ) : (
        children
      )}
    </Button>
  );
}
export function ProductDemoHeroLead({
  children,
  ...props
}: Partial<React.ComponentProps<"p">> & { children?: React.ReactNode }) {
  const { description } = useProductDemoHeroComposition();
  return (
    <p
      {...props}
      className={cn(
        "text-base leading-relaxed text-muted-foreground",
        props.className,
      )}
    >
      {children === undefined
        ? (description ??
          "Projects, decisions, and the work in between. Bring your team into one workspace where everyone can see what happens next.")
        : children}
    </p>
  );
}
