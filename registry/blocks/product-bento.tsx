"use client";

import * as React from "react";
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Heart,
  LayoutPanelTop,
  MousePointer2,
} from "lucide-react";
import { cn } from "../ui/utils";

export type ProductBentoItem = {
  title: React.ReactNode;
  description: React.ReactNode;
  value?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
};
const defaultItems: ProductBentoItem[] = [
  {
    title: "Know what is landing",
    description: "A focused weekly view makes a busy product feel legible.",
    value: "24",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Make feedback part of the object",
    description: "Bring notes to the exact moment someone needs to see them.",
    icon: MousePointer2,
  },
  {
    title: "Small details carry the feeling",
    description: "Keep the work human at every point of contact.",
    icon: Heart,
  },
];
export type ProductBentoProps = Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> & {
  title?: React.ReactNode;
  items?: ProductBentoItem[];
};
type ProductBentoModel = Required<Pick<ProductBentoProps, "title" | "items">>;
const ProductBentoContext = React.createContext<ProductBentoModel | null>(null);
function useProductBento() {
  const context = React.useContext(ProductBentoContext);
  if (!context)
    throw new Error("ProductBento parts must be inside ProductBento.");
  return context;
}
export const ProductBento = React.forwardRef<HTMLElement, ProductBentoProps>(
  function ProductBento(
    {
      title = "Good product work has a rhythm.",
      items = defaultItems,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <ProductBentoContext.Provider value={{ title, items }}>
        <section
          ref={ref}
          data-slot="product-bento"
          className={cn("py-12 md:py-20", className)}
          {...props}
        >
          {children !== undefined ? (
            children
          ) : (
            <>
              <ProductBentoHeading />
              <ProductBentoGrid />
            </>
          )}
        </section>
      </ProductBentoContext.Provider>
    );
  },
);
export const ProductBentoHeading = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h2">
>(function ProductBentoHeading({ children, className, ...props }, ref) {
  const { title } = useProductBento();
  return (
    <h2
      ref={ref}
      data-slot="product-bento-heading"
      className={cn(
        "mb-8 max-w-xl text-4xl leading-[1.05] tracking-[-.035em] md:mb-12 md:text-6xl",
        className,
      )}
      {...props}
    >
      {children !== undefined ? children : title}
    </h2>
  );
});
export const ProductBentoGrid = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(function ProductBentoGrid({ children, className, ...props }, ref) {
  const { items } = useProductBento();
  return (
    <div
      ref={ref}
      data-slot="product-bento-grid"
      className={cn("grid gap-3 md:grid-cols-12", className)}
      {...props}
    >
      {children !== undefined
        ? children
        : items.map((item, index) =>
            index === 0 ? (
              <ProductBentoMetric key={index} item={item} />
            ) : (
              <ProductBentoCard
                key={index}
                item={item}
                preview={index % 2 === 1 ? "feedback" : "release"}
              />
            ),
          )}
    </div>
  );
});
export const ProductBentoMetric = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { item?: ProductBentoItem }
>(function ProductBentoMetric({ item, children, className, ...props }, ref) {
  const Icon = item?.icon ?? ChartNoAxesCombined;
  return (
    <div
      ref={ref}
      data-slot="product-bento-metric"
      className={cn(
        "relative min-h-80 overflow-hidden rounded-xl bg-[#ece8df] p-6 md:col-span-7 md:row-span-2 md:min-h-0 md:p-8",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-full bg-background">
              <Icon size={17} />
            </span>
            <span className="text-xs text-muted-foreground">This week</span>
          </div>
          <div className="mt-12">
            <p className="text-7xl tracking-[-.07em]">{item?.value}</p>
            <p className="mt-3 text-xl tracking-[-.025em]">{item?.title}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {item?.description}
            </p>
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 right-0 flex h-24 items-end gap-2 p-6"
          >
            <i className="h-[32%] w-3 rounded-t bg-[#bdcfb8]" />
            <i className="h-[54%] w-3 rounded-t bg-[#bdcfb8]" />
            <i className="h-[42%] w-3 rounded-t bg-[#bdcfb8]" />
            <i className="h-[80%] w-3 rounded-t bg-primary" />
            <i className="h-[64%] w-3 rounded-t bg-[#bdcfb8]" />
          </div>
        </>
      )}
    </div>
  );
});
export const ProductBentoCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    item?: ProductBentoItem;
    preview?: "feedback" | "release";
  }
>(function ProductBentoCard(
  { item, preview = "feedback", children, className, ...props },
  ref,
) {
  const Icon = item?.icon ?? LayoutPanelTop;
  return (
    <div
      ref={ref}
      data-slot="product-bento-card"
      className={cn(
        "group flex min-h-64 flex-col justify-between rounded-xl border border-border bg-background p-6 md:col-span-5 md:p-8",
        className,
      )}
      {...props}
    >
      {children !== undefined ? (
        children
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="grid size-9 place-items-center rounded-full bg-muted">
              <Icon size={17} />
            </span>
            <ArrowUpRight
              size={17}
              className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
          {preview === "feedback" ? (
            <div className="mt-6 rounded-lg border border-border bg-muted/45 p-3">
              <div className="flex items-start gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">
                  J
                </span>
                <p className="text-xs leading-relaxed">
                  Could we keep the release note beside the change?
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" /> Decision
                recorded
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-lg border border-border bg-muted/45 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Release readiness</span>
                <span className="text-primary">2 of 3</span>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <i className="size-2 rounded-full bg-primary" /> Keyboard
                  review complete
                </span>
                <span className="flex items-center gap-2">
                  <i className="size-2 rounded-full border border-border bg-background" />
                  Release note drafted
                </span>
              </div>
            </div>
          )}
          <div className="mt-5">
            <h3 className="text-xl tracking-[-.03em]">{item?.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {item?.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
});
ProductBento.displayName = "ProductBento";
