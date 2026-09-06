"use client";
import * as React from "react";
import { cn } from "../ui/utils";
export type ArticleSidebarOptions = {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};
export type ArticleSidebarProps = Omit<
  React.ComponentProps<"article">,
  keyof ArticleSidebarOptions
> &
  ArticleSidebarOptions;
function useArticleSidebarModel({
  className,
  title = "Make space for the work.",
  children,
  aside,
  imageSrc = "/assets/editorial-question.svg",
  imageAlt = "An editorial study of questions",
  ...rootProps
}: ArticleSidebarProps) {
  return { className, title, children, aside, imageSrc, imageAlt, rootProps };
}
const ArticleSidebarCompositionContext = React.createContext<ReturnType<
  typeof useArticleSidebarModel
> | null>(null);
function useArticleSidebarComposition() {
  const context = React.useContext(ArticleSidebarCompositionContext);
  if (!context)
    throw new Error("ArticleSidebar parts must be inside ArticleSidebar.");
  return context;
}
export function ArticleSidebar(
  props: ArticleSidebarProps & { composition?: React.ReactNode },
) {
  const { composition, ...modelProps } = props;
  const model = useArticleSidebarModel(modelProps);
  const { className, rootProps } = model;
  return (
    <ArticleSidebarCompositionContext.Provider value={model}>
      <article {...rootProps} className={cn("py-8", className)}>
        {composition !== undefined ? (
          composition
        ) : (
          <>
            <ArticleSidebarHeading />
            <ArticleSidebarArticle />
          </>
        )}
      </article>
    </ArticleSidebarCompositionContext.Provider>
  );
}
export function ArticleSidebarRoot({
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof ArticleSidebar>,
  "children" | "composition"
> & { children?: React.ReactNode }) {
  return <ArticleSidebar {...props} composition={children} />;
}

export function ArticleSidebarTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="article-sidebar-title"
      className={cn(
        "max-w-2xl text-4xl leading-tight tracking-tight md:text-6xl",
        className,
      )}
      {...props}
    />
  );
}
export function ArticleSidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="article-sidebar-content"
      className={cn(
        "mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_220px]",
        className,
      )}
      {...props}
    />
  );
}
export function ArticleSidebarItemTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="article-sidebar-itemtitle"
      className={cn("text-2xl", className)}
      {...props}
    />
  );
}

export function ArticleSidebarHeading({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ArticleSidebarTitle>> & {
  children?: React.ReactNode;
}) {
  const { title } = useArticleSidebarComposition();
  return (
    <ArticleSidebarTitle {...props}>
      {children === undefined ? title : children}
    </ArticleSidebarTitle>
  );
}
export function ArticleSidebarArticle({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ArticleSidebarContent>> & {
  children?: React.ReactNode;
}) {
  const { children: modelChildren } = useArticleSidebarComposition();
  const { aside, imageSrc, imageAlt } = useArticleSidebarComposition();
  return (
    <ArticleSidebarContent {...props}>
      {children === undefined ? (
        <>
          <div className="min-w-0 space-y-6 text-base leading-relaxed">
            {modelChildren ?? (
              <>
                <p>
                  Every project begins with a question. The useful ones rarely
                  arrive fully formed. They emerge when we leave enough room to
                  notice what is already there.
                </p>
                <figure>
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="aspect-[3/2] w-full rounded-xl object-cover"
                  />
                  <figcaption className="mt-3 text-xs text-muted-foreground">
                    From the studio notebook. Illustrative editorial content.
                  </figcaption>
                </figure>
                <ArticleSidebarItemTitle>
                  Start with what you notice
                </ArticleSidebarItemTitle>
                <p>
                  A small detail can change the direction of an entire piece of
                  work. Collect observations before solutions. Give the
                  unfamiliar idea another day.
                </p>
              </>
            )}
          </div>
          <aside className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            {aside ?? (
              <>
                <h3 className="text-lg">In the margins</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  A collection of notes on attention, creative practice, and
                  making things with care.
                </p>
                <a
                  href="/templates/editorial"
                  className="mt-6 inline-block text-sm underline underline-offset-4"
                >
                  Explore the journal
                </a>
              </>
            )}
          </aside>
        </>
      ) : (
        children
      )}
    </ArticleSidebarContent>
  );
}
